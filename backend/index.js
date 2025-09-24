const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

// Chave secreta para o JWT. Em um projeto real, use uma variável de ambiente.
const JWT_SECRET = 'seu-segredo-super-secreto';

// Middleware de Autenticação:
// Esta função vai proteger as rotas. Ela verifica o token JWT enviado no cabeçalho,
// decodifica para obter o ID do usuário e o seu perfil, e anexa ao objeto `req`.
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

    if (token == null) {
        return res.sendStatus(401); // Não autorizado se não houver token
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Proibido se o token for inválido
        }
        req.user = user; // Anexa os dados do usuário (id, perfil) à requisição
        next();
    });
};


// ===============================================
// ROTAS DE AUTENTICAÇÃO E REGISTRO (JÁ EXISTENTES E AJUSTADAS)
// ===============================================

// Rota de Registro de Cliente
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                perfil: 'CLIENTE', // Garante que o perfil padrão seja CLIENTE
            },
        });
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: 'Email já cadastrado.' });
    }
});

// Rota de Login (para Clientes e Vendedores)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
        // Se o login for válido, cria um token JWT
        const accessToken = jwt.sign(
            { userId: user.id, perfil: user.perfil }, // Informações que vão no token
            JWT_SECRET,
            { expiresIn: '1h' } // Token expira em 1 hora
        );
        res.json({ accessToken, user }); // Envia o token e os dados do usuário
    } else {
        res.status(401).json({ error: 'Email ou senha inválidos.' });
    }
});

// ===============================================
// NOVAS ROTAS PARA VENDEDORES
// ===============================================

// Rota para um Vendedor cadastrar outro Vendedor
// Apenas usuários autenticados e com perfil 'VENDEDOR' podem acessar
app.post('/api/vendedor/register', authenticateToken, async (req, res) => {
    // Verifica se o usuário que está fazendo a requisição é um vendedor
    if (req.user.perfil !== 'VENDEDOR') {
        return res.status(403).json({ error: 'Acesso negado. Apenas vendedores podem cadastrar outros vendedores.' });
    }

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                perfil: 'VENDEDOR', // Define o perfil como VENDEDOR
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'Email já cadastrado.' });
    }
});


// ===============================================
// NOVAS ROTAS PARA PRODUTOS (CRUD)
// ===============================================

// Rota para buscar todos os produtos (pública)
app.get('/api/products', async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

// Rota para um Vendedor criar um produto
app.post('/api/products', authenticateToken, async (req, res) => {
    if (req.user.perfil !== 'VENDEDOR') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }

    const { sku, name, description, price, stock, image } = req.body;
    try {
        const product = await prisma.product.create({
            data: {
                sku,
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock),
                image,
                vendedorId: req.user.userId, // Associa o produto ao vendedor logado
            },
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar o produto. Verifique o SKU.' });
    }
});

// Rota para um Vendedor ATUALIZAR um produto (inclusive estoque)
app.put('/api/products/:id', authenticateToken, async (req, res) => {
    if (req.user.perfil !== 'VENDEDOR') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    try {
        const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });

        // Garante que um vendedor só pode editar o próprio produto
        if (product.vendedorId !== req.user.userId) {
            return res.status(403).json({ error: 'Você não tem permissão para editar este produto.' });
        }

        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock),
            },
        });
        res.json(updatedProduct);
    } catch (error) {
        res.status(404).json({ error: 'Produto não encontrado.' });
    }
});


// Rota para um Vendedor DELETAR um produto
app.delete('/api/products/:id', authenticateToken, async (req, res) => {
    if (req.user.perfil !== 'VENDEDOR') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    const { id } = req.params;

    try {
        const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });

        if (product.vendedorId !== req.user.userId) {
            return res.status(403).json({ error: 'Você não tem permissão para deletar este produto.' });
        }

        await prisma.product.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send(); // 204 No Content
    } catch (error) {
        res.status(404).json({ error: 'Produto não encontrado.' });
    }
});


// ===============================================
// NOVAS ROTAS PARA VENDAS (ORDERS)
// ===============================================

// Rota para finalizar uma compra (criar uma Order)
app.post('/api/orders', authenticateToken, async (req, res) => {
    if (req.user.perfil !== 'CLIENTE') {
        return res.status(403).json({ error: 'Apenas clientes podem fazer compras.' });
    }

    const { items, total } = req.body; // Recebe os itens do carrinho e o total

    try {
        // Lógica de transação: Se algo der errado, tudo é desfeito.
        const newOrder = await prisma.$transaction(async (tx) => {
            // 1. Verifica o estoque de todos os produtos
            for (const item of items) {
                const product = await tx.product.findUnique({ where: { id: item.productId } });
                if (product.stock < item.quantity) {
                    throw new Error(`Estoque insuficiente para o produto: ${product.name}`);
                }
            }

            // 2. Cria a venda (Order)
            const order = await tx.order.create({
                data: {
                    clienteId: req.user.userId,
                    vendedorId: 1, // <<< ATENÇÃO: Definir regra para qual vendedor. Por simplicidade, fixei o vendedor 1.
                    // O ideal seria agrupar itens por vendedor e criar uma venda para cada.
                    total: parseFloat(total),
                    status: 'CONCLUIDA',
                    items: {
                        create: items.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    },
                },
            });

            // 3. Atualiza o estoque
            for (const item of items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }

            return order;
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Rota para o Cliente ver seu histórico de compras
app.get('/api/orders/cliente', authenticateToken, async (req, res) => {
    if (req.user.perfil !== 'CLIENTE') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    const orders = await prisma.order.findMany({
        where: { clienteId: req.user.userId },
        include: { items: { include: { product: true } } }, // Inclui os detalhes dos produtos
    });
    res.json(orders);
});

// Rota para o Vendedor ver TODAS as vendas
app.get('/api/orders/vendedor', authenticateToken, async (req, res) => {
    if (req.user.perfil !== 'VENDEDOR') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    const orders = await prisma.order.findMany({
        include: {
            cliente: true, // Inclui os dados do cliente
            items: { include: { product: true } }
        },
    });
    res.json(orders);
});

// Rota para cancelar uma venda
app.put('/api/orders/:id/cancel', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const order = await prisma.order.findUnique({ where: { id: parseInt(id) } });

    if (!order) {
        return res.status(404).json({ error: 'Venda não encontrada.' });
    }

    // Um cliente só pode cancelar suas próprias vendas
    if (req.user.perfil === 'CLIENTE' && order.clienteId !== req.user.userId) {
        return res.status(403).json({ error: 'Acesso negado.' });
    }

    // Um vendedor pode cancelar qualquer venda (conforme requisito)
    if (req.user.perfil !== 'VENDEDOR' && req.user.perfil !== 'CLIENTE') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }

    const canceledOrder = await prisma.order.update({
        where: { id: parseInt(id) },
        data: { status: `CANCELADA_POR_${req.user.perfil}` },
    });

    res.json(canceledOrder);
});


// ===============================================
// INICIALIZAÇÃO DO SERVIDOR
// ===============================================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
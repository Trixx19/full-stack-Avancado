const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const PORT = 3001;

// Middlewares
app.use(cors()); // Permite que o frontend (em outra porta) acesse o backend
app.use(express.json()); // Permite que o servidor entenda JSON nas requisições

// Rota para buscar todos os produtos
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});

// Rota para registrar um novo usuário (cliente)
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validação simples
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Verifica se o e-mail já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Este e-mail já está em uso.' });
    }

    // Cria o novo usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: 'USER' // Todo novo registro é um cliente padrão
      },
    });

    // Remove a senha da resposta por segurança
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);

  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ error: 'Erro ao registrar novo usuário.' });
  }
});

// Rota para fazer login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // Verifica se o usuário existe e se a senha está correta
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Remove a senha do objeto antes de enviar de volta para o cliente
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});


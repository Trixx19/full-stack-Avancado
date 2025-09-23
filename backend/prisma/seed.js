const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

// Função para gerar SKU a partir do nome do produto
function generateSku(name, index) {
    if (!name) throw new Error(`Produto sem nome no índice ${index}`);
    return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, "-")
        .replace(/-+$/, "") + "-" + (index + 1);
}


const products = [
    {
        name: "Casaco Dri-Fit Preto",
        price: 49.90,
    },
    {
        name: "Tênis Adidas Breaknet Feminino - Preto+Off White ",
        price: 119.90,
    },
    {
        name: "Bicicleta Aro 29 Dropp SW 24 Vel Câmbio Shimano Quadro Alumínio MTB",
        price: 199.90,
    },
    {
        name: "Tênis Asics Gel-Electrus 2 Masculino ",
        price: 39.90,
    },
    {
        name: "Camisa do Corinthians",
        price: 189.99,
    },
    {
        name: "Camisa do Flamengo",
        price: 189.99,
    },
    {
        name: "Camisa do Fluminense",
        price: 189.99,
    },
    {
        name: "Camisa do Internacional",
        price: 189.99,
    },
    {
        name: "Camisa do Palmeiras",
        price: 189.99,
    },
    {
        name: "Camisa Roma Home 2024/2025 ",
        price: 189.99,
    },
    {
        name: "Camisa do Santos",
        price: 189.99,
    },
    {
        name: "Camisa do São Paulo",
        price: 189.99,
    },
    {
        name: "Camisa Vasco I 24/25 Jogador",
        price: 349.90,
    },
    {
        name: "Tênis Nike Interact Run",
        price: 599.99,
    },
    {
        name: "Tênis Puma Scend Pro 2",
        price: 449.99,
    },
    {
        name: "Kit Creatina 100% 1k",
        price: 159.99,
    },
    {
        name: "Tênis Fila Maxxi Masculino",
        price: 349.99,
    },
    {
        name: "Tênis Qsix Sunset Vulcanizado",
        price: 219.99,
    },
    {
        name: "Bicicleta Aro 29 KRW",
        price: 1899.00,
    },
    {
        name: "Tênis Nike Court Vision Low Next",
        price: 379.99,
    },
    {
        name: "Tênis Nike Air Max Impact 4 Masculino",
        price: 370.49,
    },
    {
        name: "Tênis Nike Air Max Excee Masculino",
        price: 446.49,
    },
    {
        name: "Tênis Nike Downshifter 13 Feminino",
        price: 408.49,
    },
    {
        name: "Tênis Nike Journey Run Feminino",
        price: 664.99,
    },
    {
        name: "TShorts Jordan Dri-FIT Sport Masculino",
        price: 664.99,
    },
    {
        name: "Shorts Jordan Essentials Woven Masculino",
        price: 284.99,
    },
    {
        name: "Shorts Nike Sportswear Essentials Woven Feminino",
        price: 170.99,
    },
    {
        name: "Shorts Nike Sportswear Everything Wovens Feminino",
        price: 199.99,
    },
    {
        name: "Camiseta Nike Pro Dri-FIT Masculina",
        price: 180.49,
    },
    {
        name: "Camiseta Nike SB Masculina Preta Dri-Fit",
        price: 84.00,
    },
    {
        name: "Camiseta Nike Sportswear Club Essentials Feminina",
        price: 66.49,
    },
    {
        name: "Camiseta Nike Dri-FIT Feminina Rosa",
        price: 94.99,
    },
    {
        name: "Chuteira Sem Cadarços Predator Elite Campo",
        price: 1999.99,
    },
    {
        name: "Chuteira F50 Sparkfusion Club Campo/Grama Artificial",
        price: 499.99,
    },
    {
        name: "Tênis de treino Amplimove Adidas Jaguar",
        price: 499.99,
    },
    {
        name: "Tênis de Treino Dropset 3 Adidas Jaguar",
        price: 899.99,
    },

    {
        name: "Camiseta Tennis Climacool+ AIRCHILL FreeLift",
        price: 249.99,
    },

    {
        name: "Camiseta Treino Alongamento Train Essentials",
        price: 179.99,
    },
    {
        name: "Camiseta Nike Sportswear Club Essentials Feminina",
        price: 66.49,
    },
    {
        name: "Blusa Cropped Manga Longa Adicolor Futebol Jacquard",
        price: 299.99,
    },
    {
        name: "Mochila Base Small Feminina",
        price: 169.99,
    },
    {
        name: "Mochila Base Small Feminina",
        price: 169.99,
    },
    {
        name: "Mochila PUMA S Heather",
        price: 269.99,
    },
    {
        name: "Mochila PUMA PHASE Hooded",
        price: 199.99,
    },
    {
        name: "Mini Bola PUMA Cumbre Oficial Conmebol Copa América",
        price: 59.99,
    },
    {
        name: "Mini Bola Orbita LaLiga 1 MS Espanha",
        price: 59.99,
    },
    {
        name: "Bola PUMA Cumbre Oficial Conmebol Copa America HYB",
        price: 59.99,
    },
    {
        name: "Bola PUMA Cumbre Oficial Conmebol Copa America HYB",
        price: 119.99,
    },
    {
        name: "Garrafa Training Sportstyle Puma Br",
        price: 99.99,
    },
    {
        name: "Garrafa Training Sportstyle Puma Br",
        price: 99.99,
    },
    {
        name: "Garrafa Shaker PUMA Preta 500ML",
        price: 79.99,
    },
    {
        name: "Garrafa Training Sportstyle Litio 1L Puma",
        price: 129.99,
    },
    {
        name: "Camisa Olympique de Marseille 25/26 Home Jersey Masculina",
        price: 429.99,
    },
    {
        name: "Camisa Olympique de Marseille 24/25 AWAY Masculina",
        price: 429.99,
    },
    {
        name: "Camisa Olympique de Marseille 24/25 AWAY Juvenil",
        price: 359.99,
    },
    {
        name: "Camisa Olympique de Marseille 23/24 AWAY Juvenil",
        price: 209.99,
    },
    {
        name: "Camisa Bahia Esporte Clube Torcedor Away 2025",
        price: 249.99,
    },
    {
        name: "Camisa Bahia Esporte Clube Torcedor Home 2025",
        price: 249.99,
    },
    {
        name: "Camisa Bahia Esporte Clube Superman Torcedor 2025",
        price: 249.99,
    },
    {
        name: "Camiseta Casuals Bahia Esporte Clube 2025",
        price: 249.99,
    },
    {
        name: "Tênis Adidas Adizero Drive Rc Feminino - Branco+prata",
        price: 899.99,
    },
    {
        name: "Kit Meia Adidas Cano Médio 3 Listras 3 Pares - Cinza",
        price: 56.99,
    },
    {
        name: "Tênis Fila Racer Speedzone Feminino - Vermelho+Laranja",
        price: 499.99,
    },
    {
        name: "Top Authen Grit Bossa Reto Bolso justavel",
        price: 299.80,
    },
    {
        name: "Bola de Campo Umbro Neo Trainer II",
        price: 56.99,
    },
    {
        name: "Bicicleta Aro 29 Drop sw 24",
        price: 882.55,
    },
    {
        name: "Mochila Adidas Classic Logo Linear",
        price: 132.99,
    },
    {
        name: "Mochila Adidas Linear Backpack",
        price: 128.24,
    },
    {
        name: "Mochila Adidas Classica",
        price: 142.49,
    },
    {
        name: "Mochila Hang Loose Esportiva",
        price: 137.62,
    },
    {
        name: "Mochila Hang Loose Refoçada",
        price: 61.12,
    },
    {
        name: "Chuteira de Campo Puma Rapido III",
        price: 142.49,
    },
    {
        name: "Chuteria Campo Predator Artilheira",
        price: 170.99,
    },
    {
        name: "Chuteira de Campo Luna II",
        price: 484.49,
    },
    {
        name: "Chuteira Campo Umbro Class",
        price: 139.90,
    },
    {
        name: "Chuteira Campo Umbro On,",
        price: 75.99,
    },
    {
        name: "Chuteria Futsal Umbro Pro 5",
        price: 256.99,
    },
    {
        name: "Chuteira OXN Velox 4 neo campo",
        price: 74.89,
    },
    {
        name: "Chuteira Botinha De Campo + Meião + Caneleira + Porta Chuteira A7 - Preto",
        price: 199.90,
    },
    {
        name: "Tênos Nike Air Max alpha trainer 6",
        price: 389.99,
    },
];

async function main() {
    console.log('Limpando dados antigos...');
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    console.log('Dados antigos limpos.');

    console.log('Criando usuários de teste...');
    // Criptografando as senhas antes de salvar
    const hashedClientePassword = await bcrypt.hash('123', 10);
    const hashedVendedorPassword = await bcrypt.hash('Ma1923', 10);

    const userCliente = await prisma.user.create({
        data: {
            email: 'cliente@aasports.com',
            name: 'Cliente Teste',
            password: hashedClientePassword, // Senha criptografada
            perfil: 'CLIENTE',
        },
    });

    const userVendedor = await prisma.user.create({
        data: {
            email: 'vai.que.da.certo.2k@gmail.com',
            name: 'Vendedor Teste',
            password: hashedVendedorPassword, // Senha criptografada
            perfil: 'VENDEDOR',
        },
    });
    console.log('Usuários de teste criados:', { userCliente, userVendedor });

    console.log(`Iniciando o seed com ${products.length} produtos...`);
    for (const [index, p] of products.entries()) {
        const sku = generateSku(p.name, index);
        await prisma.product.create({
            data: {
                sku: sku,
                name: p.name,
                price: p.price,
                stock: 20,
                image: `${index + 1}.jpg`,
                // Opcional: associar produtos ao vendedor criado
                vendedorId: userVendedor.id,
            }
        });
    }
    console.log("✅ Seed executado com sucesso!");
}

main()
    .catch((e) => {
        console.error("Ocorreu um erro no script de seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// ======================
// Categories
// ======================
const categories = [
  {
    name: 'jewelry',
    displayName: 'Jewelry',
    description: 'Exquisite handmade jewelry with traditional designs',
    image: '/images/categories/jewelry.jpg',
    icon: '💍',
    productCount: 4,
  },
  {
    name: 'home-decor',
    displayName: 'Home Decor',
    description: 'Beautiful handcrafted items for your living space',
    image: '/images/categories/home-decor.jpg',
    icon: '🏺',
    productCount: 2,
  },
  {
    name: 'ceramics',
    displayName: 'Ceramics',
    description: 'Handcrafted pottery and ceramic art pieces',
    image: '/images/categories/ceramics.jpg',
    icon: '🍶',
    productCount: 2,
  },
  {
    name: 'textiles',
    displayName: 'Textiles',
    description: 'Woven and embroidered fabrics with traditional patterns',
    image: '/images/categories/textiles.jpg',
    icon: '🧵',
    productCount: 2,
  },
  {
    name: 'woodwork',
    displayName: 'Woodwork',
    description: 'Exquisite wooden sculptures and functional items',
    image: '/images/categories/woodwork.jpg',
    icon: '🪵',
    productCount: 1,
  },
  {
    name: 'fashion',
    displayName: 'Fashion',
    description: 'Traditional and contemporary fashion accessories',
    image: '/images/categories/fashion.jpg',
    icon: '👘',
    productCount: 1,
  },
];

// ======================
// Products
// ======================
const products = [
  {
    name: 'Handwoven Basket',
    description: 'Intricately woven from natural fibers, perfect for storage or decor.',
    price: 45.99,
    image: '/images/products/basket.jpg',
    category: 'home-decor',
    rating: 4.5,
    reviews: 128,
  },
  {
    name: 'Ceramic Vase',
    description: 'Hand-painted with traditional motifs, adds elegance to any space.',
    price: 59.99,
    image: '/images/products/TKX00217.jpg',
    category: 'ceramics',
    rating: 4.8,
    reviews: 89,
  },
  {
    name: 'Wooden Sculpture',
    description: 'Carved from sustainable wood, depicting cultural symbols.',
    price: 89.99,
    image: '/images/products/TKX00247.jpg',
    category: 'woodwork',
    rating: 4.3,
    reviews: 67,
  },
  {
    name: 'Embroidered Textile',
    description: 'Vibrant patterns hand-stitched by artisans.',
    price: 34.99,
    image: '/images/products/textiles.jpg',
    category: 'textiles',
    rating: 4.6,
    reviews: 203,
  },
  {
    name: 'Beaded Jewelry Set',
    description: 'Colorful beads in traditional designs, includes necklace and earrings.',
    price: 29.99,
    image: '/images/products/jewelry.jpg',
    category: 'jewelry',
    rating: 4.9,
    reviews: 156,
  },
  {
    name: 'Silver Tribal Necklace',
    description: 'Handcrafted silver necklace with traditional motifs.',
    price: 89.99,
    image: '/images/products/jewelry-2.jpg',
    category: 'jewelry',
    rating: 4.7,
    reviews: 92,
  },
  {
    name: 'Gold Plated Earrings',
    description: 'Elegant gold plated earrings with gemstone accents.',
    price: 45.5,
    image: '/images/products/jewelry-3.jpg',
    category: 'jewelry',
    rating: 4.8,
    reviews: 134,
  },
  {
    name: 'Traditional Bracelet Set',
    description: 'Set of three bracelets with cultural patterns.',
    price: 67.0,
    image: '/images/products/jewelry-4.jpg',
    category: 'jewelry',
    rating: 4.6,
    reviews: 78,
  },
  {
    name: 'Handwoven Wall Hanging',
    description: 'Beautiful textile art for your walls.',
    price: 75.99,
    image: '/images/products/textiles-2.jpg',
    category: 'home-decor',
    rating: 4.4,
    reviews: 56,
  },
  {
    name: 'Decorative Ceramic Plates',
    description: 'Set of hand-painted decorative plates.',
    price: 52.99,
    image: '/images/products/ceramics-2.jpg',
    category: 'home-decor',
    rating: 4.7,
    reviews: 89,
  },
];

// ======================
// Users
// ======================
const users = [
  {
    email: 'admin@example.com',
    firstName: 'Alice',
    lastName: 'Admin',
    role: 'ADMIN',
    password: 'admin123',
    isVerified: true,
  },
  {
    email: 'manager@example.com',
    firstName: 'Mark',
    lastName: 'Manager',
    role: 'MANAGER',
    password: 'manager123',
    isVerified: true,
  },
  {
    email: 'client@example.com',
    firstName: 'Clara',
    lastName: 'Client',
    role: 'CLIENT',
    password: 'client123',
    isVerified: false,
  },
];

// ======================
// Main seeding function
// ======================
async function main() {
  console.log('🌱 Seeding database...');

  // 👉 Seed Categories
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: cat,
      create: cat,
    });
  }

  // 👉 Seed Products
  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        category: p.category,
        rating: p.rating,
        reviews: p.reviews,
      },
    });
  }

  // 👉 Seed Users with hashed passwords
  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.password, 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        ...u,
        password: hashedPassword,
      },
      create: {
        ...u,
        password: hashedPassword,
      },
    });
  }

  console.log('✅ Seeding finished!');
}

// Run it
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

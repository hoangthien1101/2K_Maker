const { Product, sequelize } = require('../models');

async function updateBanana() {
  await sequelize.authenticate();
  const banana = await Product.findByPk(1);
  if (banana) {
    const existing = banana.images || [];
    const extra = [
      banana.thumbnail,
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    ];
    await banana.update({ images: extra });
    console.log('Updated Banana Katana images');
  }
  process.exit(0);
}
updateBanana().catch(console.error);


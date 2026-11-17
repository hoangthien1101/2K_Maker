const { Product, sequelize } = require('../models');

async function updateProductImages() {
  await sequelize.authenticate();
  console.log('Connected to DB');

  const updates = [
    {
      slug: 'moc-khoa-3d-da-sac-ca-nhan-hoa',
      images: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      ],
    },
    {
      slug: 'mo-hinh-phi-hanh-gia-cyberpunk-chibi',
      images: [
        'https://images.unsplash.com/photo-1633493106094-a14a38b55694?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      ],
    },
    {
      slug: 'mascot-foxee-3d-linh-vat',
      images: [
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1633493106094-a14a38b55694?auto=format&fit=crop&w=800&q=80',
      ],
    },
    {
      slug: 'de-sac-dien-thoai-da-nang-isometric',
      images: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      ],
    },
    {
      slug: 'mo-hinh-rong-than-articulated-3d',
      images: [
        'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1633493106094-a14a38b55694?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      ],
    },
    {
      slug: 'den-ngu-tranh-3d-lithophane',
      images: [
        'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      ],
    },
  ];

  for (const item of updates) {
    await Product.update({ images: item.images }, { where: { slug: item.slug } });
    console.log('Updated', item.slug);
  }
  process.exit(0);
}

updateProductImages().catch(console.error);

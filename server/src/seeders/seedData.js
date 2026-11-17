const {
  sequelize,
  User,
  ProductCategory,
  Product,
  HeroContent,
  AboutContent,
  CoreValue,
  WhyChooseUsItem,
  ContactInfo,
  SectionSetting,
  PublishSnapshot,
} = require('../models');

const seedDatabase = async () => {
  try {
    console.log('--- Đồng bộ cấu trúc cơ sở dữ liệu Sequelize ---');
    await sequelize.sync();
    console.log('✓ Cơ sở dữ liệu đã được đồng bộ thành công.');

    // 1. Create Default Admin User
    const existingAdmin = await User.findOne({ where: { username: 'admin' } });
    if (!existingAdmin) {
      await User.create({
        username: 'admin',
        email: 'admin@2kmaker.vn',
        password: 'admin123456',
        name: 'Quản trị viên 2K Maker',
        role: 'admin',
      });
      console.log('✓ Khởi tạo tài khoản Admin mặc định: admin / admin123456 (admin@2kmaker.vn)');
    } else {
      console.log('✓ Tài khoản Admin đã tồn tại.');
    }

    // 2. Categories
    const categoriesData = [
      { name: 'Móc khóa', slug: 'moc-khoa', sortOrder: 1, description: 'Móc khóa 3D cá nhân hóa, tên riêng, logo, thiết kế độc bản' },
      { name: 'Phụ kiện', slug: 'phu-kien', sortOrder: 2, description: 'Phụ kiện bàn làm việc, giá đỡ công nghệ, case, decor tiện ích' },
      { name: 'Mô hình', slug: 'mo-hinh', sortOrder: 3, description: 'Mô hình nhân vật anime, mecha, game, tượng nghệ thuật chi tiết cao' },
      { name: 'Mascot', slug: 'mascot', sortOrder: 4, description: 'Linh vật thương hiệu, mascot sự kiện, quà tặng doanh nghiệp độc quyền' },
      { name: 'Sản phẩm khác', slug: 'san-pham-khac', sortOrder: 5, description: 'Thiết kế & in 3D theo bản vẽ, ý tưởng hoặc file 3D tùy biến của khách hàng' },
    ];

    const categoryMap = {};
    for (const cat of categoriesData) {
      const [record] = await ProductCategory.findOrCreate({
        where: { slug: cat.slug },
        defaults: cat,
      });
      categoryMap[cat.slug] = record.id;
    }
    console.log('✓ Đã khởi tạo 5 danh mục sản phẩm.');

    // 3. Products
    const productsData = [
      {
        title: 'Móc khóa Typography 2K Maker Dạ quang & Gradient',
        slug: 'moc-khoa-typography-2k-maker',
        categoryId: categoryMap['moc-khoa'],
        shortDescription: 'Móc khóa in 3D công nghệ phối màu đa sắc, khắc tên riêng theo yêu cầu với vật liệu PLA thân thiện.',
        fullDescription: 'Móc khóa in 3D cá nhân hóa là sự lựa chọn hàng đầu để thể hiện cá tính riêng hoặc làm quà tặng ý nghĩa. Được chế tác từ chất liệu nhựa sinh học PLA+ cao cấp với công nghệ in FDM độ phân giải siêu nét (layer 0.12mm), bề mặt láng mịn, bo viền êm tay và độ bền vượt trội. Khách hàng có thể tùy chọn màu sắc, dập nổi tên hoặc logo riêng.',
        material: 'PLA+ Cao cấp chống gãy, khoen kim loại mạ crom',
        dimensions: 'Kích thước tiêu chuẩn 6.5 x 2.5 x 0.6 cm',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        ],
        sortOrder: 1,
        isVisible: true,
        isFeatured: true,
        customNote: 'Có thể khắc tên, đổi màu gradient theo bảng 24 màu.',
      },
      {
        title: 'Mô hình Phi hành gia Cyberpunk Chibi Neon',
        slug: 'mo-hinh-phi-hanh-gia-cyberpunk-chibi',
        categoryId: categoryMap['mo-hinh'],
        shortDescription: 'Mô hình phi hành gia phong cách tương lai, chi tiết áo giáp và kính phản quang sắc nét.',
        fullDescription: 'Mô hình phi hành gia Chibi Cyberpunk độc quyền bởi 2K Maker. Tác phẩm được xử lý qua công nghệ in Resin SLA độ nét 8K, thể hiện từng rãnh giáp kim loại, mặt nạ và ba lô dưỡng khí tinh xảo. Sơn hoàn thiện thủ công tạo hiệu ứng phản quang ánh sáng công nghệ cực kỳ ấn tượng trên bàn làm việc.',
        material: 'Resin cao cấp độ nét cao (SLA 8K) + Sơn phủ UV mờ',
        dimensions: 'Chiều cao 12cm, đế trưng bày 8cm',
        thumbnail: 'https://images.unsplash.com/photo-1633493106094-a14a38b55694?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1633493106094-a14a38b55694?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
        ],
        sortOrder: 2,
        isVisible: true,
        isFeatured: true,
        customNote: 'Sản xuất thủ công, sơn màu theo sở thích của khách hàng.',
      },
      {
        title: 'Mascot Foxee 3D – Linh vật Cáo Thông Minh',
        slug: 'mascot-foxee-3d-linh-vat',
        categoryId: categoryMap['mascot'],
        shortDescription: 'Mascot linh vật thiết kế tạo khối đa giác Low-poly hiện đại, biểu tượng của sự nhanh nhạy và sáng tạo.',
        fullDescription: 'Foxee là linh vật độc đáo được thiết kế riêng với các mảng vát góc học Low-poly sắc sảo nhưng không kém phần đáng yêu. Sản phẩm phù hợp đặt tại quầy lễ tân, bàn làm việc doanh nghiệp hoặc làm linh vật đại diện thương hiệu cho các startup công nghệ.',
        material: 'Nhựa PETG chịu nhiệt, chống va đập',
        dimensions: 'Cao 15cm x Rộng 11cm',
        thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1633493106094-a14a38b55694?auto=format&fit=crop&w=800&q=80',
        ],
        sortOrder: 3,
        isVisible: true,
        isFeatured: true,
        customNote: 'Nhận thiết kế Mascot riêng cho cá nhân và doanh nghiệp.',
      },
      {
        title: 'Đế sạc điện thoại & đồng hồ đa năng Isometric Desk Dock',
        slug: 'de-sac-dien-thoai-da-nang-isometric',
        categoryId: categoryMap['phu-kien'],
        shortDescription: 'Phụ kiện bàn làm việc kiến trúc tương lai, tích hợp rãnh đi dây sạc thông minh và góc nghiêng chuẩn công thái học.',
        fullDescription: 'Đế dock đa năng giải phóng không gian bàn làm việc với thiết kế hình học tinh tế. Góc nghiêng 65 độ hoàn hảo để vừa làm việc vừa theo dõi thông báo hoặc FaceID. Khe cắm sạc ẩn dây thông minh, đế có đệm cao su chống trượt tuyệt đối.',
        material: 'PLA+ Gia cường sợi carbon siêu nhẹ và cứng vững',
        dimensions: '14 x 9.5 x 8 cm',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
        ],
        sortOrder: 4,
        isVisible: true,
        isFeatured: false,
        customNote: 'Tương thích tất cả dòng iPhone, Samsung và smart watch.',
      },
      {
        title: 'Mô hình Rồng Thần Á Đông Articulated Khớp Uốn Lượn',
        slug: 'mo-hinh-rong-than-articulated-3d',
        categoryId: categoryMap['mo-hinh'],
        shortDescription: 'Mô hình in 3D liền khối Print-in-Place với hơn 45 đốt khớp linh hoạt, uốn lượn uyển chuyển.',
        fullDescription: 'Được in liền khối hoàn toàn mà không cần lắp ráp phức tạp, mô hình Rồng Á Đông thể hiện đỉnh cao của công nghệ in 3D FDM. Từng vảy rồng, móng vuốt và sừng rồng được chăm chút tỉ mỉ với độ uyển chuyển tự nhiên khi cầm trên tay.',
        material: 'Silk PLA tạo hiệu ứng kim loại óng ánh mượt mà',
        dimensions: 'Chiều dài 48cm khi duỗi thẳng',
        thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1633493106094-a14a38b55694?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        ],
        sortOrder: 5,
        isVisible: true,
        isFeatured: true,
        customNote: 'Màu Silk Gold / Silk Emerald / Silk Dual-color bắt mắt.',
      },
      {
        title: 'Đèn ngủ Tranh 3D Lithophane Khắc Ảnh Theo Yêu Cầu',
        slug: 'den-ngu-tranh-3d-lithophane',
        categoryId: categoryMap['san-pham-khac'],
        shortDescription: 'Biến bức ảnh kỷ niệm của bạn thành khối ảnh 3D phát sáng lung linh, chân thực đến từng đường nét khi bật đèn.',
        fullDescription: 'Công nghệ Lithophane ứng dụng sự biến thiên độ dày lớp in 3D để tạo nên độ đậm nhạt tương phản của bức ảnh khi có ánh sáng xuyên qua. Một món quà kỷ niệm vô cùng bất ngờ và xúc động dành cho người thân, bạn bè hoặc người yêu.',
        material: 'PETG Trắng ngọc trai xuyên sáng cao cấp + Khung gỗ LED ấm',
        dimensions: 'Khung vuông 15x15cm hoặc trụ tròn đường kính 12cm',
        thumbnail: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        ],
        sortOrder: 6,
        isVisible: true,
        isFeatured: false,
        customNote: 'Gửi ảnh chân dung hoặc ảnh gia đình để được thiết kế mô phỏng 3D miễn phí.',
      },
    ];

    for (const prod of productsData) {
      await Product.findOrCreate({
        where: { slug: prod.slug },
        defaults: prod,
      });
    }
    console.log(`✓ Đã khởi tạo ${productsData.length} sản phẩm mẫu chất lượng cao.`);

    // 4. Hero Content
    await HeroContent.findOrCreate({
      where: { id: 1 },
      defaults: {
        slogan: 'BIẾN Ý TƯỞNG THÀNH SẢN PHẨM 3D.',
        title: 'Dịch vụ thiết kế và in 3D theo yêu cầu chất lượng cao',
        description: '2K Maker mang công nghệ in 3D hiện đại đến gần hơn với mọi người. Chuyên nhận in móc khóa, phụ kiện, mô hình nhân vật và mascot độc bản với mức chi phí hợp lý nhất.',
        ctaText: 'KHÁM PHÁ SẢN PHẨM',
        ctaLink: '#products',
        bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        badgeText: 'CÔNG NGHỆ IN 3D HIỆN ĐẠI – ĐỘ CHI TIẾT CAO',
        isDraft: true,
      },
    });
    console.log('✓ Đã cập nhật nội dung Hero chuẩn xác.');

    // 5. About Content
    await AboutContent.findOrCreate({
      where: { id: 1 },
      defaults: {
        sectionTitle: 'ABOUT 2K MAKER',
        heading: '2K MAKER – BIẾN Ý TƯỞNG THÀNH SẢN PHẨM 3D',
        introParagraph1: 'Mỗi ý tưởng đều xứng đáng có một phiên bản của riêng mình.',
        introParagraph2: '2K Maker là cửa hàng chuyên nhận in 3D theo yêu cầu, từ móc khóa, phụ kiện cá nhân đến mô hình nhân vật và mascot độc đáo.',
        introParagraph3: 'Với mong muốn đưa công nghệ in 3D đến gần hơn với mọi người, 2K Maker giúp khách hàng biến những ý tưởng sáng tạo thành sản phẩm thực tế với mức chi phí hợp lý.',
        storyTitle: 'Câu chuyện thương hiệu',
        storyContent: 'Xuất phát từ niềm đam mê sáng tạo và mong muốn tạo nên những sản phẩm khác biệt, 2K Maker ra đời với mục tiêu biến những ý tưởng độc đáo thành những món đồ hữu hình, mang dấu ấn riêng của mỗi khách hàng.',
        illustrationImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
        isDraft: true,
      },
    });

    // 6. Core Values
    const coreValuesData = [
      {
        code: 'CREATIVITY',
        title: 'CREATIVITY – Sáng tạo',
        description: 'Khuyến khích những ý tưởng mới lạ và không giới hạn sự sáng tạo.',
        icon: 'Sparkles',
        sortOrder: 1,
      },
      {
        code: 'PERSONALIZATION',
        title: 'PERSONALIZATION – Cá nhân hóa',
        description: 'Mỗi sản phẩm mang dấu ấn và phong cách riêng của khách hàng.',
        icon: 'Fingerprint',
        sortOrder: 2,
      },
      {
        code: 'ACCESSIBILITY',
        title: 'ACCESSIBILITY – Dễ tiếp cận',
        description: 'Đưa sản phẩm in 3D đến gần hơn với mọi người bằng mức giá hợp lý.',
        icon: 'Smile',
        sortOrder: 3,
      },
    ];

    for (const val of coreValuesData) {
      await CoreValue.findOrCreate({
        where: { title: val.title },
        defaults: val,
      });
    }
    console.log('✓ Đã cập nhật 3 Giá trị cốt lõi (Core Values).');

    // 7. Why Choose Us
    const whyChooseData = [
      {
        number: '01',
        tag: 'UNIQUE',
        title: 'ĐỘC ĐÁO',
        description: 'Sản phẩm được tạo ra từ ý tưởng riêng, mang dấu ấn cá nhân và không bị giới hạn bởi những mẫu có sẵn.',
        icon: 'Flame',
        sortOrder: 1,
      },
      {
        number: '02',
        tag: 'DIVERSE',
        title: 'ĐA DẠNG',
        description: 'Từ móc khóa, phụ kiện nhỏ đến mô hình nhân vật và mascot, đáp ứng nhiều nhu cầu sử dụng khác nhau.',
        icon: 'Layers',
        sortOrder: 2,
      },
      {
        number: '03',
        tag: 'AFFORDABLE',
        title: 'GIÁ CẢ HỢP LÝ',
        description: 'Mức giá dễ tiếp cận, có nhiều lựa chọn phù hợp với kích thước, độ phức tạp và ngân sách của khách hàng.',
        icon: 'BadgePercent',
        sortOrder: 3,
      },
      {
        number: '04',
        tag: 'MADE TO ORDER',
        title: 'SẢN XUẤT THEO YÊU CẦU',
        description: 'Tiếp nhận ý tưởng và yêu cầu riêng, tư vấn phương án thực hiện để tạo ra sản phẩm phù hợp với mong muốn của khách hàng.',
        icon: 'Wrench',
        sortOrder: 4,
      },
    ];

    for (const item of whyChooseData) {
      await WhyChooseUsItem.findOrCreate({
        where: { number: item.number },
        defaults: item,
      });
    }
    console.log('✓ Đã cập nhật 4 Thẻ Why Choose Us.');

    // 8. Contact Info
    await ContactInfo.findOrCreate({
      where: { id: 1 },
      defaults: {
        title: "LET'S CREATE SOMETHING UNIQUE!",
        description: 'Bạn có ý tưởng riêng? Hãy để 2K Maker giúp bạn biến ý tưởng thành sản phẩm 3D thực tế.',
        phone: '0988 234 567',
        email: 'contact@2kmaker.vn',
        address: 'Số 28, Ngõ 102 Khuất Duy Tiến, Thanh Xuân, Hà Nội',
        facebookUrl: 'https://facebook.com/2kmaker.3dprint',
        tiktokUrl: 'https://tiktok.com/@2kmaker.official',
        zaloUrl: 'https://zalo.me/0988234567',
        ctaConsultationText: 'LIÊN HỆ TƯ VẤN',
        ctaOrderText: 'ĐẶT HÀNG NGAY',
        isDraft: true,
      },
    });
    console.log('✓ Đã cập nhật Contact Info.');

    // 9. Section Settings
    const defaultSections = [
      { sectionKey: 'hero', sectionName: 'Hero / Banner Mở Đầu', isVisible: true, sortOrder: 1 },
      { sectionKey: 'about', sectionName: 'About Us / Giới Thiệu', isVisible: true, sortOrder: 2 },
      { sectionKey: 'products', sectionName: 'Product Showcase / Trưng Bày Sản Phẩm', isVisible: true, sortOrder: 3 },
      { sectionKey: 'why_choose_us', sectionName: 'Why Choose Us / Tại Sao Chọn 2K Maker', isVisible: true, sortOrder: 4 },
      { sectionKey: 'contact', sectionName: 'Contact / Thông Tin Liên Hệ', isVisible: true, sortOrder: 5 },
    ];

    for (const sec of defaultSections) {
      await SectionSetting.findOrCreate({
        where: { sectionKey: sec.sectionKey },
        defaults: sec,
      });
    }
    console.log('✓ Đã khởi tạo cài đặt các Section.');

    // 10. Initial Publish Snapshot
    const currentPublish = await PublishSnapshot.findOne({ where: { isCurrent: true } });
    if (!currentPublish) {
      const hero = await HeroContent.findOne({ order: [['id', 'DESC']] });
      const about = await AboutContent.findOne({ order: [['id', 'DESC']] });
      const coreValues = await CoreValue.findAll({ order: [['sortOrder', 'ASC']] });
      const whyChooseUs = await WhyChooseUsItem.findAll({ order: [['sortOrder', 'ASC']] });
      const contact = await ContactInfo.findOne({ order: [['id', 'DESC']] });
      const sections = await SectionSetting.findAll({ order: [['sortOrder', 'ASC']] });
      const products = await Product.findAll({
        where: { isVisible: true },
        include: [{ model: ProductCategory, as: 'category' }],
        order: [['sortOrder', 'ASC']],
      });
      const categories = await ProductCategory.findAll({ order: [['sortOrder', 'ASC']] });

      const fullData = {
        hero: hero ? hero.toJSON() : null,
        about: about ? about.toJSON() : null,
        coreValues: coreValues.map((v) => v.toJSON()),
        whyChooseUs: whyChooseUs.map((w) => w.toJSON()),
        contact: contact ? contact.toJSON() : null,
        sections: sections.map((s) => s.toJSON()),
        products: products.map((p) => p.toJSON()),
        categories: categories.map((c) => c.toJSON()),
      };

      await PublishSnapshot.create({
        publishedBy: 'System Seed',
        note: 'Bản xuất bản khởi tạo ban đầu',
        snapshotData: fullData,
        isCurrent: true,
      });
      console.log('✓ Đã tạo bản xuất bản ban đầu (Initial Publish Snapshot).');
    }

    console.log('===> SEED DỮ LIỆU HOÀN TẤT THÀNH CÔNG! <===');
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}

module.exports = seedDatabase;

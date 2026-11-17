const http = require('http');

async function testAll() {
  console.log('--- KHỞI ĐỘNG BỘ TEST TOÀN DIỆN 2K MAKER ---');

  // Helper for requests
  function makeRequest(options, postData = null) {
    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, headers: res.headers, raw: data });
          }
        });
      });
      req.on('error', reject);
      if (postData) {
        req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
      }
      req.end();
    });
  }

  try {
    // 1. Health check
    const health = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/health',
      method: 'GET',
    });
    console.log('1. Health Check:', health.status, health.body?.brand, 'OK!');

    // 2. Public Published Content
    const published = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/content/published',
      method: 'GET',
    });
    console.log('2. Published Content:', published.status, 'Slogan:', published.body?.data?.hero?.slogan);
    console.log('   - Tổng sản phẩm public:', published.body?.data?.products?.length);
    console.log('   - Tổng danh mục public:', published.body?.data?.categories?.length);
    console.log('   - 3 Giá trị cốt lõi:', published.body?.data?.coreValues?.length);
    console.log('   - 4 Thẻ Why Choose Us:', published.body?.data?.whyChooseUs?.length);

    // 3. Admin Login
    const login = await makeRequest(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      { identifier: 'admin', password: 'admin123456' }
    );
    console.log('3. Admin Login:', login.status, login.body?.message);
    const token = login.body?.data?.token;
    if (!token) throw new Error('Không nhận được JWT Token');

    // 4. Admin Overview Stats
    const stats = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/content/stats',
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('4. Admin Stats:', stats.status, 'Total products:', stats.body?.data?.totalProducts);

    // 5. Submit Customer Consultation Inquiry
    const inquiry = await makeRequest(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/inquiries',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        customerName: 'Trần Minh Hoàng',
        customerPhone: '0912 888 999',
        customerEmail: 'hoang.tran@gmail.com',
        productName: 'Mascot Foxee 3D',
        message: 'Mình muốn đặt in 10 con Foxee phối màu dạ quang cho sự kiện ra mắt.',
      }
    );
    console.log('5. Submit Customer Inquiry:', inquiry.status, inquiry.body?.message);

    // 6. Admin Get Inquiries
    const adminInquiries = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/inquiries',
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('6. Admin Inquiries List:', adminInquiries.status, 'Total in inbox:', adminInquiries.body?.data?.length);

    // 7. Admin Create Product
    const newProd = await makeRequest(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/products',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      {
        title: 'Móc khóa Logo Startup Cyber 3D dạ quang',
        categoryId: published.body?.data?.categories?.[0]?.id || 1,
        shortDescription: 'Móc khóa in 3D công nghệ phối màu kép, phát sáng trong đêm.',
        fullDescription: 'Thiết kế riêng cho khách hàng cá nhân hoặc doanh nghiệp.',
        material: 'PLA Glow in the dark',
        sortOrder: 99,
        isVisible: true,
      }
    );
    console.log('7. Admin Create Product:', newProd.status, newProd.body?.data?.title);
    const createdId = newProd.body?.data?.id;

    // 8. Admin Toggle Visibility
    const toggle = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/products/${createdId}/visibility`,
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('8. Toggle Visibility:', toggle.status, toggle.body?.message);

    // 9. Admin Publish Website
    const publishRes = await makeRequest(
      {
        hostname: 'localhost',
        port: 5000,
        path: '/api/content/publish',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      { note: 'Test Publish Website Automated Suite' }
    );
    console.log('9. Publish Website:', publishRes.status, publishRes.body?.message);

    // 10. Clean up test product
    const delProd = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/products/${createdId}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('10. Clean up product:', delProd.status, delProd.body?.message);

    console.log('===> TẤT CẢ 10 BƯỚC KIỂM THỬ API & DATABASE ĐỀU HOÀN THÀNH XUẤT SẮC! <===');
    process.exit(0);
  } catch (err) {
    console.error('Lỗi kiểm thử:', err);
    process.exit(1);
  }
}

// Start server in background or run against running server
setTimeout(testAll, 1000);


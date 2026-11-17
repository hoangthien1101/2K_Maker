# 2K MAKER – 3D PRINTING BRAND LANDING PAGE & ADMIN CMS

> **Slogan:** BIẾN Ý TƯỞNG THÀNH SẢN PHẨM 3D.  
> **Lĩnh vực:** Dịch vụ thiết kế và in 3D theo yêu cầu (Móc khóa, phụ kiện cá nhân, mô hình nhân vật, mascot, sản phẩm sáng tạo độc bản).

---

## 1. TỔNG QUAN DỰ ÁN

Website thương mại và hệ thống quản trị nội dung (CMS) hoàn chỉnh dành cho thương hiệu **2K MAKER**. Hệ thống được thiết kế theo kiến trúc Full-stack Client-Server, hoạt động với cơ sở dữ liệu thực tế, cung cấp đầy đủ:

1. **Khách hàng (Landing Page):**
   - **Hero Section:** Nhận diện thương hiệu 2K MAKER, Slogan, CTA mượt mà cuộn đến bộ sưu tập, ảnh 3D nổi bật.
   - **About Us Section:** Giới thiệu sứ mệnh, câu chuyện thương hiệu và 3 Giá trị cốt lõi (*Creativity*, *Personalization*, *Accessibility*).
   - **Product Showcase:** Lưới sản phẩm in 3D hiện đại, bộ lọc danh mục (Móc khóa, Phụ kiện, Mô hình, Mascot, Sản phẩm khác), tìm kiếm, modal chi tiết sản phẩm và nút "Đặt in 3D".
   - **Why Choose Us:** 4 thẻ lý do nổi bật (*01. Unique*, *02. Diverse*, *03. Affordable*, *04. Made To Order*).
   - **Contact Section:** Kết nối hotline, email, địa chỉ xưởng, liên kết mạng xã hội (Facebook, TikTok, Zalo) và Form gửi yêu cầu tư vấn / báo giá in 3D trực tuyến.
   - **Footer:** Logo, slogan, quick navigation và bản quyền thương hiệu.

2. **Quản trị viên (Admin Dashboard CMS tại `/admin`):**
   - **Đăng nhập & Bảo mật:** Xác thực JWT token, mã hóa bcrypt, bảo vệ route quản trị.
   - **Dashboard Tổng Quan:** Thống kê tổng sản phẩm, số lượng danh mục, trạng thái xuất bản, danh sách tin nhắn tư vấn và thao tác nhanh.
   - **Quản lý Hero:** Chỉnh sửa Slogan, tiêu đề, mô tả, ảnh banner, logo, nút CTA.
   - **Quản lý About Us:** Sửa câu chuyện thương hiệu, nội dung giới thiệu, CRUD 3 Giá trị cốt lõi, đổi ảnh xưởng.
   - **Quản lý Sản Phẩm (Đầy đủ):** Thêm, sửa, xóa sản phẩm, tải lên nhiều ảnh chất lượng cao, chọn ảnh đại diện (thumbnail), phân loại danh mục, bật/tắt hiển thị, sắp xếp thứ tự và quản lý danh mục sản phẩm.
   - **Quản lý Why Choose Us:** Chỉnh sửa 4 thẻ nội dung, icon, số thứ tự.
   - **Quản lý Contact:** Cập nhật Hotline, Email, Địa chỉ, Fanpage Facebook, TikTok, Zalo URL.
   - **Hộp thư Tư Vấn:** Tiếp nhận và xử lý yêu cầu gửi từ khách hàng, đánh dấu trạng thái (Mới, Đang tư vấn, Hoàn thành), xóa yêu cầu.
   - **Giao diện & Xuất bản (Publish):** Bật/tắt hiển thị từng section, đổi thứ tự hiển thị các section và nhấn **"Xuất bản website"** để đồng bộ nội dung tức thì ra Landing Page mà không cần build lại code!

---

## 2. KIẾN TRÚC CÔNG NGHỆ

- **Frontend:**
  - React 18 / TypeScript
  - Tailwind CSS (Bảng màu nhận diện: Xanh dương nhạt `#38bdf8`, Xanh navy `#0f172a`, Trắng sáng `#ffffff`, Xám thanh lịch `#f8fafc`)
  - Lucide Icons & Framer Motion
  - React Router DOM
  - Vite Bundler siêu tốc
- **Backend:**
  - Node.js & Express.js
  - RESTful API Architecture
  - JWT (JSON Web Tokens) Authentication
  - Multer (Xử lý upload ảnh vào thư mục `uploads/` và phục vụ static URL)
- **Database & ORM:**
  - **Sequelize ORM**
  - Hỗ trợ cả **Microsoft SQL Server (mssql via tedious)** lẫn **SQLite (Zero-config out-of-the-box)**.

---

## 3. THÔNG TIN ĐĂNG NHẬP ADMIN MẶC ĐỊNH

Truy cập: **`http://localhost:5000/admin`** (hoặc `http://localhost:3000/admin` khi chạy dev client)

| Thông tin | Giá trị |
| :--- | :--- |
| **Username** | `admin` *(hoặc `admin@2kmaker.vn`)* |
| **Mật khẩu** | `admin123456` |
| **Vai trò** | `admin` |

---

## 4. HƯỚNG DẪN CÀI ĐẶT & CHẠY ỨNG DỤNG

### Bước 1: Khởi động Backend & Chạy toàn bộ ứng dụng

Tại thư mục gốc dự án:
```powershell
# Chạy trực tiếp toàn bộ hệ thống (API + CMS + Landing Page):
npm start
```

Máy chủ sẽ tự động kết nối cơ sở dữ liệu, đồng bộ bảng Sequelize, seed dữ liệu mẫu chuẩn thương hiệu 2K MAKER và phục vụ tại:
- **Landing Page & Admin:** `http://localhost:5000`
- **Admin Portal:** `http://localhost:5000/admin`
- **API Health Check:** `http://localhost:5000/api/health`

### Bước 2: Chạy môi trường Phát triển (Development Mode)

Nếu muốn chỉnh sửa mã nguồn với tính năng Hot Reload (HMR):
```powershell
# Terminal 1: Chạy backend server (Port 5000)
npm run dev:server

# Terminal 2: Chạy frontend Vite (Port 3000, tự động proxy API sang Port 5000)
npm run dev:client
```

---

## 5. CẤU HÌNH CƠ SỞ DỮ LIỆU SQL SERVER

Hệ thống mặc định sử dụng SQLite để có thể chạy ngay lập tức mà không cần cài đặt SQL Server.

Nếu muốn chuyển sang sử dụng **Microsoft SQL Server**:
1. Mở file `server/.env`
2. Đổi các tham số cấu hình:
   ```env
   DB_DIALECT=mssql
   DB_HOST=localhost
   DB_PORT=1433
   DB_NAME=2k_maker_db
   DB_USER=sa
   DB_PASSWORD=MatKhauCuaBan123
   DB_ENCRYPT=false
   ```
3. Chạy lệnh seed để khởi tạo bảng và dữ liệu mẫu lên SQL Server:
   ```powershell
   npm run seed
   ```

---

## 6. DANH SÁCH RESTFUL API ENDPOINTS

### 1. Authentication (`/api/auth`)
- `POST /api/auth/login` - Đăng nhập quản trị viên, nhận JWT token.
- `GET /api/auth/me` - Kiểm tra thông tin phiên đăng nhập.
- `PUT /api/auth/profile` - Đổi mật khẩu / cập nhật tài khoản.

### 2. Website Content & CMS (`/api/content`)
- `GET /api/content/published` - Lấy dữ liệu xuất bản chính thức cho Landing Page.
- `GET /api/content/draft` - Lấy dữ liệu bản nháp cho Admin CMS (Protected).
- `POST /api/content/publish` - Xuất bản toàn bộ nội dung nháp ra ngoài Landing Page (Protected).
- `GET /api/content/stats` - Lấy số liệu thống kê Dashboard Overview (Protected).
- `GET/PUT /api/content/hero` - Xem và sửa Hero banner.
- `GET/PUT /api/content/about` - Xem và sửa About Us.
- `GET/POST/PUT/DELETE /api/content/core-values` - Quản lý Giá trị cốt lõi.
- `GET/POST/PUT/DELETE /api/content/why-choose-us` - Quản lý 4 thẻ Why Choose Us.
- `GET/PUT /api/content/contact` - Quản lý thông tin liên hệ.
- `GET/PUT /api/content/sections` - Bật/tắt và sắp xếp thứ tự hiển thị Section.

### 3. Products & Categories (`/api/products`)
- `GET /api/products` - Lấy danh sách sản phẩm (hỗ trợ category, search, isAdmin filter).
- `GET /api/products/:id` - Xem chi tiết sản phẩm.
- `POST /api/products` - Thêm sản phẩm mới (Protected).
- `PUT /api/products/:id` - Cập nhật sản phẩm (Protected).
- `DELETE /api/products/:id` - Xóa sản phẩm (Protected).
- `PATCH /api/products/:id/visibility` - Bật/tắt hiển thị nhanh (Protected).
- `GET /api/products/categories` - Danh sách danh mục sản phẩm.
- `POST/PUT/DELETE /api/products/categories` - Quản lý danh mục (Protected).

### 4. Inquiries & Consultations (`/api/inquiries`)
- `POST /api/inquiries` - Khách hàng gửi yêu cầu tư vấn / đặt in 3D từ Landing Page.
- `GET /api/inquiries` - Admin xem danh sách tin nhắn (Protected).
- `PUT /api/inquiries/:id` - Đổi trạng thái xử lý (`new`, `contacted`, `completed`) (Protected).
- `DELETE /api/inquiries/:id` - Xóa tin nhắn (Protected).

### 5. File Uploads (`/api/upload`)
- `POST /api/upload/single` - Tải lên 01 ảnh (Protected).
- `POST /api/upload/multiple` - Tải lên nhiều ảnh sản phẩm cùng lúc (Protected).

---

## 7. CẤU TRÚC THƯ MỤC DỰ ÁN

```
2K MAKER/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js            # Cấu hình Sequelize (SQLite & MSSQL)
│   │   ├── models/                    # Sequelize Models
│   │   │   ├── User.js                # Quản trị viên
│   │   │   ├── ProductCategory.js     # Danh mục sản phẩm
│   │   │   ├── Product.js             # Sản phẩm in 3D (nhiều ảnh, thông số)
│   │   │   ├── HeroContent.js         # Nội dung Hero
│   │   │   ├── AboutContent.js        # Giới thiệu & câu chuyện
│   │   │   ├── CoreValue.js           # Giá trị cốt lõi
│   │   │   ├── WhyChooseUsItem.js     # 4 thẻ Why Choose Us
│   │   │   ├── ContactInfo.js         # Hotline, Email, MXH
│   │   │   ├── SectionSetting.js      # Bật/tắt & thứ tự section
│   │   │   ├── ContactInquiry.js      # Tin nhắn tư vấn khách hàng
│   │   │   └── PublishSnapshot.js     # Bản chụp xuất bản
│   │   ├── controllers/               # Xử lý logic API
│   │   ├── middlewares/               # JWT Auth, Multer Upload
│   │   ├── routes/                    # API Endpoints
│   │   ├── seeders/
│   │   │   └── seedData.js            # Khởi tạo dữ liệu thương hiệu mẫu
│   │   └── server.js                  # Express server
│   ├── uploads/                       # Thư mục chứa ảnh tải lên
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/               # Các Section Landing Page
│   │   │   └── admin/                 # Giao diện Admin, Sidebar, Header, Upload
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx        # Trang chủ khách hàng
│   │   │   └── admin/                 # 8 màn hình quản trị CMS
│   │   ├── context/                   # AuthContext, ToastContext
│   │   ├── services/                  # Gọi API Backend
│   │   ├── types/                     # TypeScript Interfaces
│   │   ├── App.tsx                    # React Router
│   │   └── index.css                  # Tailwind styles
│   ├── dist/                          # Production Build Bundle
│   └── package.json
├── package.json                       # Root script điều phối
└── README.md
```


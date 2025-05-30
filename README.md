# Meteo-nix
<img width="1980" alt="Screenshot 2023-10-29 at 13 39 22" src="https://github.com/DariusLukasukas/nextjs-weather-app/assets/64962012/dcad0360-77b0-4f70-bc2e-0c0bf04c1d8c">

## 📝 Tổng quan
Chào mừng bạn đến với Meteo-nix, một ứng dụng thời tiết hiện đại được xây dựng bằng công nghệ tiên tiến. Ứng dụng được phát triển bằng Next.js 14, TypeScript, Tailwind CSS và thư viện giao diện Shadcn UI, mang đến trải nghiệm thời tiết mượt mà. Ứng dụng cũng tích hợp React Hotkeys Hook để chuyển đổi giao diện mượt mà, React Map GL để tích hợp bản đồ Mapbox, và cung cấp gợi ý địa điểm thông minh nhờ Google Maps Places API.

## 📚 Tài liệu dự án

### Tài liệu kỹ thuật (SRS)
Xem chi tiết tại: [docs/srs/README.md](./docs/srs/README.md)

### Tài liệu yêu cầu kinh doanh (BRD)
Xem chi tiết tại: [docs/brd/README.md](./docs/brd/README.md)

## 🚀 Tính năng chính
- **Thời tiết hiện tại:** Cung cấp thông tin thời tiết hiện tại bao gồm nhiệt độ, lượng mưa, tốc độ gió, chỉ số UV và hơn thế nữa.
- **Dự báo:** Xem dự báo thời tiết 10 ngày và 24 giờ tới.
- **Menu lệnh:** Mở menu lệnh bằng phím tắt (Command+J) để truy cập nhanh chức năng tìm kiếm.
- **Tự động hoàn thành thông minh:** Trải nghiệm tìm kiếm địa điểm mượt mà với gợi ý tự động hoàn thành từ Google Maps Places API.
- **Chuyển đổi giao diện mượt mà:** Chuyển đổi giữa các chủ đề (Phím tắt: T) một cách dễ dàng.
- **Bản đồ tương tác:** Khám phá bản đồ động với các lớp dữ liệu thời tiết tùy chỉnh.

## 🛠 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js 16.8 trở lên
- npm hoặc yarn
- API keys từ Mapbox và Google Maps

### Các bước cài đặt

1. **Clone dự án**
   ```bash
   git clone https://github.com/DariusLukasukas/nextjs-weather-app.git
   cd nextjs-weather-app
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   # hoặc
   yarn
   ```

3. **Cấu hình biến môi trường**
   Tạo file `.env.local` trong thư mục gốc và thêm các biến sau:
   ```
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Chạy dự án**
   ```bash
   npm run dev
   # hoặc
   yarn dev
   ```

5. **Mở trình duyệt**
   Truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 📝 Cách sử dụng

### Tìm kiếm thời tiết
- Sử dụng thanh tìm kiếm để tìm địa điểm
- Ứng dụng sẽ tự động phát hiện vị trí của bạn

### Xem dự báo
- Xem dự báo 24 giờ bằng cách cuộn ngang
- Xem dự báo 10 ngày ở phần dưới cùng

### Bản đồ tương tác
- Phóng to/thu nhỏ bằng chuột hoặc nút điều khiển
- Chọn lớp dữ liệu thời tiết từ menu

## 🛠 Công nghệ sử dụng
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/)
- [Google Maps Places API](https://developers.google.com/maps/documentation/places/web-service/overview)

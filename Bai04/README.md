
# BAO.DEV — PERSONAL PORTFOLIO V2.0

![NodeJS](https://img.shields.io/badge/Node.js-Express-339933)
![HTML5](https://img.shields.io/badge/HTML5-Frontend-E34F26)
![CSS3](https://img.shields.io/badge/CSS3-Cyberpunk-1572B6)
![JavaScript](https://img.shields.io/badge/JavaScript-Interactive-F7DF1E)

> WEBSITE GIỚI THIỆU CÁ NHÂN
>
> NEVER STOP LEARNING — KEEP CODING

---

# BÀI 4: XÂY DỰNG WEB VỚI EXPRESS FRAMEWORK

## Bài tập 01: Xây dựng website giới thiệu cá nhân

## 1. Thông tin sinh viên

| Nội dung | Thông tin |
|---|---|
| Họ và tên | Đỗ Trung Ngọc Bảo |
| Mã sinh viên | CD-CNTT18A05 |
| Lớp | CD-CNTT18A |
| Ngành | Công nghệ thông tin |
| Môn học | NodeJS |
| Bài thực hành | Bài 4 - BT01 |
| Tên dự án | BAO.DEV |
| Phiên bản giao diện | V2.0 |

---

# PHẦN I. XÂY DỰNG WEBSITE TRÊN LOCALHOST

## 2. Mục tiêu bài thực hành

- Làm quen với Express Framework.
- Khởi tạo dự án Node.js.
- Cài đặt và sử dụng thư viện Express.
- Xây dựng Web Server.
- Khai báo và xử lý các Route.
- Xây dựng website giới thiệu cá nhân.
- Thiết kế giao diện bằng HTML và CSS.
- Xây dựng thanh menu điều hướng.
- Sử dụng JavaScript để xử lý tương tác.
- Xử lý đường dẫn không tồn tại bằng HTTP 404.
- Tìm hiểu và triển khai website lên Hosting.

## 3. Giới thiệu dự án

BAO.DEV là website giới thiệu cá nhân được xây dựng
bằng Node.js và Express Framework.

Website cung cấp thông tin giới thiệu bản thân,
kỹ năng lập trình, sở thích và chức năng liên hệ.

Giao diện được thiết kế theo phong cách công nghệ
Cyberpunk, kết hợp màu xanh Neon, tím và nền tối.

Website hỗ trợ chuyển đổi giao diện sáng tối,
hiệu ứng chuyển động, bố cục Responsive và
các chức năng tương tác bằng JavaScript.

## 4. Công nghệ sử dụng

| Công nghệ | Vai trò |
|---|---|
| Node.js | Môi trường chạy JavaScript phía Server |
| Express | Xây dựng Web Server và Routing |
| HTML5 | Xây dựng cấu trúc giao diện |
| CSS3 | Thiết kế giao diện và hiệu ứng |
| JavaScript | Xử lý tương tác người dùng |
| JSON | Trao đổi dữ liệu với API |
| REST API | Cung cấp dữ liệu từ Server |
| LocalStorage | Lưu trạng thái giao diện sáng tối |
| GitHub | Lưu trữ và quản lý mã nguồn |
| Render | Nền tảng dự kiến triển khai website |

## 5. Các chức năng chính

### 5.1. Trang chủ — Home

- Hiển thị tên và thông tin giới thiệu.
- Hiển thị avatar NB Developer.
- Hiệu ứng chữ động.
- Hiệu ứng vòng tròn công nghệ.
- Hiển thị trạng thái Server.
- Điều hướng đến các trang chức năng.

### 5.2. Trang giới thiệu — About

- Giới thiệu thông tin cá nhân.
- Giới thiệu ngành học.
- Trình bày hành trình học tập.
- Trình bày mục tiêu phát triển bản thân.

### 5.3. Trang kỹ năng — Skills

- Hiển thị các kỹ năng lập trình.
- Hiển thị các nhóm công nghệ.
- Lọc kỹ năng theo danh mục.
- Trình bày kỹ năng bằng giao diện thẻ.

### 5.4. Trang sở thích — Hobbies

- Hiển thị sở thích cá nhân.
- Trình bày các hoạt động yêu thích.
- Giao diện thẻ kết hợp hiệu ứng.

### 5.5. Trang liên hệ — Contact

- Nhập họ tên.
- Nhập địa chỉ Email.
- Nhập nội dung lời nhắn.
- Đếm số ký tự.
- Kiểm tra dữ liệu trống.
- Kiểm tra định dạng Email.
- Gửi dữ liệu đến Express Server.
- Hiển thị thông báo thành công hoặc lỗi.
- Xóa nội dung biểu mẫu.

Lưu ý: Chức năng liên hệ chỉ mô phỏng việc
gửi lời nhắn, không gửi Email thực tế
và không lưu dữ liệu vào cơ sở dữ liệu.

### 5.6. Chuyển đổi giao diện

- Dark Mode.
- Light Mode.
- Lưu lựa chọn bằng LocalStorage.

### 5.7. API thông tin cá nhân

- Trả về thông tin dưới dạng JSON.
- Cung cấp dữ liệu giới thiệu và công nghệ.

### 5.8. API trạng thái Server

- Hiển thị trạng thái ONLINE.
- Hiển thị tên ứng dụng.
- Hiển thị phiên bản.
- Hiển thị Framework.
- Hiển thị thời gian hoạt động.

### 5.9. Xử lý lỗi HTTP 404

- Phát hiện đường dẫn không tồn tại.
- Trả về mã trạng thái HTTP 404.
- Hiển thị giao diện lỗi riêng.
- Hiển thị đường dẫn bị lỗi.
- Hỗ trợ quay lại trang trước.
- Hỗ trợ trở về trang chủ.

### 5.10. Các chức năng bổ sung

- Responsive trên nhiều kích thước màn hình.
- Menu điều hướng trên điện thoại.
- Thanh tiến trình cuộn trang.
- Nút trở về đầu trang.
- Hiệu ứng chuyển động.
- Thông báo Toast.
- Sao chép nội dung mẫu.
- Nhật ký truy cập HTTP trên Terminal.

---

## 6. Danh sách Route

| STT | Method | Đường dẫn | Chức năng |
|---|---|---|---|
| 1 | GET | / | Trang chủ |
| 2 | GET | /about | Giới thiệu |
| 3 | GET | /skills | Kỹ năng |
| 4 | GET | /hobbies | Sở thích |
| 5 | GET | /contact | Liên hệ |
| 6 | POST | /contact | Xử lý lời nhắn |
| 7 | GET | /api/profile | API thông tin cá nhân |
| 8 | GET | /api/status | API trạng thái Server |
| 9 | GET | /404-test | Kiểm tra HTTP 404 |

Route `/404-test` không phải một trang
được khai báo riêng. Đây là đường dẫn
dùng để kiểm tra bộ xử lý HTTP 404.

## 7. Cấu trúc thư mục

```text
Bt01/
│
├── IMAGES/
│   ├── 01-CaiDatExpress.png
│   ├── 02-CauTrucThuMuc.png
│   ├── 03-AppJS-Routing.png
│   ├── 04-KhoiDongServer.png
│   ├── 05-TrangChu.png
│   ├── 06-GioiThieu.png
│   ├── 07-KyNang.png
│   ├── 08-SoThich.png
│   ├── 09-LienHe.png
│   ├── 10-GuiLoiNhan.png
│   ├── 11-Loi404.png
│   ├── 12-GiaoDienSang.png
│   ├── 13-ServerAPI.png
│   ├── 14-ProfileAPI.png
│   └── 15-TerminalHTTP.png
│
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
│
├── views/
│   ├── index.html
│   ├── about.html
│   ├── skills.html
│   ├── hobbies.html
│   ├── contact.html
│   └── 404.html
│
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
└── Readme.md
```

Thư mục node_modules được tạo tự động
khi cài đặt thư viện và không đưa lên GitHub.

## 8. Giải thích các tập tin

| Tập tin | Chức năng |
|---|---|
| app.js | Khởi tạo Server, Route, API và xử lý lỗi |
| index.html | Giao diện trang chủ |
| about.html | Giao diện giới thiệu |
| skills.html | Giao diện kỹ năng |
| hobbies.html | Giao diện sở thích |
| contact.html | Giao diện liên hệ |
| 404.html | Giao diện lỗi 404 |
| style.css | Thiết kế giao diện và hiệu ứng |
| script.js | Xử lý tương tác phía Client |
| package.json | Khai báo dự án và thư viện |
| package-lock.json | Quản lý phiên bản thư viện |
| .gitignore | Loại bỏ tập tin không cần đưa lên GitHub |
| Readme.md | Báo cáo bài thực hành |
| IMAGES | Lưu ảnh minh chứng thực hiện |

## 9. Các bước thực hiện

### Bước 1. Kiểm tra Node.js

Mở Terminal trong Visual Studio Code.

```bash
node -v
npm -v
```

### Bước 2. Khởi tạo dự án

```bash
npm init -y
```

Lệnh trên tạo tập tin package.json.

### Bước 3. Cài đặt Express Framework

```bash
npm install express
```

Lệnh trên cài đặt Express và
các thư viện phụ thuộc.

### Bước 4. Thiết lập thông tin dự án

```bash
npm pkg set name="bao-dev-portfolio"
npm pkg set version="1.0.0"
npm pkg set scripts.start="node app.js"
```

### Bước 5. Xây dựng Express Server

Tạo tập tin app.js, sử dụng Express
và module path để xây dựng Web Server.

Server sử dụng cổng mặc định 3000
khi chạy trên Localhost.

Khai báo cổng bằng biến môi trường
để hỗ trợ triển khai Hosting.

```javascript
const PORT = process.env.PORT || 3000;
```

### Bước 6. Xây dựng Routing

Khai báo các Route:

- /
- /about
- /skills
- /hobbies
- /contact

Sử dụng phương thức app.get()
để xử lý yêu cầu GET.

Sử dụng phương thức app.post()
để xử lý dữ liệu liên hệ.

### Bước 7. Xây dựng giao diện

Tạo các tập tin HTML trong thư mục views.

Sử dụng CSS để thiết kế giao diện.

Sử dụng JavaScript để xử lý các
chức năng tương tác.

### Bước 8. Xử lý lỗi HTTP 404

Sử dụng Middleware cuối cùng để
xử lý các đường dẫn không tồn tại.

```javascript
app.use((req, res) => {
    res.status(404).sendFile(
        path.join(__dirname, 'views', '404.html')
    );
});
```

### Bước 9. Kiểm tra cú pháp

```bash
node --check app.js
```

### Bước 10. Khởi động Server

```bash
node app.js
```

Hoặc sử dụng:

```bash
npm start
```

### Bước 11. Truy cập website

http://localhost:3000

### Lưu ý đối với Windows PowerShell

Nếu gặp lỗi thực thi npm.ps1,
có thể sử dụng npm.cmd thay cho npm.

```bash
npm.cmd install
npm.cmd start
```

---

## 10. Hình ảnh thực hiện và kết quả

### 10.1. Cài đặt Express Framework

![Cài đặt Express](IMAGES/01-CaiDatExpress.png)

Express được cài đặt bằng npm.

### 10.2. Cấu trúc thư mục dự án

![Cấu trúc thư mục](IMAGES/02-CauTrucThuMuc.png)

Dự án được tổ chức thành các thư mục
chứa giao diện, tài nguyên và ảnh minh chứng.

### 10.3. Xây dựng Express Routing

![Express Routing](IMAGES/03-AppJS-Routing.png)

Khai báo các Route và chức năng trên Server.

### 10.4. Khởi động Web Server

![Khởi động Server](IMAGES/04-KhoiDongServer.png)

Khởi động Web Server bằng lệnh node app.js.

### 10.5. Giao diện trang chủ

![Trang chủ](IMAGES/05-TrangChu.png)

Đường dẫn: http://localhost:3000/

### 10.6. Giao diện giới thiệu

![Giới thiệu](IMAGES/06-GioiThieu.png)

Đường dẫn: http://localhost:3000/about

### 10.7. Giao diện kỹ năng

![Kỹ năng](IMAGES/07-KyNang.png)

Đường dẫn: http://localhost:3000/skills

### 10.8. Giao diện sở thích

![Sở thích](IMAGES/08-SoThich.png)

Đường dẫn: http://localhost:3000/hobbies

### 10.9. Giao diện liên hệ

![Liên hệ](IMAGES/09-LienHe.png)

Đường dẫn: http://localhost:3000/contact

### 10.10. Kiểm tra gửi lời nhắn

![Gửi lời nhắn](IMAGES/10-GuiLoiNhan.png)

Kiểm tra chức năng tiếp nhận và xác thực
dữ liệu biểu mẫu liên hệ.

### 10.11. Giao diện lỗi HTTP 404

![Lỗi 404](IMAGES/11-Loi404.png)

Đường dẫn kiểm thử:
http://localhost:3000/404-test

### 10.12. Giao diện Light Mode

![Light Mode](IMAGES/12-GiaoDienSang.png)

Kiểm tra khả năng chuyển đổi giao diện sáng tối.

### 10.13. API trạng thái Server

![Server API](IMAGES/13-ServerAPI.png)

Đường dẫn: http://localhost:3000/api/status

### 10.14. API thông tin cá nhân

![Profile API](IMAGES/14-ProfileAPI.png)

Đường dẫn: http://localhost:3000/api/profile

### 10.15. Nhật ký HTTP trên Terminal

![Terminal HTTP](IMAGES/15-TerminalHTTP.png)

Kiểm tra các mã trạng thái HTTP 200 và HTTP 404.

---

## 11. Kiểm thử chức năng

| STT | Nội dung kiểm thử | Kết quả mong đợi |
|---|---|---|
| 1 | Khởi động Server | Server hoạt động |
| 2 | Trang chủ | HTTP 200 |
| 3 | Trang giới thiệu | HTTP 200 |
| 4 | Trang kỹ năng | HTTP 200 |
| 5 | Trang sở thích | HTTP 200 |
| 6 | Trang liên hệ | HTTP 200 |
| 7 | Gửi lời nhắn hợp lệ | Thông báo thành công |
| 8 | Email không hợp lệ | Thông báo lỗi |
| 9 | Dữ liệu bị bỏ trống | Thông báo lỗi |
| 10 | Chuyển Light Mode | Giao diện sáng |
| 11 | Chuyển Dark Mode | Giao diện tối |
| 12 | Server API | JSON - ONLINE |
| 13 | Profile API | JSON thông tin cá nhân |
| 14 | Đường dẫn không tồn tại | HTTP 404 |
| 15 | Menu điều hướng | Chuyển trang chính xác |

Kết quả thực tế được đối chiếu với
các ảnh minh chứng trong thư mục IMAGES.

---

# PHẦN II. KHẢO SÁT VÀ TRIỂN KHAI HOSTING

## 12. Khái niệm Hosting

Hosting là dịch vụ cung cấp môi trường
để lưu trữ và vận hành website trên Internet.

Khi triển khai lên Hosting, người dùng
có thể truy cập website bằng địa chỉ
công khai thay vì chỉ sử dụng Localhost.

Đối với dự án Express, Hosting cần hỗ trợ
thực thi Node.js hoặc môi trường tương thích.

## 13. Khảo sát 3 dịch vụ Hosting miễn phí

### 13.1. Render

- Website: https://render.com
- Hỗ trợ Node.js và Express.
- Có gói Free Web Service.
- Hỗ trợ triển khai từ GitHub.
- Cung cấp tên miền onrender.com.
- Hỗ trợ HTTPS.
- Có nhật ký Build và Deploy.

Ưu điểm:

- Phù hợp với ứng dụng Express.
- Cấu hình tương đối đơn giản.
- Có thể triển khai từ thư mục con.

Hạn chế:

- Server miễn phí có thể ngủ
  sau 15 phút không có truy cập.
- Lần truy cập lại có thể mất thời gian.
- Có giới hạn tài nguyên và thời gian sử dụng.

Tài liệu:

https://render.com/docs/free

https://render.com/docs/web-services

### 13.2. Vercel

- Website: https://vercel.com
- Có gói Hobby.
- Hỗ trợ Node.js thông qua Functions.
- Hỗ trợ triển khai ứng dụng Express.
- Hỗ trợ kết nối GitHub.
- Cung cấp tên miền vercel.app.

Ưu điểm:

- Triển khai nhanh.
- Hỗ trợ HTTPS.
- Phù hợp với nhiều dự án cá nhân.

Hạn chế:

- Hoạt động theo mô hình Serverless.
- Có giới hạn tài nguyên và thời gian xử lý.
- Một số ứng dụng cần điều chỉnh cấu hình.
- Gói Hobby dành cho mục đích cá nhân,
  phi thương mại.

Tài liệu tham khảo:

https://vercel.com/docs

### 13.3. Koyeb

- Website: https://www.koyeb.com
- Có lựa chọn tài nguyên miễn phí.
- Hỗ trợ Node.js.
- Hỗ trợ triển khai ứng dụng Web.
- Hỗ trợ kết nối GitHub.
- Hỗ trợ triển khai bằng Container.

Ưu điểm:

- Có thể chạy ứng dụng Backend.
- Hỗ trợ nhiều ngôn ngữ lập trình.
- Hỗ trợ triển khai mã nguồn tự động.

Hạn chế:

- Tài nguyên miễn phí giới hạn.
- Có thể có yêu cầu xác minh tài khoản.
- Các điều kiện sử dụng gói miễn phí
  phụ thuộc chính sách của nền tảng.

Tài liệu tham khảo:

https://www.koyeb.com/docs

## 14. Bảng so sánh Hosting

| Tiêu chí | Render | Vercel | Koyeb |
|---|---|---|---|
| Hỗ trợ Node.js | Có | Có | Có |
| Hỗ trợ Express | Có | Có | Có |
| Lựa chọn miễn phí | Free | Hobby | Free |
| Kết nối GitHub | Có | Có | Có |
| HTTPS | Có | Có | Có |
| Mô hình | Web Service | Serverless | Web Service |
| Giới hạn | Tài nguyên, ngủ khi rảnh | Functions | Tài nguyên |

Các gói miễn phí có thể thay đổi theo
chính sách của từng nhà cung cấp.

## 15. Lựa chọn Hosting

Dịch vụ được lựa chọn: Render.

Lý do:

- Hỗ trợ trực tiếp Node.js và Express.
- Có gói Web Service miễn phí.
- Có thể sử dụng mã nguồn GitHub.
- Hỗ trợ thư mục Root Directory.
- Hỗ trợ HTTPS và tên miền công khai.
- Phù hợp với bài thực hành sinh viên.

---

## 16. Hướng dẫn triển khai website lên Render

### Bước 1. Chuẩn bị mã nguồn

Đảm bảo GitHub có đầy đủ:

- app.js
- package.json
- package-lock.json
- public/
- views/
- Readme.md

Không đưa node_modules lên GitHub.

### Bước 2. Kiểm tra lệnh Start

Trong package.json cần có:

```json
{
    "scripts": {
        "start": "node app.js"
    }
}
```

Đây là nội dung cần có trong scripts,
không phải toàn bộ file package.json.

### Bước 3. Kiểm tra cổng Server

Server sử dụng:

```javascript
const PORT = process.env.PORT || 3000;
```

Và lắng nghe trên host 0.0.0.0.

Điều này cho phép Hosting cấp cổng
hoạt động phù hợp với môi trường triển khai.

### Bước 4. Đăng nhập Render

Truy cập:

https://dashboard.render.com

Đăng nhập bằng tài khoản được phép sử dụng.

### Bước 5. Tạo Web Service

- Chọn New.
- Chọn Web Service.
- Kết nối GitHub.
- Chọn repository NodeJS-DoTrungNgocBao.

### Bước 6. Cấu hình Web Service

| Thuộc tính | Giá trị |
|---|---|
| Name | bao-dev-portfolio |
| Language | Node |
| Branch | main |
| Root Directory | Bai04/Bt01 |
| Build Command | npm ci |
| Start Command | npm start |
| Instance Type | Free |
| Health Check Path | /api/status |

Tên Service có thể thay đổi nếu đã được sử dụng.

Chỉ lựa chọn gói Free, không đăng ký
gói trả phí ngoài yêu cầu bài tập.

### Bước 7. Triển khai website

- Kiểm tra lại cấu hình.
- Chọn Deploy Web Service.
- Chờ hệ thống cài đặt thư viện.
- Theo dõi Build Logs.
- Theo dõi Deploy Logs.
- Kiểm tra trạng thái triển khai.

### Bước 8. Kiểm tra website trực tuyến

Sau khi triển khai thành công,
Render sẽ cung cấp đường dẫn website.

Kiểm tra các chức năng:

- Trang chủ.
- Trang giới thiệu.
- Trang kỹ năng.
- Trang sở thích.
- Trang liên hệ.
- API trạng thái Server.
- API thông tin cá nhân.
- Xử lý lỗi HTTP 404.

---

## 17. Hình ảnh triển khai Hosting

Các ảnh dưới đây sẽ được bổ sung sau khi
triển khai thực tế và kiểm tra thành công.

| Tên ảnh dự kiến | Nội dung |
|---|---|
| 16-RenderDashboard.png | Trang quản lý Render |
| 17-RenderConfig.png | Cấu hình Web Service |
| 18-RenderDeploy.png | Kết quả triển khai |
| 19-WebsiteOnline.png | Website hoạt động online |
| 20-Online404.png | Kiểm tra lỗi 404 online |

Sau khi có ảnh thực tế, bổ sung các
liên kết hình ảnh tương ứng vào mục này.

## 18. Đường dẫn website

### Website Localhost

http://localhost:3000

### Website Hosting

Trạng thái: Chưa triển khai.

Đường dẫn chính thức:
Sẽ cập nhật sau khi Render cấp URL.

### Mã nguồn GitHub

https://github.com/DoTrungNgocBao/NodeJS-DoTrungNgocBao/tree/main/Bai04/Bt01

---

## 19. Hướng dẫn tải và chạy dự án

### Bước 1. Tải mã nguồn

```bash
git clone https://github.com/DoTrungNgocBao/NodeJS-DoTrungNgocBao.git
```

### Bước 2. Di chuyển vào thư mục

```bash
cd NodeJS-DoTrungNgocBao/Bai04/Bt01
```

### Bước 3. Cài đặt thư viện

```bash
npm install
```

### Bước 4. Khởi động ứng dụng

```bash
npm start
```

### Bước 5. Mở trình duyệt

http://localhost:3000

---

## 20. Kiến thức đạt được

Thông qua bài thực hành:

- Hiểu cách hoạt động của Express Framework.
- Biết khởi tạo dự án Node.js.
- Biết xây dựng Web Server.
- Biết khai báo và xử lý Route.
- Biết sử dụng Middleware.
- Biết phục vụ tập tin tĩnh.
- Biết tiếp nhận dữ liệu biểu mẫu.
- Biết xây dựng API JSON.
- Biết xử lý mã trạng thái HTTP.
- Biết thiết kế giao diện Responsive.
- Biết quản lý mã nguồn bằng GitHub.
- Tìm hiểu quy trình triển khai Hosting.

## 21. Hạn chế và hướng phát triển

### Hạn chế

- Website chưa sử dụng cơ sở dữ liệu.
- Chức năng liên hệ chưa gửi Email thực tế.
- Chưa có hệ thống quản trị nội dung.
- Hosting miễn phí có giới hạn tài nguyên.
- Chưa xác nhận kết quả triển khai online.

### Hướng phát triển

- Tích hợp MongoDB.
- Xây dựng hệ thống quản trị.
- Bổ sung chức năng quản lý dự án cá nhân.
- Tích hợp dịch vụ gửi Email.
- Nâng cấp trải nghiệm người dùng.
- Tối ưu hiệu suất website.

## 22. Kết luận

BAO.DEV là dự án website giới thiệu cá nhân
được xây dựng nhằm vận dụng kiến thức
Node.js và Express Framework.

Dự án bao gồm hệ thống Routing, giao diện
HTML/CSS, JavaScript tương tác, API JSON,
biểu mẫu liên hệ và xử lý lỗi HTTP 404.

Dự án hướng đến việc đáp ứng đầy đủ
yêu cầu của bài thực hành.

Phần triển khai Hosting sẽ được xác nhận
sau khi website hoạt động trên Internet.

## 23. Tài liệu tham khảo

- Node.js: https://nodejs.org
- Express: https://expressjs.com
- MDN: https://developer.mozilla.org
- GitHub: https://github.com
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- Koyeb: https://www.koyeb.com/docs

---

# BAO.DEV — PERSONAL PORTFOLIO V2.0

**DEVELOPED BY ĐỖ TRUNG NGỌC BẢO**

**CD-CNTT18A05 — INFORMATION TECHNOLOGY**

**NEVER STOP LEARNING — KEEP CODING**

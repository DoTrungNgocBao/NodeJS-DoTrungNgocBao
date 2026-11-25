
---

## 16. Hướng dẫn sử dụng chi tiết

### 16.1. Chạy bài thực hành - Chức năng 01

Nhập 01 tại NEXUS COMMAND và nhấn Enter.

Chương trình thực hiện:

1. Kiểm tra kết nối MongoDB.
2. Xác định cơ sở dữ liệu qlsinhvien.
3. Khởi tạo collection departments.
4. Khởi tạo collection students_join.
5. Xác định trường liên kết makhoa.
6. Thực hiện aggregate() và $lookup.
7. Xử lý dữ liệu bằng $unwind và $project.
8. Hiển thị danh sách sinh viên kèm tên khoa.

Kết quả thực tế: hoàn thành 8/8 bước.

### 16.2. Xem danh sách sinh viên - Chức năng 02

Nhập 02 và nhấn Enter.

Chương trình hiển thị danh sách sinh viên gồm:

- Mã sinh viên.
- Họ và tên.
- Mã khoa.
- Tên khoa tương ứng.

### 16.3. Xem danh sách khoa - Chức năng 03

Nhập 03 và nhấn Enter.

Chương trình hiển thị mã khoa và tên khoa
của tất cả các khoa trong cơ sở dữ liệu.

### 16.4. Thêm sinh viên - Chức năng 04

Nhập 04 và nhấn Enter.

Nhập các thông tin theo yêu cầu:

- Mã sinh viên.
- Họ và tên.
- Mã khoa.

Chương trình kiểm tra mã sinh viên đã tồn tại
và kiểm tra mã khoa có hợp lệ hay không.

### 16.5. Thêm khoa - Chức năng 05

Nhập 05 và nhấn Enter.

Nhập mã khoa và tên khoa mới.

Chương trình kiểm tra dữ liệu rỗng
và mã khoa bị trùng trước khi thêm.

### 16.6. Tìm kiếm sinh viên - Chức năng 06

Nhập 06 và nhấn Enter.

Nhập mã sinh viên hoặc họ tên cần tìm kiếm.

Ví dụ: SV001 hoặc Nguyễn Minh Anh.

Kết quả tìm kiếm hiển thị kèm tên khoa.

### 16.7. Xem sinh viên theo khoa - Chức năng 07

Nhập 07 và nhấn Enter.

Nhập mã khoa cần xem.

Ví dụ: CNTT.

Với dữ liệu mẫu ban đầu, kết quả dự kiến gồm:

- SV001 - Nguyễn Minh Anh.
- SV005 - Võ Minh Khang.
- SV009 - Phan Bảo Ngọc.

### 16.8. Cập nhật khoa của sinh viên - Chức năng 08

Nhập 08 và nhấn Enter.

Nhập mã sinh viên và mã khoa mới.

Chương trình kiểm tra dữ liệu và yêu cầu
xác nhận trước khi cập nhật.

### 16.9. Thống kê sinh viên - Chức năng 09

Nhập 09 và nhấn Enter.

Chương trình thống kê:

- Tổng số sinh viên.
- Tổng số khoa.
- Số sinh viên của từng khoa.
- Tỷ lệ phần trăm.
- Biểu đồ phân bố sinh viên.

Kết quả thực tế:

| Khoa | Số sinh viên | Tỷ lệ |
|---|---:|---:|
| Công nghệ thông tin | 3 | 25% |
| Du lịch | 3 | 25% |
| Điện - Điện tử | 3 | 25% |
| Kinh tế | 3 | 25% |
| Tổng cộng | 12 | 100% |

![Kết quả thống kê](IMAGES/10-ThongKe.png)

### 16.10. Xuất báo cáo - Chức năng 10

Nhập 10 và nhấn Enter.

Chương trình sử dụng module fs để tạo thư mục
reports và ghi báo cáo vào tập tin:

reports/baocao_bai10.txt

### 16.11. Kiểm tra hệ thống - Chức năng 11

Nhập 11 và nhấn Enter.

Chương trình cung cấp thông tin:

- Phiên bản Node.js.
- Hệ điều hành.
- Đường dẫn chương trình.
- Địa chỉ kết nối MongoDB.
- Tên cơ sở dữ liệu.
- Tên các collection.
- Số lượng dữ liệu.
- Trạng thái kết nối.

### 16.12. Thoát chương trình - Chức năng 00

Nhập 00 và nhấn Enter.

Chương trình kết thúc và đóng kết nối MongoDB.

---

## 17. Phân tích các hàm chính

### 17.1. Hàm connectDB()

Có nhiệm vụ kết nối MongoDB, xác định database
và các collection cần sử dụng.

### 17.2. Hàm getJoinedStudents()

Thực hiện truy vấn aggregate() kết hợp $lookup
để lấy danh sách sinh viên kèm tên khoa.

### 17.3. Hàm showDepartmentTable()

Hiển thị danh sách khoa dưới dạng bảng.

### 17.4. Hàm showStudentTable()

Hiển thị danh sách sinh viên trước khi liên kết.

### 17.5. Hàm showJoinedTable()

Hiển thị danh sách sinh viên sau khi liên kết
với collection departments.

### 17.6. Hàm runExercise()

Thực hiện toàn bộ quy trình bài thực hành,
khởi tạo dữ liệu và báo cáo kết quả.

### 17.7. Hàm menu()

Hiển thị menu và xử lý lựa chọn của người dùng.

### 17.8. Hàm main()

Điều phối toàn bộ chương trình, xử lý lỗi
và đóng kết nối khi kết thúc.

---

## 18. Giải thích nguyên lý liên kết dữ liệu

Giả sử collection students_join có dữ liệu:

```json
{
    "masv": "SV001",
    "hoten": "Nguyễn Minh Anh",
    "makhoa": "CNTT"
}
```

Collection departments có dữ liệu:

```json
{
    "makhoa": "CNTT",
    "tenkhoa": "Công nghệ thông tin"
}
```

Toán tử $lookup so sánh trường makhoa
của sinh viên với trường makhoa của khoa.

Sau khi liên kết và xử lý bằng $project,
kết quả có dạng:

```json
{
    "masv": "SV001",
    "hoten": "Nguyễn Minh Anh",
    "makhoa": "CNTT",
    "tenkhoa": "Công nghệ thông tin",
    "linked": true
}
```

Như vậy, chương trình không chỉ hiển thị mã khoa
mà còn lấy được tên khoa tương ứng.

Đây là nội dung trọng tâm của Bài 10.

---

## 19. Kiểm thử chương trình

### 19.1. Các nội dung đã xác nhận

| STT | Nội dung kiểm thử | Kết quả |
|---:|---|---|
| 1 | Kết nối MongoDB | Thành công |
| 2 | Khởi tạo departments | 4 khoa |
| 3 | Khởi tạo students_join | 12 sinh viên |
| 4 | Thực hiện aggregate và $lookup | Thành công |
| 5 | Hiển thị tên khoa | Thành công |
| 6 | Báo cáo kết quả | 8/8 bước |
| 7 | Hiển thị menu | Thành công |
| 8 | Thống kê sinh viên | Thành công |
| 9 | Tỷ lệ liên kết | 100% |
| 10 | Hình ảnh minh chứng | 10 ảnh |

### 19.2. Các trường hợp kiểm thử mở rộng

Các trường hợp sau được đề xuất để kiểm tra
thêm các chức năng quản lý dữ liệu.

| Trường hợp | Kết quả mong đợi |
|---|---|
| Thêm sinh viên hợp lệ | Thêm thành công |
| Thêm sinh viên trùng mã | Thông báo lỗi |
| Thêm khoa trùng mã | Thông báo lỗi |
| Nhập dữ liệu rỗng | Yêu cầu nhập lại |
| Nhập mã khoa không tồn tại | Thông báo không hợp lệ |
| Tìm kiếm SV001 | Hiển thị sinh viên tương ứng |
| Lọc theo CNTT | Hiển thị sinh viên khoa CNTT |
| Cập nhật khoa hợp lệ | Cập nhật thành công |
| Xuất báo cáo | Tạo tập tin TXT |
| Chọn chức năng không hợp lệ | Thông báo và quay lại menu |

Các chức năng mở rộng cần được kiểm thử riêng
trước khi xác nhận toàn bộ đều hoạt động đúng.

---

## 20. Xử lý lỗi thường gặp

### 20.1. Lỗi Cannot find module 'mongodb'

Nguyên nhân: chưa cài đặt thư viện mongodb.

Cách khắc phục:

```powershell
npm.cmd install mongodb
```

### 20.2. Lỗi ECONNREFUSED 127.0.0.1:27017

Nguyên nhân: MongoDB Server chưa hoạt động
hoặc địa chỉ kết nối không chính xác.

Cách khắc phục:

- Kiểm tra dịch vụ MongoDB trong Windows Services.
- Khởi động MongoDB Server nếu đang dừng.
- Kiểm tra kết nối trong MongoDB Compass.
- Kiểm tra URI mongodb://127.0.0.1:27017.

### 20.3. Lỗi không tìm thấy bai10.js

Nguyên nhân: Terminal đang ở sai thư mục.

Cách khắc phục:

```powershell
cd "D:\CD-CNTT18A DoTrungNgocBao\NodeJS\Bai03\Bt10"
node bai10.js
```

### 20.4. Lỗi npm.ps1 cannot be loaded

Nguyên nhân: PowerShell hạn chế thực thi script.

Sử dụng npm.cmd thay cho npm:

```powershell
npm.cmd install mongodb
```

### 20.5. Hình ảnh không hiển thị trong README

Kiểm tra:

- Tên thư mục IMAGES.
- Tên tập tin ảnh.
- Phần mở rộng .png.
- Đường dẫn tương đối trong Markdown.
- Chữ hoa và chữ thường của tên tập tin.

### 20.6. GitHub báo tải quá 100 tập tin

Nguyên nhân có thể do tải cả node_modules.

Không đưa thư mục node_modules lên GitHub.

Thư viện sẽ được cài đặt lại bằng npm.cmd ci.

---

## 21. Quản lý mã nguồn bằng GitHub

### 21.1. Cấu trúc nộp bài

```text
NodeJS-DoTrungNgocBao/
└── Bai03/
    └── Bt10/
        ├── bai10.js
        ├── Readme.md
        ├── package.json
        ├── package-lock.json
        ├── .gitignore
        └── IMAGES/
```

### 21.2. Nội dung tập tin .gitignore

```gitignore
node_modules/
reports/
.env
```

### 21.3. Các tập tin cần nộp

- bai10.js
- Readme.md
- package.json
- package-lock.json
- .gitignore
- Thư mục IMAGES chứa đầy đủ 10 ảnh.

Không tải node_modules lên GitHub.

Khi tải tập tin bằng giao diện website GitHub,
cần loại node_modules khỏi thư mục dùng để tải lên.

### 21.4. Thông tin repository

- Chủ sở hữu: DoTrungNgocBao
- Repository: NodeJS-DoTrungNgocBao
- Thư mục bài học: Bai03
- Thư mục bài thực hành: Bt10
- Nhánh dự kiến: main

### 21.5. Nội dung commit đề xuất

```text
Hoan thanh Bai03 Bt10 - MongoDB Aggregate Lookup
```

---

## 22. Tài liệu tham khảo

- Bài 3 - Module, File System và cơ sở dữ liệu:
  https://hoctructuyencntt.github.io/NodeJS/Bai03.html

- Node.js Documentation:
  https://nodejs.org/docs/latest/api/

- MongoDB Documentation:
  https://www.mongodb.com/docs/

- MongoDB Lookup:
  https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/

- MongoDB Node.js Driver:
  https://www.mongodb.com/docs/drivers/node/current/

- GitHub Documentation:
  https://docs.github.com/

---

## 23. Tổng kết bài thực hành

| Tiêu chí | Yêu cầu | Kết quả |
|---|---|---|
| Tập tin chính | bai10.js | Đáp ứng |
| Số lượng khoa | Tối thiểu 2 | 4 |
| Số lượng sinh viên | Tối thiểu 4 | 12 |
| Trường liên kết | makhoa | Đáp ứng |
| Phương thức | aggregate() | Đáp ứng |
| Toán tử | $lookup | Đáp ứng |
| Hiển thị tên khoa | Bắt buộc | Đáp ứng |
| Lệnh chạy | node bai10.js | Thành công |
| Hình ảnh minh chứng | Có | 10 ảnh |
| Tỷ lệ liên kết | Theo dữ liệu thực tế | 100% |
| Chức năng mở rộng | Không bắt buộc | Có |

---

<div align="center">

# NEXUS V10

### STUDENT & DEPARTMENT CONTROL CENTER

**4 DEPARTMENTS | 12 STUDENTS | 100% LINKED**

**MISSION COMPLETED - 8/8**

Đỗ Trung Ngọc Bảo

CD-CNTT18A05 - CD-CNTT18A

NODEJS - BAI03 - BT10

</div>

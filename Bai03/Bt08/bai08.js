const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ==========================================
// THÔNG TIN SINH VIÊN
// ==========================================
const sinhVien = {
    hoTen: 'Đỗ Trung Ngọc Bảo',
    maSV: 'CD-CNTT18A05',
    lop: 'CD-CNTT18A'
};

// ==========================================
// ĐƯỜNG DẪN TẬP TIN
// ==========================================
const data = path.join(__dirname, 'data');
const ghiChu = path.join(data, 'ghichu.txt');
const ghiChuMoi = path.join(data, 'ghichu_moi.txt');
const fileTam = path.join(data, 'tam.txt');

// ==========================================
// MÀU SẮC GIAO DIỆN
// ==========================================
const C = {
    reset: '\x1b[0m',
    cyan: '\x1b[96m',
    green: '\x1b[92m',
    yellow: '\x1b[93m',
    red: '\x1b[91m',
    white: '\x1b[97m',
    gray: '\x1b[90m',
    bold: '\x1b[1m'
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let thanhCong = 0;

function hoi(cauHoi) {
    return new Promise(resolve => {
        rl.question(cauHoi, resolve);
    });
}

function duongKe() {
    console.log(C.cyan + '═'.repeat(60) + C.reset);
}

function tieuDe(ten) {
    console.log();
    duongKe();
    console.log(C.cyan + C.bold + '  ' + ten + C.reset);
    duongKe();
}

function thongBao(buoc, noiDung) {
    thanhCong++;
    console.log(
        `${C.green}[ OK ]${C.reset} ` +
        `${C.cyan}0${buoc}${C.reset} | ${noiDung}`
    );
}

function baoLoi(err) {
    console.log(C.red + '[ LỖI ] ' + err.message + C.reset);
}

function giaoDien() {
    console.clear();

    duongKe();

    console.log(C.cyan + C.bold);
    console.log('               FILE SYSTEM PRO');
    console.log('            PERSONAL FILE MANAGER');
    console.log('                   V2.0');
    console.log(C.reset);

    duongKe();

    console.log(C.white + '  Sinh viên : ' + sinhVien.hoTen);
    console.log('  Mã SV     : ' + sinhVien.maSV);
    console.log('  Lớp       : ' + sinhVien.lop);
    console.log('  Môn học   : Node.js');
    console.log('  Bài tập   : 08 - File System' + C.reset);

    duongKe();

    console.log(C.gray + 'Đường dẫn dự án:');
    console.log(__dirname + C.reset);
}

// ==========================================
// 01. THỰC HIỆN BÀI TẬP BẮT BUỘC
// ==========================================
async function chayBaiTap() {
    thanhCong = 0;

    tieuDe('01 / NHẬT KÝ THỰC THI');

    try {
        // Bước 1: Tạo thư mục data
        await new Promise((resolve, reject) => {
            fs.mkdir(data, { recursive: true }, err => {
                if (err) reject(err);
                else resolve();
            });
        });

        thongBao(1, 'Tạo thư mục data thành công.');

        // Bước 2: Tạo ghichu.txt
        await new Promise((resolve, reject) => {
            fs.writeFile(ghiChu, '', 'utf8', err => {
                if (err) reject(err);
                else resolve();
            });
        });

        thongBao(2, 'Tạo tập tin ghichu.txt.');

        // Bước 3: Ghi 7 dòng nội dung
        const noiDung = [
            'Họ tên: ' + sinhVien.hoTen,
            'Mã sinh viên: ' + sinhVien.maSV,
            'Lớp: ' + sinhVien.lop,
            'Môn học: Node.js',
            'Bài 8: Quản lý tập tin với File System',
            'Ứng dụng: FILE SYSTEM PRO V2.0',
            'Ngày tạo: ' + new Date().toLocaleString('vi-VN')
        ].join('\n');

        await new Promise((resolve, reject) => {
            fs.writeFile(ghiChu, noiDung, 'utf8', err => {
                if (err) reject(err);
                else resolve();
            });
        });

        thongBao(3, 'Ghi 7 dòng nội dung vào tập tin.');

        // Bước 4: Đổi tên bằng fs.rename()
        await new Promise((resolve, reject) => {
            fs.rename(ghiChu, ghiChuMoi, err => {
                if (err) reject(err);
                else resolve();
            });
        });

        thongBao(4, 'Đổi tên thành ghichu_moi.txt.');

        // Bước 5: Đọc nội dung
        const ketQua = await new Promise((resolve, reject) => {
            fs.readFile(ghiChuMoi, 'utf8', (err, content) => {
                if (err) reject(err);
                else resolve(content);
            });
        });

        thongBao(5, 'Đọc tập tin sau khi đổi tên.');

        tieuDe('NỘI DUNG GHI CHÚ');

        console.log(C.white + ketQua + C.reset);

        duongKe();

        // Bước 6: Tạo tam.txt
        await new Promise((resolve, reject) => {
            fs.writeFile(fileTam, 'Tập tin tạm thời', 'utf8', err => {
                if (err) reject(err);
                else resolve();
            });
        });

        thongBao(6, 'Tạo tập tin tam.txt.');

        // Bước 7: Xóa bằng fs.unlink()
        await new Promise((resolve, reject) => {
            fs.unlink(fileTam, err => {
                if (err) reject(err);
                else resolve();
            });
        });

        thongBao(7, 'Xóa tập tin tam.txt.');

        tieuDe('BÁO CÁO KẾT QUẢ');

        console.log(C.green + C.bold);
        console.log('           7/7 THAO TÁC THÀNH CÔNG');
        console.log('       [████████████████████] 100%');
        console.log('           HOÀN THÀNH BÀI TẬP');
        console.log(C.reset);

        console.log('Tập tin kết quả:');
        console.log(C.yellow + ghiChuMoi + C.reset);

        duongKe();

    } catch (err) {
        baoLoi(err);
        console.log(`Đã hoàn thành ${thanhCong}/7 thao tác.`);
    }
}

// ==========================================
// 02. DANH SÁCH TẬP TIN
// ==========================================
async function danhSachTapTin() {
    tieuDe('02 / DANH SÁCH TẬP TIN');

    try {
        const files = await fs.promises.readdir(data, {
            withFileTypes: true
        });

        const bang = [];

        for (const file of files) {
            const thongTin = await fs.promises.stat(
                path.join(data, file.name)
            );

            bang.push({
                'Tên tập tin': file.name,
                'Loại': file.isDirectory() ? 'Thư mục' : 'Tập tin',
                'Kích thước': thongTin.size + ' Bytes',
                'Cập nhật': thongTin.mtime.toLocaleString('vi-VN')
            });
        }

        console.table(bang);

        console.log(
            C.green + 'Tổng số mục: ' + files.length + C.reset
        );

    } catch (err) {
        baoLoi(err);
    }
}

// ==========================================
// 03. ĐỌC NỘI DUNG GHI CHÚ
// ==========================================
async function docGhiChu() {
    tieuDe('03 / ĐỌC NỘI DUNG GHI CHÚ');

    try {
        const noiDung = await fs.promises.readFile(
            ghiChuMoi, 'utf8'
        );

        const cacDong = noiDung.split(/\r?\n/);

        cacDong.forEach((dong, i) => {
            console.log(
                C.gray + String(i + 1).padStart(2, '0') +
                ' | ' + C.reset + dong
            );
        });

        duongKe();

        console.log(C.green + 'Số dòng: ' + cacDong.length);
        console.log(
            'Kích thước: ' +
            Buffer.byteLength(noiDung, 'utf8') +
            ' Bytes' + C.reset
        );

    } catch (err) {
        baoLoi(err);
    }
}

// ==========================================
// 04. THÊM NỘI DUNG GHI CHÚ
// ==========================================
async function themGhiChu() {
    tieuDe('04 / THÊM NỘI DUNG GHI CHÚ');

    if (!fs.existsSync(ghiChuMoi)) {
        console.log(C.red + 'Chưa có tập tin ghi chú.' + C.reset);
        return;
    }

    const noiDung = await hoi(
        C.yellow + 'Nhập nội dung mới: ' + C.reset
    );

    if (!noiDung.trim()) {
        console.log(C.red + 'Nội dung không được để trống.' + C.reset);
        return;
    }

    try {
        await fs.promises.appendFile(
            ghiChuMoi,
            '\n' + noiDung,
            'utf8'
        );

        console.log(C.green + 'Đã thêm ghi chú thành công!' + C.reset);

    } catch (err) {
        baoLoi(err);
    }
}

// ==========================================
// 05. KIỂM TRA HỆ THỐNG
// ==========================================
async function kiemTraHeThong() {
    tieuDe('05 / KIỂM TRA TRẠNG THÁI HỆ THỐNG');

    const bang = [
        {
            'Đối tượng': 'Thư mục data',
            'Trạng thái': fs.existsSync(data)
                ? 'Tồn tại' : 'Chưa tạo'
        },
        {
            'Đối tượng': 'ghichu.txt',
            'Trạng thái': fs.existsSync(ghiChu)
                ? 'Tồn tại' : 'Không tồn tại'
        },
        {
            'Đối tượng': 'ghichu_moi.txt',
            'Trạng thái': fs.existsSync(ghiChuMoi)
                ? 'Tồn tại' : 'Chưa tạo'
        },
        {
            'Đối tượng': 'tam.txt',
            'Trạng thái': fs.existsSync(fileTam)
                ? 'Tồn tại' : 'Không tồn tại'
        }
    ];

    console.table(bang);

    console.log('Phiên bản Node.js: ' + process.version);
    console.log('Hệ điều hành: ' + process.platform);
    console.log('Module sử dụng: fs, path, readline');
    console.log('Đường dẫn: ' + data);

    const hopLe =
        fs.existsSync(data) &&
        fs.existsSync(ghiChuMoi) &&
        !fs.existsSync(ghiChu) &&
        !fs.existsSync(fileTam);

    if (hopLe) {
        console.log(
            C.green + '\n[ OK ] Trạng thái tập tin hợp lệ.' + C.reset
        );
    } else {
        console.log(
            C.yellow + '\n[!] Cần kiểm tra lại tập tin.' + C.reset
        );
    }
}

// ==========================================
// MENU CHÍNH
// ==========================================
async function menu() {
    while (true) {
        tieuDe('DASHBOARD / MENU QUẢN LÝ');

        console.log(C.cyan + '  [01] ' + C.reset + 'Chạy lại bài thực hành');
        console.log(C.cyan + '  [02] ' + C.reset + 'Danh sách tập tin');
        console.log(C.cyan + '  [03] ' + C.reset + 'Đọc nội dung ghi chú');
        console.log(C.cyan + '  [04] ' + C.reset + 'Thêm nội dung ghi chú');
        console.log(C.cyan + '  [05] ' + C.reset + 'Kiểm tra hệ thống');
        console.log(C.red  + '  [00] ' + C.reset + 'Thoát chương trình');

        duongKe();

        const chon = (await hoi(
            C.yellow + 'Nhập lựa chọn: ' + C.reset
        )).trim();

        switch (chon) {
            case '1':
            case '01': {
                const xacNhan = await hoi(
                    'Chạy lại sẽ ghi đè ghi chú cũ. Tiếp tục (y/n)? '
                );

                if (xacNhan.trim().toLowerCase() === 'y') {
                    giaoDien();
                    await chayBaiTap();
                }
                break;
            }

            case '2':
            case '02':
                await danhSachTapTin();
                break;

            case '3':
            case '03':
                await docGhiChu();
                break;

            case '4':
            case '04':
                await themGhiChu();
                break;

            case '5':
            case '05':
                await kiemTraHeThong();
                break;

            case '0':
            case '00':
                tieuDe('THANK YOU FOR USING FILE SYSTEM PRO');

                console.log(C.green + 'Đã thoát chương trình.');
                console.log('Developed by Ngoc Bao.' + C.reset);

                rl.close();
                return;

            default:
                console.log(C.red + 'Lựa chọn không hợp lệ!' + C.reset);
        }

        await hoi('\nNhấn Enter để quay về menu...');
    }
}

// ==========================================
// KHỞI ĐỘNG CHƯƠNG TRÌNH
// ==========================================
async function main() {
    giaoDien();

    // Tự động chạy đủ 7 thao tác bắt buộc
    await chayBaiTap();

    // Sau đó mở menu chức năng mở rộng
    await menu();
}

main().catch(err => {
    baoLoi(err);
    rl.close();
    process.exitCode = 1;
});


/* =========================================================
   STUDENT CONTROL CENTER - MONGODB V9
   Bài 9: Xóa dữ liệu có điều kiện trong MongoDB
   Sinh viên: Đỗ Trung Ngọc Bảo
   Mã sinh viên: CD-CNTT18A05
   Lớp: CD-CNTT18A
   ========================================================= */

const { MongoClient } = require("mongodb");
const readline = require("node:readline/promises");
const fs = require("node:fs/promises");
const path = require("node:path");

// ==================== CẤU HÌNH ====================

const URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "qlsinhvien";
const COLLECTION_NAME = "students_test";

const client = new MongoClient(URI, {
    serverSelectionTimeoutMS: 5000
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let db;
let students;

let report = {
    inserted: 0,
    deletedOne: 0,
    deletedMany: 0,
    remaining: 0
};

// ==================== MÀU GIAO DIỆN ====================

const C = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    green: "\x1b[92m",
    cyan: "\x1b[96m",
    red: "\x1b[91m",
    yellow: "\x1b[93m",
    blue: "\x1b[94m",
    white: "\x1b[97m",
    gray: "\x1b[90m",
    purple: "\x1b[95m"
};

function line(color = C.cyan) {
    console.log(color + "═".repeat(68) + C.reset);
}

function title(text) {
    console.log();
    line();
    console.log(C.bold + C.cyan + "  " + text + C.reset);
    line();
}

function success(text) {
    console.log(C.green + "  [ OK ] " + text + C.reset);
}

function error(text) {
    console.log(C.red + "  [ ERROR ] " + text + C.reset);
}

function warning(text) {
    console.log(C.yellow + "  [ INFO ] " + text + C.reset);
}

function step(number, text) {
    console.log(
        C.green + "  [OK] " +
        C.cyan + "[" + number + "/8] " +
        C.white + text + C.reset
    );
}

async function ask(text) {
    return (await rl.question(
        C.yellow + text + C.reset
    )).trim();
}

async function confirm(text) {
    const answer = await ask(text + " (y/n): ");
    return answer.toLowerCase() === "y";
}

async function pause() {
    await ask("\n  Nhấn Enter để quay về menu...");
}

// ==================== LOGO ====================

function logo() {
    line(C.green);

    console.log(C.green + C.bold + `
     ███╗   ███╗ ██████╗ ███╗   ██╗ ██████╗  ██████╗
     ████╗ ████║██╔═══██╗████╗  ██║██╔════╝ ██╔═══██╗
     ██╔████╔██║██║   ██║██╔██╗ ██║██║  ███╗██║   ██║
     ██║╚██╔╝██║██║   ██║██║╚██╗██║██║   ██║██║   ██║
     ██║ ╚═╝ ██║╚██████╔╝██║ ╚████║╚██████╔╝╚██████╔╝
     ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝  ╚═════╝
` + C.reset);

    console.log(C.cyan + C.bold +
        "           STUDENT CONTROL CENTER - V9" + C.reset);

    console.log(C.gray +
        "       DATABASE MANAGEMENT SYSTEM | NODE.JS" + C.reset);

    line(C.green);

    console.log("  Sinh viên : Đỗ Trung Ngọc Bảo");
    console.log("  Mã SV     : CD-CNTT18A05");
    console.log("  Lớp       : CD-CNTT18A");
    console.log("  Bài tập   : Bt09 - MongoDB");

    line();
}

// ==================== DỮ LIỆU MẪU ====================

const sampleStudents = [
    { masv: "SV001", hoten: "Nguyễn Minh Anh", tuoi: 20, diem: 8.5 },
    { masv: "SV002", hoten: "Trần Quốc Huy", tuoi: 21, diem: 4.5 },
    { masv: "SV003", hoten: "Lê Hoàng Nam", tuoi: 20, diem: 7.8 },
    { masv: "SV004", hoten: "Phạm Thu Hà", tuoi: 19, diem: 3.5 },
    { masv: "SV005", hoten: "Võ Minh Khang", tuoi: 21, diem: 9.0 },
    { masv: "SV006", hoten: "Nguyễn Ngọc Linh", tuoi: 20, diem: 6.5 },
    { masv: "SV007", hoten: "Trần Gia Hân", tuoi: 19, diem: 4.0 },
    { masv: "SV008", hoten: "Lê Thanh Phong", tuoi: 21, diem: 7.0 },
    { masv: "SV009", hoten: "Phan Bảo Ngọc", tuoi: 20, diem: 8.0 },
    { masv: "SV010", hoten: "Hoàng Đức Anh", tuoi: 22, diem: 5.5 }
];

// ==================== XẾP LOẠI ====================

function xepLoai(diem) {
    if (diem >= 8) return "Giỏi";
    if (diem >= 6.5) return "Khá";
    if (diem >= 5) return "Trung bình";
    return "Yếu";
}

// ==================== HIỂN THỊ BẢNG ====================

function showTable(data) {
    if (data.length === 0) {
        warning("Không có sinh viên nào.");
        return;
    }

    console.table(data.map((sv, index) => ({
        STT: index + 1,
        "Mã SV": sv.masv,
        "Họ và tên": sv.hoten,
        "Tuổi": sv.tuoi,
        "Điểm": sv.diem.toFixed(1),
        "Xếp loại": xepLoai(sv.diem)
    })));

    success("Tổng số sinh viên: " + data.length);
}

// ==================== KẾT NỐI MONGODB ====================

async function connectDB() {
    await client.connect();

    db = client.db(DB_NAME);
    students = db.collection(COLLECTION_NAME);

    await db.command({ ping: 1 });

    success("Kết nối MongoDB thành công!");
    console.log("  Server     : " + URI);
    console.log("  Database   : " + DB_NAME);
    console.log("  Collection : " + COLLECTION_NAME);
}

// ==================== 01. BÀI THỰC HÀNH ====================

async function runExercise() {
    title("01 | MONGODB EXECUTION LOG");

    // Bước 1: Kiểm tra kết nối
    await db.command({ ping: 1 });
    step("1", "Kết nối MongoDB thành công");

    // Bước 2: Database
    step("2", "Database: " + DB_NAME);

    // Bước 3: Collection
    step("3", "Collection: " + COLLECTION_NAME);

    // Bảo vệ dữ liệu đã tồn tại
    const existing = await students.countDocuments();

    if (existing > 0) {
        warning("Collection đang có " + existing + " bản ghi.");
        warning("Chạy lại bài sẽ xóa dữ liệu trong students_test.");

        const ok = await confirm(
            "  Bạn có muốn đặt lại dữ liệu thực hành?"
        );

        if (!ok) {
            warning("Đã hủy chạy lại bài thực hành.");
            return;
        }

        await students.deleteMany({});
        success("Đã đặt lại collection students_test.");
    }

    // Bước 4: Thêm 10 sinh viên mẫu
    const inserted = await students.insertMany(
        sampleStudents.map(sv => ({ ...sv }))
    );

    step("4", "insertMany() - Thêm " +
        inserted.insertedCount + " sinh viên");

    // Bước 5: Hiển thị danh sách ban đầu
    const before = await students.find({})
        .sort({ masv: 1 })
        .toArray();

    step("5", "find() - Danh sách sinh viên ban đầu");

    title("DANH SÁCH 10 SINH VIÊN BAN ĐẦU");
    showTable(before);

    // Bước 6: Xóa một sinh viên theo mã
    title("DELETE ONE - XÓA THEO MÃ SINH VIÊN");

    const resultOne = await students.deleteOne({
        masv: "SV010"
    });

    step("6", "deleteOne() - Xóa sinh viên SV010");

    console.log(C.red +
        "  Số bản ghi đã xóa: " +
        resultOne.deletedCount + C.reset);

    // Bước 7: Xóa sinh viên có điểm dưới 5
    title("DELETE MANY - XÓA SINH VIÊN ĐIỂM DƯỚI 5");

    const resultMany = await students.deleteMany({
        diem: { $lt: 5 }
    });

    step("7", "deleteMany() - Điều kiện diem < 5");

    console.log(C.red +
        "  Số bản ghi đã xóa: " +
        resultMany.deletedCount + C.reset);

    // Bước 8: Hiển thị danh sách còn lại
    const after = await students.find({})
        .sort({ masv: 1 })
        .toArray();

    step("8", "find() - Hiển thị danh sách còn lại");

    title("DANH SÁCH SINH VIÊN SAU KHI XÓA");
    showTable(after);

    report = {
        inserted: inserted.insertedCount,
        deletedOne: resultOne.deletedCount,
        deletedMany: resultMany.deletedCount,
        remaining: after.length
    };

    // Báo cáo kết quả
    title("DELETION REPORT");

    console.log(C.cyan +
        "  Số sinh viên ban đầu   : " +
        report.inserted + C.reset);

    console.log(C.red +
        "  Xóa bằng deleteOne()   : " +
        report.deletedOne + C.reset);

    console.log(C.red +
        "  Xóa bằng deleteMany()  : " +
        report.deletedMany + C.reset);

    console.log(C.red +
        "  Tổng số đã xóa         : " +
        (report.deletedOne + report.deletedMany) + C.reset);

    console.log(C.green +
        "  Số sinh viên còn lại   : " +
        report.remaining + C.reset);

    line(C.green);

    console.log(C.green + C.bold +
        "  ██████████████████████████████ 100%" + C.reset);

    console.log(C.green +
        "  MISSION COMPLETED - 8/8 BƯỚC THÀNH CÔNG" +
        C.reset);

    line(C.green);
}

// ==================== 02. DANH SÁCH ====================

async function listStudents() {
    title("02 | STUDENT RECORDS");

    const data = await students.find({})
        .sort({ masv: 1 })
        .toArray();

    showTable(data);
}

// ==================== NHẬP THÔNG TIN ====================

async function inputStudent() {
    const hoten = await ask("  Họ và tên: ");
    const ageInput = await ask("  Tuổi: ");
    const scoreInput = await ask("  Điểm: ");

    const tuoi = Number(ageInput);
    const diem = Number(scoreInput);

    if (
        !hoten ||
        !ageInput ||
        !scoreInput ||
        !Number.isInteger(tuoi) ||
        tuoi <= 0 ||
        !Number.isFinite(diem) ||
        diem < 0 ||
        diem > 10
    ) {
        throw new Error("Thông tin không hợp lệ.");
    }

    return { hoten, tuoi, diem };
}

// ==================== 03. THÊM SINH VIÊN ====================

async function addStudent() {
    title("03 | ADD NEW STUDENT");

    const masv = (await ask("  Mã sinh viên: ")).toUpperCase();

    if (!masv) {
        error("Mã sinh viên không được để trống.");
        return;
    }

    const existing = await students.findOne({ masv });

    if (existing) {
        error("Mã sinh viên đã tồn tại.");
        return;
    }

    const info = await inputStudent();

    await students.insertOne({
        masv,
        ...info
    });

    success("Thêm sinh viên thành công!");
}

// ==================== 04. TÌM KIẾM ====================

async function searchStudent() {
    title("04 | SEARCH STUDENT");

    const keyword = await ask("  Nhập mã hoặc họ tên: ");

    if (!keyword) {
        warning("Vui lòng nhập từ khóa.");
        return;
    }

    // Chuyển ký tự đặc biệt thành văn bản thông thường
    const safeKeyword = keyword.replace(
        /[.*+?^${}()|[\]\\]/g, "\\$&"
    );

    const data = await students.find({
        $or: [
            { masv: { $regex: safeKeyword, $options: "i" } },
            { hoten: { $regex: safeKeyword, $options: "i" } }
        ]
    }).toArray();

    showTable(data);
}

// ==================== 05. CẬP NHẬT ====================

async function updateStudent() {
    title("05 | UPDATE STUDENT");

    const masv = (await ask("  Nhập mã sinh viên: ")).toUpperCase();

    const sv = await students.findOne({ masv });

    if (!sv) {
        error("Không tìm thấy sinh viên.");
        return;
    }

    showTable([sv]);

    console.log("\n  Nhập thông tin mới:");

    const info = await inputStudent();

    const result = await students.updateOne(
        { masv },
        { $set: info }
    );

    success("Số bản ghi được cập nhật: " +
        result.modifiedCount);
}

// ==================== 06. DELETE ONE ====================

async function deleteStudent() {
    title("06 | DELETE ONE STUDENT");

    const masv = (await ask("  Nhập mã sinh viên cần xóa: "))
        .toUpperCase();

    const sv = await students.findOne({ masv });

    if (!sv) {
        error("Không tìm thấy sinh viên.");
        return;
    }

    showTable([sv]);

    const ok = await confirm("  Xác nhận xóa sinh viên này?");

    if (!ok) {
        warning("Đã hủy thao tác.");
        return;
    }

    const result = await students.deleteOne({ masv });

    success("deleteOne() thực hiện thành công.");

    console.log(C.red +
        "  deletedCount: " + result.deletedCount + C.reset);

    await listStudents();
}

// ==================== 07. DELETE MANY ====================

async function deleteLowScore() {
    title("07 | DELETE LOW SCORE STUDENTS");

    const data = await students.find({
        diem: { $lt: 5 }
    }).toArray();

    if (data.length === 0) {
        warning("Không có sinh viên nào có điểm dưới 5.");
        return;
    }

    showTable(data);

    const ok = await confirm(
        "  Xác nhận xóa " + data.length + " sinh viên?"
    );

    if (!ok) {
        warning("Đã hủy thao tác.");
        return;
    }

    const result = await students.deleteMany({
        diem: { $lt: 5 }
    });

    success("deleteMany() thực hiện thành công.");

    console.log(C.red +
        "  deletedCount: " + result.deletedCount + C.reset);

    await listStudents();
}

// ==================== 08. THỐNG KÊ ====================

async function statistics() {
    title("08 | STUDENT ANALYTICS");

    const result = await students.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                average: { $avg: "$diem" },
                highest: { $max: "$diem" },
                lowest: { $min: "$diem" }
            }
        }
    ]).toArray();

    if (result.length === 0) {
        warning("Chưa có dữ liệu thống kê.");
        return;
    }

    const stats = result[0];
    const data = await students.find({}).toArray();

    const groups = {
        "Giỏi": 0,
        "Khá": 0,
        "Trung bình": 0,
        "Yếu": 0
    };

    data.forEach(sv => groups[xepLoai(sv.diem)]++);

    console.log(C.cyan +
        "  Tổng sinh viên   : " + stats.total + C.reset);

    console.log(C.green +
        "  Điểm trung bình  : " +
        stats.average.toFixed(2) + C.reset);

    console.log(C.green +
        "  Điểm cao nhất    : " +
        stats.highest.toFixed(2) + C.reset);

    console.log(C.yellow +
        "  Điểm thấp nhất   : " +
        stats.lowest.toFixed(2) + C.reset);

    line();

    console.log("  BIỂU ĐỒ KẾT QUẢ HỌC TẬP\n");

    const colors = [
        C.green, C.cyan, C.yellow, C.red
    ];

    Object.entries(groups).forEach(([name, count], i) => {
        const percent = count / stats.total * 100;
        const length = Math.round(percent / 5);

        const bar = "█".repeat(length);
        const empty = "░".repeat(20 - length);

        console.log(
            colors[i] +
            "  " + name.padEnd(12) +
            bar + empty +
            "  " + count + " SV (" +
            percent.toFixed(1) + "%)" +
            C.reset
        );
    });

    const passed = data.filter(sv => sv.diem >= 5).length;

    line();

    success("Tỷ lệ đạt: " +
        (passed / stats.total * 100).toFixed(1) + "%");
}

// ==================== 09. XUẤT BÁO CÁO ====================

async function exportReport() {
    title("09 | EXPORT REPORT");

    const data = await students.find({})
        .sort({ masv: 1 })
        .toArray();

    const folder = path.join(__dirname, "reports");

    await fs.mkdir(folder, { recursive: true });

    const file = path.join(folder, "baocao.txt");

    const content = [
        "========================================",
        "STUDENT CONTROL CENTER - MONGODB V9",
        "========================================",
        "Sinh viên: Đỗ Trung Ngọc Bảo",
        "Mã SV: CD-CNTT18A05",
        "Lớp: CD-CNTT18A",
        "Database: " + DB_NAME,
        "Collection: " + COLLECTION_NAME,
        "Ngày xuất: " + new Date().toLocaleString("vi-VN"),
        "",
        "DANH SÁCH SINH VIÊN",
        ...data.map((sv, i) =>
            `${i + 1}. ${sv.masv} | ${sv.hoten} | ` +
            `Tuổi: ${sv.tuoi} | Điểm: ${sv.diem} | ` +
            xepLoai(sv.diem)
        ),
        "",
        "Tổng số sinh viên hiện tại: " + data.length,
        "========================================"
    ].join("\n");

    await fs.writeFile(file, content, "utf8");

    success("Xuất báo cáo thành công!");
    console.log("  Đường dẫn: " + file);
}

// ==================== 10. KIỂM TRA KẾT NỐI ====================

async function checkConnection() {
    title("10 | DATABASE SYSTEM STATUS");

    await db.command({ ping: 1 });

    success("MongoDB: ONLINE");

    console.log("  Server     : " + URI);
    console.log("  Database   : " + DB_NAME);
    console.log("  Collection : " + COLLECTION_NAME);
    console.log("  Node.js    : " + process.version);
    console.log("  Hệ điều hành: " + process.platform);
    console.log("  Dự án      : " + __dirname);
    console.log("  Số bản ghi : " +
        await students.countDocuments());
}

// ==================== MENU CHÍNH ====================

async function menu() {
    while (true) {
        console.clear();

        logo();

        const total = await students.countDocuments();

        console.log(C.green +
            "  ● DATABASE ONLINE" + C.reset);

        console.log("  Database   : " + DB_NAME);
        console.log("  Collection : " + COLLECTION_NAME);

        line();

        console.log(C.cyan +
            "  TỔNG SỐ SINH VIÊN HIỆN TẠI: " +
            total + C.reset);

        line();

        console.log(C.bold + C.purple +
            "                    CONTROL PANEL" + C.reset);

        line();

        const options = [
            ["01", "Chạy bài thực hành MongoDB"],
            ["02", "Danh sách sinh viên"],
            ["03", "Thêm sinh viên mới"],
            ["04", "Tìm kiếm sinh viên"],
            ["05", "Cập nhật sinh viên"],
            ["06", "Xóa sinh viên theo mã"],
            ["07", "Xóa sinh viên có điểm dưới 5"],
            ["08", "Thống kê kết quả học tập"],
            ["09", "Xuất báo cáo ra tập tin"],
            ["10", "Kiểm tra kết nối MongoDB"],
            ["00", "Thoát chương trình"]
        ];

        options.forEach(([id, text]) => {
            const color = ["06", "07", "00"].includes(id)
                ? C.red : C.green;

            console.log(
                color + "  [" + id + "] " +
                C.white + text + C.reset
            );
        });

        line();

        const choice = await ask(
            "  COMMAND CENTER > "
        );

        if (choice === "00" || choice === "0") {
            success("Đã thoát chương trình.");
            break;
        }

        try {
            switch (choice.padStart(2, "0")) {
                case "01":
                    await runExercise();
                    break;

                case "02":
                    await listStudents();
                    break;

                case "03":
                    await addStudent();
                    break;

                case "04":
                    await searchStudent();
                    break;

                case "05":
                    await updateStudent();
                    break;

                case "06":
                    await deleteStudent();
                    break;

                case "07":
                    await deleteLowScore();
                    break;

                case "08":
                    await statistics();
                    break;

                case "09":
                    await exportReport();
                    break;

                case "10":
                    await checkConnection();
                    break;

                default:
                    error("Lựa chọn không hợp lệ.");
            }
        } catch (err) {
            error(err.message);
        }

        await pause();
    }
}

// ==================== KHỞI ĐỘNG ====================

async function main() {
    console.clear();
    logo();

    try {
        await connectDB();

        // Tự động thực hiện bài tập khi khởi động
        await runExercise();

        await pause();

        // Mở menu quản lý sinh viên
        await menu();

    } catch (err) {
        error(err.message);
        warning("Hãy kiểm tra MongoDB Server.");

    } finally {
        await client.close();
        rl.close();
    }
}

main();

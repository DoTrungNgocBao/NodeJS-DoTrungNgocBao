
// ============================================================
// NEXUS V10 - MONGODB RELATION SYSTEM
// BAI 10: LIEN KET HAI COLLECTION TRONG MONGODB
// Sinh vien: Do Trung Ngoc Bao
// Ma SV: CD-CNTT18A05
// Lop: CD-CNTT18A
// ============================================================

const { MongoClient } = require("mongodb");
const readline = require("node:readline/promises");
const fs = require("node:fs/promises");
const path = require("node:path");

// ============================================================
// 1. CAU HINH HE THONG
// ============================================================

const URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "qlsinhvien";

const client = new MongoClient(URI, {
    serverSelectionTimeoutMS: 5000
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let db;
let departments;
let students;

// Mau sac Terminal
const C = {
    reset: "\x1b[0m",
    cyan: "\x1b[96m",
    green: "\x1b[92m",
    yellow: "\x1b[93m",
    red: "\x1b[91m",
    purple: "\x1b[95m",
    blue: "\x1b[94m",
    white: "\x1b[97m",
    gray: "\x1b[90m",
    bold: "\x1b[1m"
};

function color(text, c) {
    return c + text + C.reset;
}

function line() {
    console.log(color("═".repeat(76), C.cyan));
}

function section(title) {
    console.log();
    line();
    console.log(color("  " + title, C.bold + C.cyan));
    line();
}

function success(message) {
    console.log(color("[SUCCESS] ", C.green) + message);
}

function warning(message) {
    console.log(color("[WARNING] ", C.yellow) + message);
}

function error(message) {
    console.log(color("[ERROR] ", C.red) + message);
}

function step(number, message) {
    console.log(
        color(`[${number}/8] `, C.cyan) +
        color("[OK] ", C.green) +
        message
    );
}

async function pause() {
    await rl.question(
        color("\nNhấn Enter để quay về menu...", C.yellow)
    );
}

function logo() {
    console.log(color(`
    ███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗
    ████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝
    ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗
    ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║
    ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║
    ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
    `, C.cyan));

    line();

    console.log(color(
        "       NEXUS V10 - MONGODB RELATION SYSTEM",
        C.bold + C.white
    ));

    console.log(color(
        "       STUDENT & DEPARTMENT CONTROL CENTER",
        C.purple
    ));

    line();

    console.log("  Sinh viên : Đỗ Trung Ngọc Bảo");
    console.log("  Mã SV     : CD-CNTT18A05");
    console.log("  Lớp       : CD-CNTT18A");
    console.log("  Bài tập   : Bai03 - Bt10");

    line();
}

// ============================================================
// 2. DU LIEU MAU - COLLECTION DEPARTMENTS
// ============================================================

const sampleDepartments = [
    {
        makhoa: "CNTT",
        tenkhoa: "Công nghệ thông tin"
    },
    {
        makhoa: "KT",
        tenkhoa: "Kinh tế"
    },
    {
        makhoa: "DL",
        tenkhoa: "Du lịch"
    },
    {
        makhoa: "DT",
        tenkhoa: "Điện - Điện tử"
    }
];

// ============================================================
// 3. DU LIEU MAU - COLLECTION STUDENTS_JOIN
// ============================================================

const sampleStudents = [
    { masv: "SV001", hoten: "Nguyễn Minh Anh", makhoa: "CNTT" },
    { masv: "SV002", hoten: "Trần Quốc Huy", makhoa: "KT" },
    { masv: "SV003", hoten: "Lê Hoàng Nam", makhoa: "DL" },
    { masv: "SV004", hoten: "Phạm Thu Hà", makhoa: "DT" },
    { masv: "SV005", hoten: "Võ Minh Khang", makhoa: "CNTT" },
    { masv: "SV006", hoten: "Nguyễn Ngọc Linh", makhoa: "KT" },
    { masv: "SV007", hoten: "Trần Gia Hân", makhoa: "DL" },
    { masv: "SV008", hoten: "Lê Thanh Phong", makhoa: "DT" },
    { masv: "SV009", hoten: "Phan Bảo Ngọc", makhoa: "CNTT" },
    { masv: "SV010", hoten: "Hoàng Đức Anh", makhoa: "KT" },
    { masv: "SV011", hoten: "Bùi Thanh Tâm", makhoa: "DL" },
    { masv: "SV012", hoten: "Đặng Quốc Bảo", makhoa: "DT" }
];

// ============================================================
// 4. KET NOI MONGODB
// ============================================================

async function connectDB() {
    await client.connect();

    db = client.db(DB_NAME);

    departments = db.collection("departments");
    students = db.collection("students_join");

    await db.command({ ping: 1 });

    success("Kết nối MongoDB thành công!");
    console.log("Database: " + DB_NAME);
    console.log("Collection 1: departments");
    console.log("Collection 2: students_join");
}

// ============================================================
// 5. LIEN KET HAI COLLECTION BANG AGGREGATE VA $LOOKUP
// ============================================================

async function getJoinedStudents(filter = {}) {
    return await students.aggregate([
        {
            $match: filter
        },
        {
            $lookup: {
                from: "departments",
                localField: "makhoa",
                foreignField: "makhoa",
                as: "thongtinkhoa"
            }
        },
        {
            $unwind: {
                path: "$thongtinkhoa",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 0,
                masv: 1,
                hoten: 1,
                makhoa: 1,
                tenkhoa: {
                    $ifNull: [
                        "$thongtinkhoa.tenkhoa",
                        "Chưa có khoa tương ứng"
                    ]
                },
                linked: {
                    $ne: [
                        {
                            $ifNull: [
                                "$thongtinkhoa.makhoa",
                                null
                            ]
                        },
                        null
                    ]
                }
            }
        },
        {
            $sort: { masv: 1 }
        }
    ]).toArray();
}

// ============================================================
// 6. CAC HAM HIEN THI BANG
// ============================================================

function showDepartmentTable(data) {
    console.table(data.map((khoa, index) => ({
        "STT": index + 1,
        "Mã khoa": khoa.makhoa,
        "Tên khoa": khoa.tenkhoa
    })));

    success("Tổng số khoa: " + data.length);
}

function showStudentTable(data) {
    console.table(data.map((sv, index) => ({
        "STT": index + 1,
        "Mã SV": sv.masv,
        "Họ và tên": sv.hoten,
        "Mã khoa": sv.makhoa
    })));

    success("Tổng số sinh viên: " + data.length);
}

function showJoinedTable(data) {
    if (data.length === 0) {
        warning("Không tìm thấy sinh viên.");
        return;
    }

    console.table(data.map((sv, index) => ({
        "STT": index + 1,
        "Mã SV": sv.masv,
        "Họ và tên": sv.hoten,
        "Mã khoa": sv.makhoa,
        "Tên khoa": sv.tenkhoa
    })));

    success("Tổng số kết quả: " + data.length);
}

// ============================================================
// 7. BAI THUC HANH CHINH
// ============================================================

async function runExercise() {
    console.clear();
    logo();

    section("MISSION 10 - LIÊN KẾT HAI COLLECTION");

    await db.command({ ping: 1 });

    step(1, "Kiểm tra kết nối MongoDB.");

    step(2, "Sử dụng database qlsinhvien.");

    // Them du lieu mau neu chua ton tai.
    // Khong xoa du lieu cu cua nguoi dung.
    // $setOnInsert giu nguyen ban ghi da co.

    for (const khoa of sampleDepartments) {
        await departments.updateOne(
            { makhoa: khoa.makhoa },
            { $setOnInsert: khoa },
            { upsert: true }
        );
    }

    step(3, "Khởi tạo collection departments.");

    const departmentList = await departments
        .find({})
        .sort({ makhoa: 1 })
        .toArray();

    section("COLLECTION 01 - DEPARTMENTS");
    showDepartmentTable(departmentList);

    for (const sv of sampleStudents) {
        await students.updateOne(
            { masv: sv.masv },
            { $setOnInsert: sv },
            { upsert: true }
        );
    }

    step(4, "Khởi tạo collection students_join.");

    const studentList = await students
        .find({})
        .sort({ masv: 1 })
        .toArray();

    section("COLLECTION 02 - STUDENTS_JOIN");
    showStudentTable(studentList);

    section("RELATION ENGINE - AGGREGATE & $LOOKUP");

    console.log(color(`
    ┌──────────────────┐     ┌──────────────────┐
    │  students_join   │     │   departments    │
    ├──────────────────┤     ├──────────────────┤
    │ masv             │     │ tenkhoa          │
    │ hoten            │     │                  │
    │ makhoa           ├─────┤ makhoa           │
    └────────┬─────────┘     └────────┬─────────┘
             │                        │
             └──────────┬─────────────┘
                        │
                   $lookup
                        │
               STUDENT JOIN RESULTS
    `, C.cyan));

    step(5, "Liên kết thông qua trường makhoa.");

    const joined = await getJoinedStudents();

    step(6, "Thực hiện aggregate() kết hợp $lookup.");

    step(7, "Lấy tên khoa bằng $unwind và $project.");

    section("STUDENT JOIN RESULTS - KẾT QUẢ LIÊN KẾT");

    showJoinedTable(joined);

    step(8, "Hiển thị sinh viên kèm tên khoa.");

    const linked = joined.filter(sv => sv.linked).length;
    const unlinked = joined.length - linked;

    const percent = joined.length
        ? Math.round(linked / joined.length * 100)
        : 0;

    section("RELATION REPORT - BÁO CÁO KẾT QUẢ");

    console.log("  Tổng số khoa          : " + departmentList.length);
    console.log("  Tổng số sinh viên     : " + studentList.length);
    console.log("  Số dòng kết quả       : " + joined.length);
    console.log(color(
        "  Kết quả có tên khoa   : " + linked,
        C.green
    ));
    console.log(color(
        "  Kết quả chưa có khoa  : " + unlinked,
        unlinked ? C.red : C.green
    ));

    const filled = Math.round(percent / 5);

    console.log(
        "\n  " +
        color("█".repeat(filled), C.green) +
        color("░".repeat(20 - filled), C.gray) +
        ` ${percent}%`
    );

    if (
        joined.length === studentList.length &&
        linked === studentList.length
    ) {
        success("Tất cả sinh viên đều có tên khoa tương ứng.");
        console.log(color(
            "\n  MISSION COMPLETED - 8/8 BƯỚC THÀNH CÔNG",
            C.bold + C.green
        ));
    } else {
        warning("Kiểm tra mã khoa hoặc dữ liệu khoa bị trùng.");
    }

    line();
}

// ============================================================
// 8. DANH SACH SINH VIEN KEM TEN KHOA
// ============================================================

async function listStudents() {
    section("STUDENT DIRECTORY - DANH SÁCH SINH VIÊN");

    const data = await getJoinedStudents();

    showJoinedTable(data);
}

// ============================================================
// 9. DANH SACH CAC KHOA
// ============================================================

async function listDepartments() {
    section("DEPARTMENT DIRECTORY - DANH SÁCH KHOA");

    const data = await departments
        .find({})
        .sort({ makhoa: 1 })
        .toArray();

    showDepartmentTable(data);
}

// ============================================================
// 10. THEM SINH VIEN
// ============================================================

async function addStudent() {
    section("ADD STUDENT - THÊM SINH VIÊN");

    const masv = (await rl.question(
        "Nhập mã sinh viên: "
    )).trim().toUpperCase();

    const hoten = (await rl.question(
        "Nhập họ và tên: "
    )).trim();

    if (!masv || !hoten) {
        error("Mã sinh viên và họ tên không được để trống.");
        return;
    }

    const exists = await students.findOne({ masv });

    if (exists) {
        error("Mã sinh viên đã tồn tại.");
        return;
    }

    await listDepartments();

    const makhoa = (await rl.question(
        "Nhập mã khoa: "
    )).trim().toUpperCase();

    const khoa = await departments.findOne({ makhoa });

    if (!khoa) {
        error("Mã khoa không tồn tại.");
        return;
    }

    await students.insertOne({
        masv,
        hoten,
        makhoa
    });

    success("Thêm sinh viên thành công!");

    showJoinedTable(await getJoinedStudents({ masv }));
}

// ============================================================
// 11. THEM KHOA
// ============================================================

async function addDepartment() {
    section("ADD DEPARTMENT - THÊM KHOA MỚI");

    const makhoa = (await rl.question(
        "Nhập mã khoa: "
    )).trim().toUpperCase();

    const tenkhoa = (await rl.question(
        "Nhập tên khoa: "
    )).trim();

    if (!makhoa || !tenkhoa) {
        error("Không được để trống mã khoa hoặc tên khoa.");
        return;
    }

    const exists = await departments.findOne({ makhoa });

    if (exists) {
        error("Mã khoa đã tồn tại.");
        return;
    }

    await departments.insertOne({
        makhoa,
        tenkhoa
    });

    success("Thêm khoa mới thành công!");

    await listDepartments();
}

// ============================================================
// 12. TIM KIEM SINH VIEN
// ============================================================

async function searchStudent() {
    section("SEARCH ENGINE - TÌM KIẾM SINH VIÊN");

    const keyword = (await rl.question(
        "Nhập mã hoặc tên sinh viên: "
    )).trim();

    if (!keyword) {
        warning("Vui lòng nhập từ khóa.");
        return;
    }

    const escaped = keyword.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

    const regex = new RegExp(escaped, "i");

    const result = await getJoinedStudents({
        $or: [
            { masv: regex },
            { hoten: regex }
        ]
    });

    showJoinedTable(result);
}

// ============================================================
// 13. LOC SINH VIEN THEO KHOA
// ============================================================

async function filterByDepartment() {
    section("DEPARTMENT FILTER - SINH VIÊN THEO KHOA");

    await listDepartments();

    const makhoa = (await rl.question(
        "Nhập mã khoa cần xem: "
    )).trim().toUpperCase();

    const khoa = await departments.findOne({ makhoa });

    if (!khoa) {
        error("Không tìm thấy khoa.");
        return;
    }

    console.log(color(
        "\nKhoa: " + khoa.tenkhoa,
        C.purple
    ));

    const result = await getJoinedStudents({ makhoa });

    showJoinedTable(result);
}

// ============================================================
// 14. CAP NHAT KHOA CUA SINH VIEN
// ============================================================

async function updateStudentDepartment() {
    section("UPDATE RELATION - CẬP NHẬT KHOA");

    const masv = (await rl.question(
        "Nhập mã sinh viên: "
    )).trim().toUpperCase();

    const sv = await students.findOne({ masv });

    if (!sv) {
        error("Không tìm thấy sinh viên.");
        return;
    }

    showJoinedTable(await getJoinedStudents({ masv }));

    await listDepartments();

    const makhoa = (await rl.question(
        "Nhập mã khoa mới: "
    )).trim().toUpperCase();

    const khoa = await departments.findOne({ makhoa });

    if (!khoa) {
        error("Mã khoa không tồn tại.");
        return;
    }

    const confirm = (await rl.question(
        "Xác nhận chuyển khoa? (y/n): "
    )).trim().toLowerCase();

    if (confirm !== "y") {
        warning("Đã hủy cập nhật.");
        return;
    }

    await students.updateOne(
        { masv },
        { $set: { makhoa } }
    );

    success("Đã cập nhật khoa của sinh viên.");

    showJoinedTable(await getJoinedStudents({ masv }));
}

// ============================================================
// 15. THONG KE SINH VIEN THEO KHOA
// ============================================================

async function statistics() {
    section("ANALYTICS CENTER - THỐNG KÊ THEO KHOA");

    const total = await students.countDocuments();

    const result = await departments.aggregate([
        {
            $lookup: {
                from: "students_join",
                localField: "makhoa",
                foreignField: "makhoa",
                as: "danhsach"
            }
        },
        {
            $project: {
                _id: 0,
                makhoa: 1,
                tenkhoa: 1,
                soluong: {
                    $size: "$danhsach"
                }
            }
        },
        {
            $sort: { makhoa: 1 }
        }
    ]).toArray();

    console.log("Tổng số sinh viên: " + total);
    console.log("Tổng số khoa: " + result.length);

    console.table(result.map(khoa => ({
        "Mã khoa": khoa.makhoa,
        "Tên khoa": khoa.tenkhoa,
        "Số sinh viên": khoa.soluong,
        "Tỷ lệ": total
            ? (khoa.soluong / total * 100).toFixed(1) + "%"
            : "0%"
    })));

    section("DEPARTMENT DISTRIBUTION");

    const colors = [
        C.cyan,
        C.purple,
        C.green,
        C.yellow
    ];

    result.forEach((khoa, index) => {
        const percent = total
            ? khoa.soluong / total * 100
            : 0;

        const bars = Math.min(
            30,
            Math.round(percent / 100 * 30)
        );

        console.log("\n" + khoa.tenkhoa);

        console.log(
            color(
                "█".repeat(bars),
                colors[index % colors.length]
            ) +
            color("░".repeat(30 - bars), C.gray) +
            ` ${khoa.soluong} SV | ${percent.toFixed(1)}%`
        );
    });

    line();
}

// ============================================================
// 16. XUAT BAO CAO
// ============================================================

async function exportReport() {
    section("EXPORT CENTER - XUẤT BÁO CÁO");

    const data = await getJoinedStudents();

    const folder = path.join(__dirname, "reports");

    await fs.mkdir(folder, { recursive: true });

    const file = path.join(folder, "baocao_bai10.txt");

    const content = [
        "NEXUS V10 - MONGODB RELATION SYSTEM",
        "BÁO CÁO LIÊN KẾT SINH VIÊN VÀ KHOA",
        "======================================",
        "Sinh viên: Đỗ Trung Ngọc Bảo",
        "Mã SV: CD-CNTT18A05",
        "Lớp: CD-CNTT18A",
        "Database: qlsinhvien",
        "Collections: departments, students_join",
        "Ngày xuất: " + new Date().toLocaleString("vi-VN"),
        "======================================",
        ...data.map((sv, index) =>
            `${index + 1}. ${sv.masv} | ${sv.hoten} | ` +
            `${sv.makhoa} | ${sv.tenkhoa}`
        ),
        "======================================",
        "Tổng số kết quả: " + data.length,
        "Phương thức liên kết: aggregate() + $lookup"
    ].join("\n");

    await fs.writeFile(file, content, "utf8");

    success("Xuất báo cáo thành công!");
    console.log("Đường dẫn: " + file);
}

// ============================================================
// 17. KIEM TRA HE THONG
// ============================================================

async function systemInfo() {
    section("SYSTEM DIAGNOSTICS - KIỂM TRA HỆ THỐNG");

    await db.command({ ping: 1 });

    success("DATABASE ONLINE");

    console.table([
        { "Thông tin": "Node.js", "Giá trị": process.version },
        { "Thông tin": "Hệ điều hành", "Giá trị": process.platform },
        { "Thông tin": "MongoDB URI", "Giá trị": URI },
        { "Thông tin": "Database", "Giá trị": DB_NAME },
        { "Thông tin": "Collection 1", "Giá trị": "departments" },
        { "Thông tin": "Collection 2", "Giá trị": "students_join" },
        {
            "Thông tin": "Tổng số khoa",
            "Giá trị": await departments.countDocuments()
        },
        {
            "Thông tin": "Tổng sinh viên",
            "Giá trị": await students.countDocuments()
        },
        { "Thông tin": "Đường dẫn", "Giá trị": __dirname }
    ]);
}

// ============================================================
// 18. GIAO DIEN MENU CHINH
// ============================================================

async function menu() {
    while (true) {
        console.clear();

        logo();

        const totalDepartments = await departments.countDocuments();
        const totalStudents = await students.countDocuments();

        const joined = await getJoinedStudents();

        const linked = new Set(
            joined.filter(sv => sv.linked).map(sv => sv.masv)
        ).size;

        console.log(color("  ● DATABASE ONLINE", C.green));

        console.log("  Database: " + DB_NAME);

        line();

        console.log(color(
            `  KHOA: ${totalDepartments}  |  ` +
            `SINH VIÊN: ${totalStudents}  |  ` +
            `LIÊN KẾT: ${linked}/${totalStudents}`,
            C.bold + C.green
        ));

        section("COMMAND CENTER");

        const options = [
            "Chạy bài thực hành $lookup",
            "Danh sách sinh viên kèm tên khoa",
            "Danh sách các khoa",
            "Thêm sinh viên mới",
            "Thêm khoa mới",
            "Tìm kiếm sinh viên",
            "Xem sinh viên theo khoa",
            "Cập nhật khoa của sinh viên",
            "Thống kê số sinh viên theo khoa",
            "Xuất báo cáo liên kết",
            "Kiểm tra hệ thống"
        ];

        options.forEach((item, index) => {
            const number = String(index + 1).padStart(2, "0");

            console.log(
                color(`  [${number}] `, C.cyan) + item
            );
        });

        console.log(color(
            "  [00] Thoát chương trình",
            C.red
        ));

        line();

        const choice = (await rl.question(
            color("NEXUS COMMAND > ", C.yellow)
        )).trim();

        if (choice === "00" || choice === "0") {
            section("SYSTEM SHUTDOWN");
            success("Đã kết thúc chương trình.");
            console.log("NEXUS V10 - GOODBYE!");
            return;
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
                    await listDepartments();
                    break;

                case "04":
                    await addStudent();
                    break;

                case "05":
                    await addDepartment();
                    break;

                case "06":
                    await searchStudent();
                    break;

                case "07":
                    await filterByDepartment();
                    break;

                case "08":
                    await updateStudentDepartment();
                    break;

                case "09":
                    await statistics();
                    break;

                case "10":
                    await exportReport();
                    break;

                case "11":
                    await systemInfo();
                    break;

                default:
                    warning("Lựa chọn không hợp lệ.");
            }
        } catch (err) {
            error(err.message);
        }

        await pause();
    }
}

// ============================================================
// 19. HAM MAIN - KHOI DONG CHUONG TRINH
// ============================================================

async function main() {
    try {
        console.clear();

        logo();

        await connectDB();

        // Tu dong chay bai thuc hanh khi khoi dong
        await runExercise();

        await pause();

        // Mo menu quan ly
        await menu();

    } catch (err) {
        error(err.message);

        console.log(
            "Hãy kiểm tra dịch vụ MongoDB và thư viện mongodb."
        );

        process.exitCode = 1;

    } finally {
        await client.close();
        rl.close();
    }
}

main();

// ============================================================
// END OF NEXUS V10
// ============================================================

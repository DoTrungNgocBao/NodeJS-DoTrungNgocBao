
// ======================================================
// NEXUS X - SMART CALCULATOR STUDIO
// BAI 04 - EXPRESS FRAMEWORK
// CONTROLLER: calculatorController.js
// ======================================================

const model = require("../models/calculatorModel");
const os = require("os");

// 1. Hien thi trang Dashboard
function index(req, res) {
    res.render("index", {
        title: "Command Center",
        activePage: "home",
        stats: model.getStatistics()
    });
}

// 2. Hien thi trang may tinh
function calculator(req, res) {
    res.render("calculator", {
        title: "Smart Calculator",
        activePage: "calculator",
        operations: model.operations,
        firstNumber: "",
        secondNumber: "",
        operation: "add",
        result: null,
        error: null,
        stats: model.getStatistics()
    });
}

// 3. Xu ly form tinh toan
function calculate(req, res, next) {
    const {
        firstNumber,
        secondNumber,
        operation
    } = req.body || {};

    try {
        const record = model.calculate(
            firstNumber,
            secondNumber,
            operation
        );

        res.render("calculator", {
            title: "Smart Calculator",
            activePage: "calculator",
            operations: model.operations,
            firstNumber,
            secondNumber,
            operation,
            result: record,
            error: null,
            stats: model.getStatistics()
        });

    } catch (error) {
        if (error.status === 400) {
            return res.status(400).render("calculator", {
                title: "Smart Calculator",
                activePage: "calculator",
                operations: model.operations,
                firstNumber,
                secondNumber,
                operation,
                result: null,
                error: error.message,
                stats: model.getStatistics()
            });
        }

        next(error);
    }
}

// 4. API tinh toan cho ban phim ao
function calculateAPI(req, res, next) {
    try {
        const {
            firstNumber,
            secondNumber,
            operation
        } = req.body || {};

        const record = model.calculate(
            firstNumber,
            secondNumber,
            operation
        );

        res.json({
            success: true,
            message: "Tính toán thành công",
            data: record,
            stats: model.getStatistics()
        });

    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({
                success: false,
                message: error.message,
                stats: model.getStatistics()
            });
        }

        next(error);
    }
}

// 5. Hien thi va tim kiem lich su
function history(req, res) {
    const keyword = String(req.query.keyword || "");
    const records = model.searchHistory(keyword);

    res.render("history", {
        title: "Calculation History",
        activePage: "history",
        history: records,
        keyword,
        stats: model.getStatistics()
    });
}

// 6. Xoa mot phep tinh
function deleteHistory(req, res, next) {
    const id = req.params.id;

    const deleted = model.deleteHistory(id);

    if (!deleted) {
        const error = new Error(
            "Không tìm thấy phép tính."
        );

        error.status = 404;

        return next(error);
    }

    res.redirect("/history");
}

// 7. Xoa toan bo lich su
function clearHistory(req, res) {
    model.clearHistory();

    res.redirect("/history");
}

// 8. Hien thi trang thong ke
function statistics(req, res) {
    res.render("statistics", {
        title: "Analytics Center",
        activePage: "statistics",
        stats: model.getStatistics()
    });
}

// 9. Xuat bao cao TXT
function exportReport(req, res) {
    const report = model.exportReport();

    res.setHeader(
        "Content-Type",
        "text/plain; charset=utf-8"
    );

    res.setHeader(
        "Content-Disposition",
        'attachment; filename="NEXUS-X-Report.txt"'
    );

    res.send(report);
}

// 10. API lich su
function historyAPI(req, res) {
    res.json({
        success: true,
        data: model.getHistory()
    });
}

// 11. API thong ke
function statisticsAPI(req, res) {
    res.json({
        success: true,
        data: model.getStatistics()
    });
}

// 12. Chuyen doi dung luong sang MB
function toMB(bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

// 13. Chuyen doi thoi gian hoat dong
function formatUptime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${hours} giờ ${minutes} phút ${secs} giây`;
}

// 14. Hien thi trang he thong
function system(req, res) {
    const memory = process.memoryUsage();

    const systemInfo = {
        status: "ONLINE",
        nodeVersion: process.version,
        framework: "Express",
        templateEngine: "Pug",
        architecture: "MVC",
        platform: os.platform(),
        osType: os.type(),
        architectureCPU: os.arch(),
        cpuCores: os.cpus().length,
        totalMemory: toMB(os.totalmem()),
        freeMemory: toMB(os.freemem()),
        heapUsed: toMB(memory.heapUsed),
        uptime: formatUptime(process.uptime()),
        port: process.env.PORT || 3000,
        serverTime: new Date().toLocaleString("vi-VN")
    };

    res.render("system", {
        title: "System Monitor",
        activePage: "system",
        systemInfo,
        stats: model.getStatistics()
    });
}

// 15. Hien thi trang gioi thieu
function about(req, res) {
    res.render("about", {
        title: "About Project",
        activePage: "about",
        student: {
            name: "Đỗ Trung Ngọc Bảo",
            studentId: "CD-CNTT18A05",
            className: "CD-CNTT18A",
            subject: "NodeJS",
            lesson: "Bài 4 - Express Framework",
            project: "NEXUS X",
            repository: "NodeJS/Bai04/Baitapvidu"
        }
    });
}

// 16. Kiem tra loi HTTP 400
function test400(req, res, next) {
    const error = new Error(
        "Yêu cầu không hợp lệ - HTTP 400."
    );

    error.status = 400;

    next(error);
}

// 17. Kiem tra loi HTTP 500
function test500(req, res, next) {
    const error = new Error(
        "Kiểm tra lỗi máy chủ - HTTP 500."
    );

    error.status = 500;

    next(error);
}

// 18. Export cac Controller
module.exports = {
    index,
    calculator,
    calculate,
    calculateAPI,
    history,
    deleteHistory,
    clearHistory,
    statistics,
    exportReport,
    historyAPI,
    statisticsAPI,
    system,
    about,
    test400,
    test500
};

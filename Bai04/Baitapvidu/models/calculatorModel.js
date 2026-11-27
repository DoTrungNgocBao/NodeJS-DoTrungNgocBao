
// ======================================================
// NEXUS X - SMART CALCULATOR STUDIO
// BAI 04 - EXPRESS FRAMEWORK
// MODEL: calculatorModel.js
// ======================================================

const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

// 1. Duong dan luu tru du lieu
const DATA_DIR = path.join(__dirname, "../data");
const HISTORY_FILE = path.join(DATA_DIR, "history.json");

// 2. Khoi tao tap tin lich su
function initializeData() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(HISTORY_FILE)) {
        fs.writeFileSync(HISTORY_FILE, "[]", "utf8");
    }
}

initializeData();

// 3. Danh sach phep tinh
const operations = {
    add: {
        symbol: "+",
        name: "Phép cộng"
    },
    subtract: {
        symbol: "-",
        name: "Phép trừ"
    },
    multiply: {
        symbol: "×",
        name: "Phép nhân"
    },
    divide: {
        symbol: "÷",
        name: "Phép chia"
    }
};

// 4. Doc lich su tu JSON
function getHistory() {
    const content = fs.readFileSync(
        HISTORY_FILE,
        "utf8"
    );

    const history = JSON.parse(content || "[]");

    if (!Array.isArray(history)) {
        throw new Error("Dữ liệu lịch sử không hợp lệ.");
    }

    return history;
}

// 5. Luu lich su vao JSON
function saveHistory(history) {
    fs.writeFileSync(
        HISTORY_FILE,
        JSON.stringify(history, null, 4),
        "utf8"
    );
}

// 6. Them mot phep tinh vao lich su
function addHistory(item) {
    const history = getHistory();

    const record = {
        id: randomUUID(),
        ...item,
        createdAt: new Date().toISOString()
    };

    history.unshift(record);

    saveHistory(history);

    return record;
}

// 7. Tao loi HTTP 400
function createError(message) {
    const error = new Error(message);

    error.status = 400;

    return error;
}

// 8. Kiem tra va chuyen doi du lieu
function validateNumber(value, label) {
    if (
        value === undefined ||
        value === null ||
        (
            typeof value !== "number" &&
            typeof value !== "string"
        ) ||
        String(value).trim() === ""
    ) {
        throw createError(
            label + " không được để trống."
        );
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
        throw createError(
            label + " phải là một số hợp lệ."
        );
    }

    return number;
}

// 9. Chuan hoa phep tinh
function normalizeOperation(operation) {
    const aliases = {
        "+": "add",
        "-": "subtract",
        "−": "subtract",
        "*": "multiply",
        "×": "multiply",
        "/": "divide",
        "÷": "divide"
    };

    if (typeof operation !== "string") {
        return "";
    }

    return Object.hasOwn(aliases, operation)
        ? aliases[operation]
        : operation;
}

// 10. Xu ly tinh toan
function calculate(firstNumber, secondNumber, operation) {
    const op = normalizeOperation(operation);

    let a;
    let b;
    let result;

    try {
        a = validateNumber(
            firstNumber,
            "Số thứ nhất"
        );

        b = validateNumber(
            secondNumber,
            "Số thứ hai"
        );

        if (!Object.hasOwn(operations, op)) {
            throw createError(
                "Phép tính không hợp lệ."
            );
        }

        switch (op) {
            case "add":
                result = a + b;
                break;

            case "subtract":
                result = a - b;
                break;

            case "multiply":
                result = a * b;
                break;

            case "divide":
                if (b === 0) {
                    throw createError(
                        "Không thể chia cho 0."
                    );
                }

                result = a / b;
                break;
        }

        if (!Number.isFinite(result)) {
            throw createError(
                "Kết quả vượt giới hạn tính toán."
            );
        }

        // Han che sai so hien thi so thap phan
        result = Number(result.toPrecision(12));

    } catch (error) {
        if (error.status === 400) {
            addHistory({
                firstNumber: a ?? String(firstNumber ?? ""),
                secondNumber: b ?? String(secondNumber ?? ""),
                operation: op,
                operationName: Object.hasOwn(operations, op)
                    ? operations[op].name
                    : "Không hợp lệ",
                result: null,
                status: "error",
                message: error.message
            });
        }

        throw error;
    }

    const symbol = operations[op].symbol;

    return addHistory({
        firstNumber: a,
        secondNumber: b,
        operation: op,
        operationName: operations[op].name,
        symbol: symbol,
        expression: `${a} ${symbol} ${b} = ${result}`,
        result: result,
        status: "success",
        message: "Tính toán thành công."
    });
}

// 11. Tim kiem lich su
function searchHistory(keyword = "") {
    const search = String(keyword)
        .trim()
        .toLowerCase();

    return getHistory().filter(item => {
        const text = [
            item.firstNumber,
            item.secondNumber,
            item.operationName,
            item.expression,
            item.result,
            item.message,
            item.status
        ].join(" ").toLowerCase();

        return text.includes(search);
    });
}

// 12. Xoa mot phep tinh
function deleteHistory(id) {
    const history = getHistory();

    const updatedHistory = history.filter(
        item => item.id !== id
    );

    saveHistory(updatedHistory);

    return updatedHistory.length !== history.length;
}

// 13. Xoa toan bo lich su
function clearHistory() {
    saveHistory([]);

    return true;
}

// 14. Thong ke phep tinh
function getStatistics() {
    const history = getHistory();

    const total = history.length;

    const success = history.filter(
        item => item.status === "success"
    ).length;

    const errors = history.filter(
        item => item.status === "error"
    ).length;

    const successRate = total > 0
        ? Number((success / total * 100).toFixed(1))
        : 0;

    const operationStats = Object.keys(operations)
        .map(key => {
            const count = history.filter(item =>
                item.operation === key &&
                item.status === "success"
            ).length;

            return {
                operation: key,
                name: operations[key].name,
                symbol: operations[key].symbol,
                count: count,
                percentage: success > 0
                    ? Number(
                        (count / success * 100).toFixed(1)
                    )
                    : 0
            };
        });

    return {
        total,
        success,
        errors,
        successRate,
        operationStats,
        recent: history.slice(0, 5)
    };
}

// 15. Xuat bao cao dang TXT
function exportReport() {
    const history = getHistory();
    const stats = getStatistics();

    const lines = [
        "========================================",
        " NEXUS X - SMART CALCULATOR STUDIO",
        " CALCULATION REPORT",
        "========================================",
        "",
        "Thời gian: " + new Date().toLocaleString("vi-VN"),
        "Tổng phép tính: " + stats.total,
        "Thành công: " + stats.success,
        "Thất bại: " + stats.errors,
        "Tỷ lệ thành công: " + stats.successRate + "%",
        "",
        "THỐNG KÊ PHÉP TÍNH",
        "----------------------------------------"
    ];

    stats.operationStats.forEach(item => {
        lines.push(
            `${item.name}: ${item.count} (${item.percentage}%)`
        );
    });

    lines.push("");
    lines.push("LỊCH SỬ TÍNH TOÁN");
    lines.push("----------------------------------------");

    history.forEach((item, index) => {
        lines.push(
            `${index + 1}. ${item.expression || item.message}`
        );

        lines.push(
            "   Thời gian: " +
            new Date(item.createdAt).toLocaleString("vi-VN")
        );

        lines.push(
            "   Trạng thái: " + item.status
        );

        lines.push("");
    });

    lines.push("========================================");
    lines.push(" NEXUS X - END OF REPORT");
    lines.push("========================================");

    return lines.join("\n");
}

// 16. Export cac ham cho Controller
module.exports = {
    calculate,
    getHistory,
    searchHistory,
    deleteHistory,
    clearHistory,
    getStatistics,
    exportReport,
    operations
};

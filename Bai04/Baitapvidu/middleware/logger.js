
// ======================================================
// NEXUS X - SMART CALCULATOR STUDIO
// BAI 04 - EXPRESS FRAMEWORK
// MIDDLEWARE: logger.js
// ======================================================

// 1. Mau sac Terminal
const colors = {
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    purple: "\x1b[35m",
    reset: "\x1b[0m"
};

// 2. Middleware ghi nhat ky
function logger(req, res, next) {

    // Thoi diem bat dau
    const start = process.hrtime.bigint();

    const time = new Date().toLocaleString("vi-VN");

    // Khi Server hoan thanh phan hoi
    res.on("finish", () => {

        const end = process.hrtime.bigint();

        const duration = (
            Number(end - start) / 1000000
        ).toFixed(2);

        const status = res.statusCode;

        let statusColor = colors.green;

        // Phan loai trang thai HTTP
        if (status >= 500) {
            statusColor = colors.red;
        } else if (status >= 400) {
            statusColor = colors.yellow;
        } else if (status >= 300) {
            statusColor = colors.cyan;
        }

        const methodColor = req.method === "POST"
            ? colors.purple
            : colors.cyan;

        console.log(
            colors.cyan +
            "[NEXUS X]" +
            colors.reset +
            " [" + time + "] " +

            methodColor +
            req.method.padEnd(6) +
            colors.reset +

            " " + req.originalUrl +

            " | " +

            statusColor +
            status +
            colors.reset +

            " | " +

            duration + " ms"
        );
    });

    // Chuyen yeu cau sang Middleware tiep theo
    next();
}

// 3. Export Middleware
module.exports = logger;

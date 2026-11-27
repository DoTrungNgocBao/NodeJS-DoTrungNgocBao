
// ======================================================
// NEXUS X - SMART CALCULATOR STUDIO
// BAI 04 - EXPRESS FRAMEWORK
// MIDDLEWARE: errorHandler.js
// ======================================================

// 1. Middleware xu ly loi
function errorHandler(err, req, res, next) {

    // Neu phan hoi da duoc gui
    if (res.headersSent) {
        return next(err);
    }

    // 2. Xac dinh ma trang thai HTTP
    const rawStatus = err.status || err.statusCode;

    const status = Number.isInteger(rawStatus) &&
        rawStatus >= 400 &&
        rawStatus <= 599
        ? rawStatus
        : 500;

    let title;
    let message;
    let description;
    let errorCode;

    // 3. Phan loai loi
    switch (status) {

        case 400:
            title = "BAD REQUEST";
            errorCode = "INVALID_REQUEST";
            message = "Yêu cầu không hợp lệ";
            description =
                err.message ||
                "Vui lòng kiểm tra dữ liệu nhập.";
            break;

        case 403:
            title = "FORBIDDEN";
            errorCode = "ACCESS_DENIED";
            message = "Không có quyền truy cập";
            description =
                "Bạn không có quyền truy cập tài nguyên này.";
            break;

        case 404:
            title = "PAGE NOT FOUND";
            errorCode = "ROUTE_NOT_FOUND";
            message = "Không tìm thấy trang";
            description =
                "Đường dẫn bạn yêu cầu không tồn tại.";
            break;

        case 500:
            title = "INTERNAL SERVER ERROR";
            errorCode = "SYSTEM_FAILURE";
            message = "Lỗi máy chủ";
            description =
                "Hệ thống gặp sự cố khi xử lý yêu cầu.";
            break;

        default:
            title = "SYSTEM ERROR";
            errorCode = "UNKNOWN_ERROR";
            message = "Đã xảy ra lỗi";
            description =
                "Không thể hoàn thành yêu cầu.";
    }

    // 4. Ghi loi ra Terminal
    console.error(
        "\x1b[31m" +
        "[NEXUS X - ERROR " + status + "] " +
        err.message +
        "\x1b[0m"
    );

    // 5. Xu ly loi cho API
    if (req.originalUrl.startsWith("/api/")) {

        return res.status(status).json({
            success: false,
            status: status,
            errorCode: errorCode,
            message: message,
            description: description
        });
    }

    // 6. Hien thi giao dien loi Pug
    res.status(status).render("error", {
        title: title,
        activePage: "",
        status: status,
        errorCode: errorCode,
        message: message,
        description: description,
        requestPath: req.path,
        requestMethod: req.method,
        time: new Date().toLocaleString("vi-VN")
    });
}

// 7. Export Middleware
module.exports = errorHandler;

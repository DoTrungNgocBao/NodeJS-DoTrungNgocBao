
// ==================================================
// BAO.DEV - PERSONAL PORTFOLIO V2.0
// Sinh vien: Do Trung Ngoc Bao
// Ma sinh vien: CD-CNTT18A05
// Lop: CD-CNTT18A
// Bai 4 - Bt01 - Express Framework
// ==================================================

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const startTime = Date.now();

// ==================================================
// 1. MIDDLEWARE
// ==================================================

app.disable('x-powered-by');

app.use(express.json({ limit: '16kb' }));

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));

// Ghi nhat ky truy cap
app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const time = Date.now() - start;

        console.log(
            `[BAO.DEV] ${req.method} ` +
            `${req.path} | HTTP ${res.statusCode} | ${time}ms`
        );
    });

    next();
});

// Su dung CSS, JavaScript va hinh anh
app.use(express.static(
    path.join(__dirname, 'public')
));

// Ham hien thi trang HTML
function renderPage(res, fileName) {
    res.sendFile(
        path.join(__dirname, 'views', fileName)
    );
}

// ==================================================
// 2. ROUTING - 5 TRANG CHINH
// ==================================================

// Trang chu
app.get('/', (req, res) => {
    renderPage(res, 'index.html');
});

// Gioi thieu ban than
app.get('/about', (req, res) => {
    renderPage(res, 'about.html');
});

// Ky nang lap trinh
app.get('/skills', (req, res) => {
    renderPage(res, 'skills.html');
});

// So thich ca nhan
app.get('/hobbies', (req, res) => {
    renderPage(res, 'hobbies.html');
});

// Lien he
app.get('/contact', (req, res) => {
    renderPage(res, 'contact.html');
});

// ==================================================
// 3. API THONG TIN WEBSITE
// ==================================================

app.get('/api/profile', (req, res) => {
    res.json({
        success: true,
        data: {
            name: 'Đỗ Trung Ngọc Bảo',
            role: 'IT Student & Web Developer',
            major: 'Công nghệ thông tin',
            website: 'BAO.DEV',
            version: '2.0.0',
            technologies: [
                'HTML5',
                'CSS3',
                'JavaScript',
                'Node.js',
                'Express',
                'MongoDB',
                'SQL Server',
                'C#'
            ]
        }
    });
});

// ==================================================
// 4. API TRANG THAI SERVER
// ==================================================

app.get('/api/status', (req, res) => {
    res.json({
        success: true,
        status: 'ONLINE',
        application: 'BAO.DEV',
        version: '2.0.0',
        framework: 'Express',
        uptime: Math.floor(
            (Date.now() - startTime) / 1000
        ),
        time: new Date().toISOString()
    });
});

// ==================================================
// 5. XU LY FORM LIEN HE
// ==================================================

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body || {};

    // Kiem tra du lieu
    if (
        typeof name !== 'string' ||
        typeof email !== 'string' ||
        typeof message !== 'string' ||
        !name.trim() ||
        !email.trim() ||
        !message.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: 'Vui lòng nhập đầy đủ thông tin!'
        });
    }

    // Kiem tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
            success: false,
            message: 'Địa chỉ email không hợp lệ!'
        });
    }

    // Gioi han do dai
    if (
        name.length > 100 ||
        email.length > 254 ||
        message.length > 2000
    ) {
        return res.status(400).json({
            success: false,
            message: 'Nội dung vượt quá giới hạn!'
        });
    }

    // Phan hoi thanh cong
    res.status(200).json({
        success: true,
        message: 'Kiểm tra lời nhắn thành công! Đây là biểu mẫu thử nghiệm, không gửi email thực tế.'
    });
});

// ==================================================
// 6. XU LY HTTP 404
// ==================================================

app.use((req, res) => {
    res.status(404).sendFile(
        path.join(__dirname, 'views', '404.html')
    );
});

// ==================================================
// 7. XU LY LOI SERVER
// ==================================================

app.use((err, req, res, next) => {
    console.error('[ERROR]', err.message);

    if (res.headersSent) {
        return next(err);
    }

    const status = err.status || 500;

    res.status(status).json({
        success: false,
        message: status === 500
            ? 'Lỗi hệ thống!'
            : 'Dữ liệu yêu cầu không hợp lệ!'
    });
});

// ==================================================
// 8. KHOI DONG SERVER
// ==================================================

app.listen(PORT, '0.0.0.0', () => {
    console.clear();

    console.log('========================================');
    console.log('     BAO.DEV - PORTFOLIO SYSTEM V2.0');
    console.log('========================================');
    console.log('');
    console.log('[ONLINE] Express Server');
    console.log('[ACTIVE] Routing System');
    console.log('[ACTIVE] Profile API');
    console.log('[ACTIVE] Server Status API');
    console.log('[ACTIVE] Contact Validation');
    console.log('[ACTIVE] HTTP 404 Handler');
    console.log('[READY]  Cloud Deployment');
    console.log('');
    console.log('----------------------------------------');
    console.log('Node.js : ' + process.version);
    console.log('Port    : ' + PORT);
    console.log('----------------------------------------');
    console.log('');
    console.log('HOME    : http://localhost:' + PORT);
    console.log('ABOUT   : http://localhost:' + PORT + '/about');
    console.log('SKILLS  : http://localhost:' + PORT + '/skills');
    console.log('HOBBIES : http://localhost:' + PORT + '/hobbies');
    console.log('CONTACT : http://localhost:' + PORT + '/contact');
    console.log('PROFILE : http://localhost:' + PORT + '/api/profile');
    console.log('STATUS  : http://localhost:' + PORT + '/api/status');
    console.log('404     : http://localhost:' + PORT + '/404-test');
    console.log('');
    console.log('========================================');
});

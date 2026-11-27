
// ======================================================
// NEXUS X - SMART CALCULATOR STUDIO
// Bai 04 - Express Framework
// File: app.js
// ======================================================

// 1. Khai bao cac module
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// 2. Khoi tao Express
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Import Routes va Middleware
const calculatorRoutes = require("./routes/calculatorRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// 4. Cau hinh Template Engine Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 5. Cau hinh Middleware
app.use(logger);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// 6. Cau hinh thu muc Static
app.use(express.static(
    path.join(__dirname, "public")
));

// 7. Thong tin chung cua website
app.locals.appName = "NEXUS X";
app.locals.appDescription = "SMART CALCULATOR STUDIO";
app.locals.currentYear = new Date().getFullYear();

// 8. Su dung Routes
app.use("/", calculatorRoutes);

// 9. Xu ly loi 404
app.use((req, res, next) => {
    const error = new Error(
        "Trang ban yeu cau khong ton tai."
    );

    error.status = 404;
    next(error);
});

// 10. Middleware xu ly loi
app.use(errorHandler);

// 11. Khoi dong Web Server
app.listen(PORT, () => {
    console.clear();

    const cyan = "\x1b[36m";
    const green = "\x1b[32m";
    const yellow = "\x1b[33m";
    const reset = "\x1b[0m";

    console.log(cyan);
    console.log("==============================================");
    console.log("                 N E X U S  X");
    console.log("          SMART CALCULATOR STUDIO");
    console.log("==============================================");
    console.log(reset);

    console.log(green + "[ONLINE] EXPRESS SERVER" + reset);
    console.log(green + "[ACTIVE] MVC ARCHITECTURE" + reset);
    console.log(green + "[ACTIVE] PUG TEMPLATE ENGINE" + reset);
    console.log(green + "[ACTIVE] MIDDLEWARE SYSTEM" + reset);
    console.log(green + "[ACTIVE] ERROR HANDLING" + reset);

    console.log(cyan);
    console.log("----------------------------------------------");
    console.log(" SYSTEM INFORMATION");
    console.log("----------------------------------------------");
    console.log(reset);

    console.log("Node.js    :", process.version);
    console.log("Framework  : Express");
    console.log("Engine     : Pug");
    console.log("Port       :", PORT);
    console.log("Directory  :", __dirname);

    console.log(yellow);
    console.log("----------------------------------------------");
    console.log(" WEBSITE ACCESS");
    console.log("----------------------------------------------");
    console.log(reset);

    console.log("Dashboard  : http://localhost:" + PORT);
    console.log("Calculator : http://localhost:" + PORT + "/calculator");
    console.log("History    : http://localhost:" + PORT + "/history");
    console.log("Statistics : http://localhost:" + PORT + "/statistics");
    console.log("System     : http://localhost:" + PORT + "/system");
    console.log("About      : http://localhost:" + PORT + "/about");

    console.log(cyan);
    console.log("==============================================");
    console.log("         NEXUS X - SYSTEM READY");
    console.log("==============================================");
    console.log(reset);
});

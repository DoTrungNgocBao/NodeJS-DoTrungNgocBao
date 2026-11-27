
// ======================================================
// NEXUS X - SMART CALCULATOR STUDIO
// BAI 04 - EXPRESS FRAMEWORK
// ROUTES: calculatorRoutes.js
// ======================================================

const express = require("express");

const router = express.Router();

const controller = require(
    "../controllers/calculatorController"
);

// ==========================================
// 1. ROUTES HIEN THI GIAO DIEN
// ==========================================

// Trang chu Dashboard
router.get("/", controller.index);

// Trang may tinh
router.get("/calculator", controller.calculator);

// Trang lich su
router.get("/history", controller.history);

// Trang thong ke
router.get("/statistics", controller.statistics);

// Trang he thong
router.get("/system", controller.system);

// Trang gioi thieu
router.get("/about", controller.about);

// ==========================================
// 2. ROUTES XU LY DU LIEU
// ==========================================

// Xu ly form tinh toan
router.post("/calculate", controller.calculate);

// Xoa mot phep tinh
router.post(
    "/history/delete/:id",
    controller.deleteHistory
);

// Xoa toan bo lich su
router.post(
    "/history/clear",
    controller.clearHistory
);

// Xuat bao cao
router.get(
    "/history/export",
    controller.exportReport
);

// ==========================================
// 3. API ROUTES
// ==========================================

// API tinh toan
router.post(
    "/api/calculate",
    controller.calculateAPI
);

// API lay lich su
router.get(
    "/api/history",
    controller.historyAPI
);

// API lay thong ke
router.get(
    "/api/statistics",
    controller.statisticsAPI
);

// ==========================================
// 4. ROUTES KIEM TRA LOI
// ==========================================

// Kiem tra loi HTTP 400
router.get(
    "/test/400",
    controller.test400
);

// Kiem tra loi HTTP 500
router.get(
    "/test/500",
    controller.test500
);

// ==========================================
// 5. EXPORT ROUTER
// ==========================================

module.exports = router;

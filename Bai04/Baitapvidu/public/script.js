
/* =====================================================
   NEXUS X - SMART CALCULATOR STUDIO
   BAI 04 - EXPRESS FRAMEWORK
   FRONTEND JAVASCRIPT
===================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       01. KHOI TAO HE THONG
    ================================================= */

    console.log("====================================");
    console.log("NEXUS X - SMART CALCULATOR STUDIO");
    console.log("Frontend system initialized");
    console.log("====================================");

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) =>
        document.querySelectorAll(selector);


    /* =================================================
       02. THONG BAO TOAST
    ================================================= */

    let toastTimer;

    function showToast(message, type = "success") {

        const oldToast = $(".toast");

        if (oldToast) {
            oldToast.remove();
        }

        clearTimeout(toastTimer);

        const toast = document.createElement("div");

        toast.className = "toast " + type;

        toast.setAttribute("role", "status");

        toast.textContent =
            (type === "success" ? "✓ " : "⚠ ") + message;

        document.body.appendChild(toast);

        toastTimer = setTimeout(function () {
            toast.remove();
        }, 3000);
    }


    /* =================================================
       03. DONG HO THOI GIAN THUC
    ================================================= */

    function updateClock() {

        const clock = $("#liveClock");

        if (!clock) return;

        const now = new Date();

        clock.textContent = now.toLocaleTimeString(
            "vi-VN",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }
        );
    }

    updateClock();

    setInterval(updateClock, 1000);


    /* =================================================
       04. CHUYEN DOI DARK MODE / LIGHT MODE
    ================================================= */

    const themeToggle = $("#themeToggle");

    function applyTheme(theme) {

        const isLight = theme === "light";

        document.body.classList.toggle(
            "light-mode",
            isLight
        );

        if (themeToggle) {

            themeToggle.textContent =
                isLight ? "☾" : "☀";

            themeToggle.title =
                isLight
                    ? "Chuyển sang giao diện tối"
                    : "Chuyển sang giao diện sáng";
        }
    }

    let savedTheme = "dark";

    try {
        savedTheme =
            localStorage.getItem("nexus-theme") || "dark";
    } catch (error) {
        console.warn("Không đọc được theme.");
    }

    applyTheme(savedTheme);

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            const isLight =
                document.body.classList.contains("light-mode");

            const newTheme =
                isLight ? "dark" : "light";

            applyTheme(newTheme);

            try {
                localStorage.setItem(
                    "nexus-theme",
                    newTheme
                );
            } catch (error) {
                console.warn("Không lưu được theme.");
            }

            showToast(
                newTheme === "light"
                    ? "Đã bật giao diện sáng"
                    : "Đã bật giao diện tối"
            );
        });
    }


    /* =================================================
       05. MENU RESPONSIVE
    ================================================= */

    const menuToggle = $("#menuToggle");

    const sidebar = $(".sidebar");

    if (menuToggle && sidebar) {

        menuToggle.addEventListener("click", function () {

            const opened =
                sidebar.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(opened)
            );
        });

        $$(".nav-link").forEach(function (link) {

            link.addEventListener("click", function () {

                sidebar.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        });

        document.addEventListener("click", function (event) {

            if (
                window.innerWidth <= 850 &&
                !sidebar.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                sidebar.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });
    }


    /* =================================================
       06. SAO CHEP KET QUA
    ================================================= */

    async function copyText(value) {

        try {

            await navigator.clipboard.writeText(
                String(value)
            );

            showToast("Đã sao chép: " + value);

        } catch (error) {

            showToast(
                "Không thể sao chép kết quả.",
                "error"
            );
        }
    }

    $$("[data-copy]").forEach(function (button) {

        button.addEventListener("click", function () {

            copyText(button.dataset.copy);
        });
    });


    /* =================================================
       07. XAC NHAN TRUOC KHI XOA
    ================================================= */

    $$("form[data-confirm]").forEach(function (form) {

        form.addEventListener("submit", function (event) {

            const message =
                form.dataset.confirm ||
                "Bạn có chắc chắn muốn thực hiện?";

            if (!window.confirm(message)) {

                event.preventDefault();

                showToast("Đã hủy thao tác.");
            }
        });
    });


    /* =================================================
       08. KHOI TAO MAY TINH
    ================================================= */

    const calcDisplay = $("#calcDisplay");

    const calcExpression = $("#calcExpression");

    const calcKeys = $$(".calc-key");

    let currentValue = "0";

    let firstValue = null;

    let selectedOperator = null;

    let waitingForNumber = false;

    let justCalculated = false;

    let isCalculating = false;


    const operatorMap = {

        "+": "add",

        "-": "subtract",

        "×": "multiply",

        "÷": "divide"
    };


    /* =================================================
       09. CAP NHAT MAN HINH
    ================================================= */

    function updateDisplay() {

        if (!calcDisplay) return;

        calcDisplay.textContent = currentValue;
    }


    function updateExpression(value) {

        if (!calcExpression) return;

        calcExpression.textContent = value;
    }


    /* =================================================
       10. XOA TOAN BO - AC
    ================================================= */

    function clearCalculator() {

        currentValue = "0";

        firstValue = null;

        selectedOperator = null;

        waitingForNumber = false;

        justCalculated = false;

        updateDisplay();

        updateExpression("READY TO CALCULATE");
    }


    /* =================================================
       11. NHAP SO
    ================================================= */

    function inputNumber(number) {

        if (
            waitingForNumber ||
            justCalculated ||
            currentValue === "ERROR"
        ) {

            currentValue = "0";

            waitingForNumber = false;

            justCalculated = false;
        }

        if (currentValue.length >= 15) return;

        if (currentValue === "0") {

            currentValue =
                number === "00" ? "0" : number;

        } else {

            currentValue += number;
        }

        updateDisplay();
    }


    /* =================================================
       12. NHAP DAU THAP PHAN
    ================================================= */

    function inputDecimal() {

        if (
            waitingForNumber ||
            justCalculated ||
            currentValue === "ERROR"
        ) {

            currentValue = "0";

            waitingForNumber = false;

            justCalculated = false;
        }

        if (!currentValue.includes(".")) {

            currentValue += ".";
        }

        updateDisplay();
    }


    /* =================================================
       13. XOA MOT KY TU
    ================================================= */

    function backspace() {

        if (waitingForNumber) return;

        if (
            currentValue.length <= 1 ||
            currentValue === "ERROR"
        ) {

            currentValue = "0";

        } else {

            currentValue =
                currentValue.slice(0, -1);

            if (currentValue === "-") {

                currentValue = "0";
            }
        }

        updateDisplay();
    }


    /* =================================================
       14. DOI DAU AM DUONG
    ================================================= */

    function toggleSign() {

        if (waitingForNumber) {

            currentValue = "0";

            waitingForNumber = false;
        }

        if (
            currentValue === "0" ||
            currentValue === "ERROR"
        ) return;

        if (currentValue.startsWith("-")) {

            currentValue = currentValue.substring(1);

        } else {

            currentValue = "-" + currentValue;
        }

        updateDisplay();
    }


    /* =================================================
       15. CHON PHEP TOAN
    ================================================= */

    async function selectOperator(operator) {

        if (currentValue === "ERROR") return;

        if (
            selectedOperator !== null &&
            !waitingForNumber
        ) {

            const success = await calculate();

            if (!success) return;
        }

        firstValue = Number(currentValue);

        selectedOperator = operator;

        waitingForNumber = true;

        justCalculated = false;

        updateExpression(
            firstValue + " " + operator
        );
    }


    /* =================================================
       16. GUI YEU CAU TINH TOAN DEN EXPRESS API
    ================================================= */

    async function calculate() {

        if (
            firstValue === null ||
            selectedOperator === null ||
            waitingForNumber ||
            isCalculating
        ) return false;

        const secondValue = Number(currentValue);

        const expression =
            firstValue +
            " " +
            selectedOperator +
            " " +
            secondValue;

        isCalculating = true;

        updateExpression(expression + " =");

        try {

            const response = await fetch(
                "/api/calculate",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        firstNumber: firstValue,

                        secondNumber: secondValue,

                        operation:
                            operatorMap[selectedOperator]
                    })
                }
            );

            const data = await response.json();

            if (!response.ok || data.success === false) {

                throw new Error(
                    data.message ||
                    data.error ||
                    "Phép tính không hợp lệ."
                );
            }

            // Hỗ trợ một số cấu trúc JSON phổ biến.
            const payload = data.data ?? data.result ?? data;

            const result =
                typeof payload === "object" &&
                payload !== null
                    ? payload.result ?? payload.value
                    : payload;

            if (
                result === null ||
                result === undefined ||
                result === "" ||
                !Number.isFinite(Number(result))
            ) {

                throw new Error(
                    "Máy chủ trả về kết quả không hợp lệ."
                );
            }

            currentValue = String(result);

            firstValue = null;

            selectedOperator = null;

            waitingForNumber = false;

            justCalculated = true;

            updateDisplay();

            showToast("Tính toán thành công!");

            await refreshStatistics();

            return true;

        } catch (error) {

            currentValue = "ERROR";

            firstValue = null;

            selectedOperator = null;

            waitingForNumber = false;

            justCalculated = true;

            updateDisplay();

            updateExpression(
                expression + " — ERROR"
            );

            showToast(error.message, "error");

            await refreshStatistics();

            return false;

        } finally {

            isCalculating = false;
        }
    }


    /* =================================================
       17. CAP NHAT THONG KE
    ================================================= */

    async function refreshStatistics() {

        try {

            const response =
                await fetch("/api/statistics");

            if (!response.ok) return;

            const data = await response.json();

            const stats =
                data.stats || data.data || data;

            const totalCount = $("#totalCount");

            const successCount = $("#successCount");

            const errorCount = $("#errorCount");

            const successRate = $("#successRate");

            if (
                totalCount &&
                stats.total !== undefined
            ) {

                totalCount.textContent = stats.total;
            }

            if (
                successCount &&
                stats.success !== undefined
            ) {

                successCount.textContent = stats.success;
            }

            if (
                errorCount &&
                stats.errors !== undefined
            ) {

                errorCount.textContent = stats.errors;
            }

            if (
                successRate &&
                stats.successRate !== undefined
            ) {

                successRate.textContent =
                    stats.successRate + "%";
            }

            if (Array.isArray(stats.recent)) {

                renderRecentHistory(stats.recent);
            }

        } catch (error) {

            console.warn(
                "Không thể cập nhật thống kê:",
                error.message
            );
        }
    }


    /* =================================================
       18. CAP NHAT HOAT DONG GAN DAY
    ================================================= */

    function renderRecentHistory(history) {

        const container = $("#recentHistory");

        if (!container) return;

        container.replaceChildren();

        if (history.length === 0) {

            const empty = document.createElement("p");

            empty.className = "empty-state";

            empty.textContent = "Chưa có phép tính nào.";

            container.appendChild(empty);

            return;
        }

        history.slice(0, 5).forEach(function (item) {

            const success = item.status === "success";

            const row = document.createElement("div");

            row.className = "activity-item";


            const icon = document.createElement("span");

            icon.className = "activity-icon";

            icon.textContent = success ? "✓" : "!";


            const content = document.createElement("div");

            content.className = "activity-content";


            const expression =
                document.createElement("strong");

            expression.textContent =
                item.expression ||
                item.message ||
                "Phép tính";


            const time = document.createElement("small");

            time.textContent =
                new Date(item.createdAt)
                    .toLocaleString("vi-VN");


            const status = document.createElement("span");

            status.className =
                success
                    ? "status-success"
                    : "status-error";

            status.textContent =
                success ? "SUCCESS" : "ERROR";


            content.append(expression, time);

            row.append(icon, content, status);

            container.appendChild(row);
        });
    }


    /* =================================================
       19. XU LY CAC NUT MAY TINH
    ================================================= */

    async function handleKey(key) {

        if (isCalculating) return;

        if (/^\d+$/.test(key)) {

            inputNumber(key);

            return;
        }

        switch (key) {

            case "AC":

                clearCalculator();

                break;


            case "⌫":

                backspace();

                break;


            case "±":

                toggleSign();

                break;


            case ".":

                inputDecimal();

                break;


            case "+":

            case "-":

            case "×":

            case "÷":

                await selectOperator(key);

                break;


            case "=":

                await calculate();

                break;
        }
    }


    /* =================================================
       20. SU KIEN CLICK BAN PHIM AO
    ================================================= */

    calcKeys.forEach(function (button) {

        button.addEventListener("click", function () {

            handleKey(button.dataset.key);
        });
    });


    /* =================================================
       21. HO TRO BAN PHIM VAT LY
    ================================================= */

    if (calcDisplay) {

        document.addEventListener("keydown", function (event) {

            const tagName =
                document.activeElement?.tagName;

            if (
                ["INPUT", "TEXTAREA", "SELECT", "BUTTON"]
                    .includes(tagName) ||
                document.activeElement?.isContentEditable ||
                event.ctrlKey ||
                event.altKey ||
                event.metaKey
            ) return;

            let key = event.key;

            const keyboardMap = {

                "*": "×",

                "/": "÷",

                "Enter": "=",

                "Backspace": "⌫",

                "Escape": "AC",

                "Delete": "AC"
            };

            key = keyboardMap[key] || key;

            const validKeys = [

                "0", "1", "2", "3", "4",

                "5", "6", "7", "8", "9",

                "+", "-", "×", "÷",

                ".", "=", "AC", "⌫"
            ];

            if (validKeys.includes(key)) {

                event.preventDefault();

                handleKey(key);
            }
        });

        updateDisplay();
    }


    /* =================================================
       22. KIEM TRA FORM TINH TOAN
    ================================================= */

    const calculationForm = $(".calculation-form");

    if (calculationForm) {

        calculationForm.addEventListener(
            "submit",
            function (event) {

                const first = $("#firstNumber");

                const second = $("#secondNumber");

                if (!first || !second) return;

                if (
                    first.value.trim() === "" ||
                    second.value.trim() === ""
                ) {

                    event.preventDefault();

                    showToast(
                        "Vui lòng nhập đầy đủ hai số.",
                        "error"
                    );

                    return;
                }

                if (
                    !Number.isFinite(Number(first.value)) ||
                    !Number.isFinite(Number(second.value))
                ) {

                    event.preventDefault();

                    showToast(
                        "Dữ liệu nhập không hợp lệ.",
                        "error"
                    );
                }
            }
        );
    }


    /* =================================================
       23. HOAN TAT KHOI TAO
    ================================================= */

    console.log("[OK] Real-time Clock");

    console.log("[OK] Theme Controller");

    console.log("[OK] Responsive Navigation");

    console.log("[OK] Clipboard Controller");

    console.log("[OK] Calculator Interface");

    console.log("[OK] Keyboard Support");

    console.log("[OK] Express API Integration");

    console.log("[OK] NEXUS X SYSTEM READY");

});

/* =====================================================
   END OF NEXUS X FRONTEND SYSTEM
===================================================== */

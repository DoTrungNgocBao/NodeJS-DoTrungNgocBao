
// ==================================================
// BAO.DEV - PERSONAL PORTFOLIO V2.0
// File: public/js/script.js
// ==================================================

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) =>
        document.querySelectorAll(selector);

    // ==============================================
    // 1. THONG BAO TOAST
    // ==============================================

    let toastTimer;

    function showToast(message) {

        const toast = $("#toast");

        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    // ==============================================
    // 2. CHUYEN GIAO DIEN SANG / TOI
    // ==============================================

    const themeToggle = $("#themeToggle");

    function applyTheme(theme) {

        document.body.classList.toggle(
            "light-mode",
            theme === "light"
        );

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        if (themeToggle) {

            themeToggle.textContent =
                theme === "light" ? "☾" : "☀";

            themeToggle.setAttribute(
                "aria-label",
                theme === "light"
                    ? "Chuyển sang giao diện tối"
                    : "Chuyển sang giao diện sáng"
            );
        }
    }

    let currentTheme =
        localStorage.getItem("bao-theme") || "dark";

    applyTheme(currentTheme);

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            currentTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";

            localStorage.setItem(
                "bao-theme",
                currentTheme
            );

            applyTheme(currentTheme);

            showToast(
                currentTheme === "light"
                    ? "Đã bật giao diện sáng"
                    : "Đã bật giao diện tối"
            );
        });
    }

    // ==============================================
    // 3. MENU DIEN THOAI
    // ==============================================

    const menuToggle = $("#menuToggle");
    const navMenu = $("#navMenu");

    function closeMenu() {

        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("active");

            menuToggle.textContent =
                isOpen ? "✕" : "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        $$("#navMenu a").forEach(link => {

            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", event => {

            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }

    // ==============================================
    // 4. THANH TIEN DO CUON TRANG
    // ==============================================

    const scrollProgress = $("#scrollProgress");
    const backToTop = $("#backToTop");

    function handleScroll() {

        const scrollTop = window.scrollY;

        const totalHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percent = totalHeight > 0
            ? (scrollTop / totalHeight) * 100
            : 0;

        if (scrollProgress) {

            scrollProgress.style.width =
                percent + "%";
        }

        if (backToTop) {

            backToTop.classList.toggle(
                "show",
                scrollTop > 350
            );
        }
    }

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();

    // ==============================================
    // 5. NUT VE DAU TRANG
    // ==============================================

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ==============================================
    // 6. HIEU UNG CHU DANH MAY
    // ==============================================

    const typingElement = $(
        "#typingText, #typedText, #typingEffect, .typing-text"
    );

    const words = [
        "IT Student",
        "Web Developer",
        "Node.js Developer",
        "Technology Enthusiast"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeWriter() {

        if (!typingElement) return;

        const word = words[wordIndex];

        if (deleting) {

            charIndex--;

        } else {

            charIndex++;
        }

        typingElement.textContent =
            word.substring(0, charIndex);

        let speed = deleting ? 45 : 90;

        if (!deleting && charIndex === word.length) {

            deleting = true;
            speed = 1800;

        } else if (deleting && charIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) % words.length;

            speed = 300;
        }

        setTimeout(typeWriter, speed);
    }

    if (typingElement) {

        if (
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {

            typingElement.textContent = words[0];

        } else {

            typingElement.textContent = "";
            typeWriter();
        }
    }

    // ==============================================
    // 7. KIEM TRA TRANG THAI SERVER
    // ==============================================

    const serverStatus = $("#serverStatus");

    async function checkServerStatus() {

        if (serverStatus) {

            serverStatus.textContent = "Checking...";

            serverStatus.classList.remove(
                "online",
                "offline"
            );
        }

        try {

            const response = await fetch(
                "/api/status",
                { cache: "no-store" }
            );

            if (!response.ok) {

                throw new Error("Server Error");
            }

            const data = await response.json();

            if (
                data.success &&
                data.status === "ONLINE"
            ) {

                if (serverStatus) {

                    serverStatus.textContent = "ONLINE";

                    serverStatus.classList.add("online");
                }

                const uptime = $("#serverUptime");

                if (uptime) {

                    uptime.textContent =
                        data.uptime + " giây";
                }

                return true;
            }

            throw new Error("Server Offline");

        } catch (error) {

            if (serverStatus) {

                serverStatus.textContent = "OFFLINE";

                serverStatus.classList.add("offline");
            }

            return false;
        }
    }

    checkServerStatus();

    const refreshStatus = $("#refreshStatus");

    if (refreshStatus) {

        refreshStatus.addEventListener(
            "click",
            async () => {

                refreshStatus.disabled = true;

                const online =
                    await checkServerStatus();

                refreshStatus.disabled = false;

                showToast(
                    online
                        ? "Express Server đang hoạt động!"
                        : "Không thể kết nối Server!"
                );
            }
        );
    }

    // ==============================================
    // 8. BO LOC KY NANG
    // ==============================================

    const filterButtons = $$(".filter-btn");

    const skillCards =
        $$(".skill-card[data-category]");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter ||
                button.dataset.category ||
                "all";

            filterButtons.forEach(item => {

                item.classList.remove("active");

                item.setAttribute(
                    "aria-pressed",
                    "false"
                );
            });

            button.classList.add("active");

            button.setAttribute(
                "aria-pressed",
                "true"
            );

            let count = 0;

            skillCards.forEach(card => {

                const category =
                    card.dataset.category || "";

                const visible =
                    filter === "all" ||
                    category.split(/\s+/).includes(filter);

                card.hidden = !visible;

                if (visible) count++;
            });

            const skillCount = $("#skillCount");

            if (skillCount) {

                skillCount.textContent = count;
            }
        });
    });

    // ==============================================
    // 9. SAO CHEP CODE
    // ==============================================

    const copyCode = $("#copyCode");
    const developerCode = $("#developerCode");

    if (copyCode && developerCode) {

        copyCode.addEventListener("click", async () => {

            try {

                await navigator.clipboard.writeText(
                    developerCode.textContent
                );

                copyCode.textContent = "Copied!";

                showToast("Đã sao chép mã nguồn!");

                setTimeout(() => {

                    copyCode.textContent = "Copy";

                }, 2000);

            } catch (error) {

                showToast("Không thể sao chép mã nguồn!");
            }
        });
    }

    // ==============================================
    // 10. DEM KY TU FORM LIEN HE
    // ==============================================

    const contactForm = $("#contactForm");
    const messageInput = $("#message");
    const charCount = $("#charCount");
    const formResult = $("#formResult");
    const submitBtn = $("#submitBtn");

    function updateCharCount() {

        if (!messageInput || !charCount) return;

        charCount.textContent =
            messageInput.value.length;
    }

    if (messageInput) {

        messageInput.addEventListener(
            "input",
            updateCharCount
        );

        updateCharCount();
    }

    // ==============================================
    // 11. HIEN THI KET QUA FORM
    // ==============================================

    function showFormResult(message, success) {

        if (!formResult) return;

        formResult.hidden = false;

        formResult.textContent = message;

        formResult.classList.remove(
            "success",
            "error"
        );

        formResult.classList.add(
            success ? "success" : "error"
        );
    }

    // ==============================================
    // 12. GUI FORM DEN EXPRESS SERVER
    // ==============================================

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const formData =
                    new FormData(contactForm);

                const data = {

                    name: String(
                        formData.get("name") || ""
                    ).trim(),

                    email: String(
                        formData.get("email") || ""
                    ).trim(),

                    message: String(
                        formData.get("message") || ""
                    ).trim()
                };

                if (
                    !data.name ||
                    !data.email ||
                    !data.message
                ) {

                    showFormResult(
                        "Vui lòng nhập đầy đủ thông tin!",
                        false
                    );

                    return;
                }

                const emailRegex =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(data.email)) {

                    showFormResult(
                        "Địa chỉ email không hợp lệ!",
                        false
                    );

                    return;
                }

                if (
                    data.name.length > 100 ||
                    data.email.length > 254 ||
                    data.message.length > 2000
                ) {

                    showFormResult(
                        "Nội dung vượt quá giới hạn!",
                        false
                    );

                    return;
                }

                const oldText = submitBtn
                    ? submitBtn.textContent
                    : "";

                if (submitBtn) {

                    submitBtn.disabled = true;

                    submitBtn.textContent =
                        "Đang xử lý...";
                }

                try {

                    const response = await fetch(
                        "/contact",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify(data)
                        }
                    );

                    const result =
                        await response.json();

                    if (
                        response.ok &&
                        result.success
                    ) {

                        contactForm.reset();

                        updateCharCount();

                        showFormResult(
                            result.message,
                            true
                        );

                        showToast(
                            "Kiểm tra lời nhắn thành công!"
                        );

                    } else {

                        showFormResult(
                            result.message ||
                            "Dữ liệu không hợp lệ!",
                            false
                        );
                    }

                } catch (error) {

                    showFormResult(
                        "Không thể kết nối đến Server!",
                        false
                    );

                } finally {

                    if (submitBtn) {

                        submitBtn.disabled = false;

                        submitBtn.textContent = oldText;
                    }
                }
            }
        );

        // Xoa noi dung form

        contactForm.addEventListener("reset", () => {

            if (formResult) {

                formResult.hidden = true;
            }

            setTimeout(updateCharCount, 0);
        });
    }

    // ==============================================
    // 13. TRANG LOI 404
    // ==============================================

    const errorPath = $("#errorPath");

    if (errorPath) {

        errorPath.textContent =
            window.location.pathname;
    }

    const goBack = $("#goBack");

    if (goBack) {

        goBack.addEventListener("click", () => {

            if (
                document.referrer &&
                new URL(document.referrer).origin ===
                    window.location.origin
            ) {

                window.history.back();

            } else {

                window.location.href = "/";
            }
        });
    }

    // ==============================================
    // 14. HIEU UNG KHI CUON TRANG
    // ==============================================

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        $$(
            ".feature-card, .skill-card, " +
            ".hobby-card, .stat-card, " +
            ".timeline-item, .contact-card"
        ).forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);
        });
    }

    // ==============================================
    // 15. THONG BAO KHOI DONG
    // ==============================================

    console.log(
        "%c BAO.DEV V2.0 ",
        "background:#080b15;" +
        "color:#22d3ee;" +
        "font-size:22px;" +
        "font-weight:bold;" +
        "padding:12px;"
    );

    console.log(
        "[SYSTEM] JavaScript initialized."
    );

    console.log(
        "[SYSTEM] Frontend ready."
    );

});

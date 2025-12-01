(function () {
    function login() {
        if (window.location.href.includes("login")) {

            const loginPage = document.querySelector("#page-login");

            if (loginPage) {
    // Make parent containers full height
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    loginPage.style.minHeight = "100vh"; // full viewport height

    loginPage.style.backgroundImage =
        "url('/assets/crm/images/studio-background-concept-abstract-empty-light-gradient-purple-studio-room-background-product-plain-studio-background.jpg')";
    loginPage.style.backgroundSize = "cover";
    loginPage.style.backgroundRepeat = "no-repeat";
    loginPage.style.backgroundPosition = "center";
    loginPage.style.backgroundAttachment = "fixed";
}

            // REMOVE the white backgrounds
            document.querySelectorAll(".page-content-wrapper, .for-login, .page-card").forEach(el => {
                el.style.background = "transparent";
            });

            // REMOVE BORDER RADIUS FROM ALL LOGIN ELEMENTS
            document.querySelectorAll(
                ".page-card, .login-content, .page-card-body, .form-control, .btn, .page-card-head"
            ).forEach(el => {
                el.style.borderRadius = "0px";
                el.style.border= "0px";
            });

            // Navbar
            const navbar = document.querySelector(".navbar.navbar-light.navbar-expand-lg");
            if (navbar) {
                navbar.style.backgroundColor = "#ffffffff";
                navbar.style.color = "#2d1951";

                navbar.querySelectorAll("a, .navbar-brand, .nav-link").forEach(el => {
                    el.style.color = "#2d1951";
                });
            }

            document.querySelectorAll(".form-control").forEach(input => {
                input.style.border = "0 solid #2d1951";
                input.style.color = "#2d1951";
                input.style.borderRadius = "20px";
            });

            document.querySelectorAll("body, #page-login, .page-card-head h4").forEach(el => {
                el.style.color = "#d2c8e6ff";
            });

            document.querySelectorAll(".btn.btn-primary, .btn.btn-sm.btn-primary.btn-block.btn-login")
                .forEach(btn => {
                btn.style.backgroundColor = "#ffffffff";
                btn.style.borderColor = "#2d1951";
                btn.style.borderRadius = "20px";
                btn.style.color = "#2d1951";
                btn.addEventListener("mouseover", () => {
                    btn.style.backgroundColor = "#2d1951";
                    btn.style.color = "#ffffffff";
                });
                btn.addEventListener("mouseout", () => {
                    btn.style.backgroundColor = "#ffffffff";
                    btn.style.color = "#2d1951";
                });
            });

            document.querySelectorAll(".btn-login-with-email-link")
    .forEach(btn => {
        btn.style.backgroundColor = "#ffffffff";
        btn.style.borderColor = "#2d1951";
        btn.style.borderRadius = "20px";
        btn.style.color = "#2d1951";

        btn.addEventListener("mouseover", () => {
            btn.style.backgroundColor = "#2d1951";
            btn.style.color = "#ffffffff";
        });

        btn.addEventListener("mouseout", () => {
            btn.style.backgroundColor = "#ffffffff";
            btn.style.color = "#2d1951";
        });
    });

        }
    }

    login();
    frappe.router.on("change", login);
})();

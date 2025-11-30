(function () {
    function login() {
        if (window.location.href.includes("login")) {

            const loginPage = document.querySelector("#page-login");

            if (loginPage) {
                loginPage.style.backgroundImage =
                    "url('/assets/crm/images/abstract-composition-wallpaper-background-concept.jpg')";
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
                navbar.style.backgroundColor = "#0e202d";
                navbar.style.color = "#a9bbc0";

                navbar.querySelectorAll("a, .navbar-brand, .nav-link").forEach(el => {
                    el.style.color = "#a9bbc0";
                });
            }

            document.querySelectorAll(".form-control").forEach(input => {
                input.style.border = "0 solid #a9bbc0";
                input.style.color = "#a9bbc0";
                input.style.borderRadius = "20px";
            });

            document.querySelectorAll("body, #page-login, .page-card-head h4").forEach(el => {
                el.style.color = "#a9bbc0";
            });

            document.querySelectorAll(".btn.btn-primary, .btn.btn-sm.btn-primary.btn-block.btn-login")
                .forEach(btn => {
                btn.style.backgroundColor = "#0e202d";
                btn.style.borderColor = "#a9bbc0";
                btn.style.borderRadius = "20px";
                btn.style.color = "#a9bbc0";
                btn.addEventListener("mouseover", () => {
                    btn.style.backgroundColor = "#a9bbc0";
                    btn.style.color = "#0e202d";
                });
                btn.addEventListener("mouseout", () => {
                    btn.style.backgroundColor = "#0e202d";
                    btn.style.color = "#a9bbc0";
                });
            });
        }
    }

    login();
    frappe.router.on("change", login);
})();

(function () {
    // Run after page load
    document.addEventListener("DOMContentLoaded", function () {
        if (window.location.href.includes("login")) {

            // Navbar background + font color
            const navbar = document.querySelector(".navbar.navbar-light.navbar-expand-lg");
            if (navbar) {
                navbar.style.backgroundColor = "#e1dfec";
                navbar.style.color = "#332757";
                navbar.querySelectorAll("a, .navbar-brand, .nav-link").forEach(el => {
                    el.style.color = "#332757";
                });
            }

            // Inputs border + font color
            document.querySelectorAll(".form-control").forEach(input => {
                input.style.border = "1px solid #332757";
                input.style.color = "#332757";
            });

            // Text color
            document.querySelectorAll("body, #page-login, .page-card, .form-control, .page-card-head h4").forEach(el => {
                el.style.color = "#332757";
            });

            // Login button
            document.querySelectorAll(".btn.btn-primary, .btn.btn-sm.btn-primary.btn-block.btn-login").forEach(btn => {
                btn.style.backgroundColor = "#332757";
                btn.style.borderColor = "#332757";
                btn.style.color = "#fff";
                btn.addEventListener("mouseover", () => {
                    btn.style.backgroundColor = "#012d4d";
                    btn.style.borderColor = "#012d4d";
                });
                btn.addEventListener("mouseout", () => {
                    btn.style.backgroundColor = "#332757";
                    btn.style.borderColor = "#332757";
                });
            });
        }
    });
})();
document.addEventListener("DOMContentLoaded", function () {
    const navButtons = document.querySelectorAll(".buttons a");
    const sections = document.querySelectorAll(".section");
    const bulletinButton1 = document.querySelector(".bulletin-button1");
    const bulletinButton2 = document.querySelector(".bulletin-button2");

    // Navigation functionality
    navButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior

            // Hide all sections
            sections.forEach(section => section.classList.remove("active"));

            // Get the target section from data-section attribute
            const targetSection = document.getElementById(button.getAttribute("data-section"));

            // Show the selected section
            if (targetSection) {
                targetSection.classList.add("active");
            }
        });
    });

    // Open modal
    bulletinButton1.addEventListener("click", function () {
        modal.style.display = "block";
    });

    bulletinButton2.addEventListener("click", function () {
        modal.style.display = "block";
    });
});
// Selecting all filter buttons
const filterButtons = document.querySelectorAll("#filters .filter-button");

// Logging them to ensure they are recognized
console.log("Filter buttons loaded:", filterButtons);

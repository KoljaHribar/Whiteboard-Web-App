document.addEventListener("DOMContentLoaded", function () {
    // Select the navigation buttons
    const navButtons = document.querySelectorAll(".buttons a");
    const sections = document.querySelectorAll(".section");
    const bulletinButton = document.querySelector(".bulletin-button");
    const modal = document.getElementById("bulletinModal");
    const closeModal = document.getElementById("closeModal");

    // Navigation functionality
    navButtons.forEach(button => {
        button.addEventListener("click", function () {
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

    // Bulletin button functionality
    bulletinButton.addEventListener("click", function () {
        modal.style.display = "block";
    });

    // Close modal when clicking close button
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
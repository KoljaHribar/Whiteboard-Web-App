document.addEventListener("DOMContentLoaded", function () {
    const navButtons = document.querySelectorAll(".buttons a");
    const sections = document.querySelectorAll(".section");
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

  document.addEventListener("DOMContentLoaded", function () {
    const chooseFileButton = document.getElementById("chooseFileButton");
    const fileInput = document.getElementById("fileInput");
    const fileNameDisplay = document.getElementById("fileName");

    // When button is clicked, open the file dialog
    chooseFileButton.addEventListener("click", function () {
        fileInput.click();
    });

    // Display the selected file name
    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = "Selected file: " + fileInput.files[0].name;
        } else {
            fileNameDisplay.textContent = "";
        }
    });
});
    bulletinButton2.addEventListener("click", function () {
        modal.style.display = "block";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const chooseFileButton = document.getElementById("chooseFileButton");
    const fileInput = document.getElementById("fileInput");
    const fileNameDisplay = document.getElementById("fileName");

    // When button is clicked, open the file dialog
    chooseFileButton.addEventListener("click", function () {
        fileInput.click();
    });

    // Display the selected file name
    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = "Selected file: " + fileInput.files[0].name;
        } else {
            fileNameDisplay.textContent = "";
        }
    });
});
// Selecting all filter buttons
const filterButtons = document.querySelectorAll("#filters .filter-button");

// Logging them to ensure they are recognized
console.log("Filter buttons loaded:", filterButtons);

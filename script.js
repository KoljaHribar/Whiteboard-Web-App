document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const navButtons = document.querySelectorAll(".buttons a");
    const sections = document.querySelectorAll(".section");
    const bulletinButton2 = document.querySelector(".bulletin-button2");
    const chooseFileButton = document.getElementById("chooseFileButton");
    const fileInput = document.getElementById("fileInput");
    const fileNameDisplay = document.getElementById("fileName");
    const homeSection = document.getElementById("home");  // Make sure home section is defined
    const filterButtons = document.querySelectorAll("#filters .filter-button");

    // ✅ Navigation functionality
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

    // ✅ File Upload Button Functionality
    chooseFileButton.addEventListener("click", function () {
        fileInput.click(); // Open file dialog
    });

    // ✅ Display the selected file name and upload image to Home
    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];

            // Display file name
            fileNameDisplay.textContent = "Selected file: " + file.name;

            // Create a temporary URL for the image
            const imageUrl = URL.createObjectURL(file);

            // Create an image element
            const image = document.createElement("img");
            image.src = imageUrl;
            image.style.width = "200px";  // Adjust size
            image.style.height = "auto";
            image.style.marginTop = "10px"; // Add spacing

            // Remove any previous images before adding a new one
            homeSection.innerHTML = ""; // Clears previous content
            homeSection.appendChild(image); // Add the image to "Home" section
        } else {
            fileNameDisplay.textContent = "";
        }
    });

    // ✅ Modal Handling (if you have a modal)
    if (bulletinButton2) {
        bulletinButton2.addEventListener("click", function () {
            const modal = document.getElementById("modal"); // Define modal
            if (modal) {
                modal.style.display = "block";
            } else {
                console.warn("Modal element not found.");
            }
        });
    }

    // ✅ Filter Button Logging
    console.log("Filter buttons loaded:", filterButtons);
});

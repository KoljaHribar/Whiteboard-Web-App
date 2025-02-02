// Wait for the entire HTML document to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {

    //array to store URLS
   
    // 🔹 Get necessary elements from the DOM
    const navButtons = document.querySelectorAll(".buttons a"); // Selects all navigation buttons
    const sections = document.querySelectorAll(".section"); // Selects all sections in the page
    const bulletinButton2 = document.querySelector(".bulletin-button2"); // Selects the bulletin upload button
    const chooseFileButton = document.getElementById("chooseFileButton"); // Selects the "Choose File" button
    const fileInput = document.getElementById("fileInput"); // Selects the hidden file input element
    const fileNameDisplay = document.getElementById("fileName"); // Selects the element where the file name is displayed
    const homeSection = document.getElementById("home");  // Selects the home section
    const filterButtons = document.querySelectorAll("#filters .filter-button"); // Selects all filter buttons

    let imageUrl = ''; // Global variable to store the uploaded image URL

    // 🔹 Navigation Functionality: Switching between sections
    navButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevents the default anchor link behavior (prevents page reload)

            // Hide all sections before showing the selected one
            sections.forEach(section => section.classList.remove("active"));

            // Get the target section from the clicked button's "data-section" attribute
            const targetSection = document.getElementById(button.getAttribute("data-section"));

            // Make the selected section visible
            if (targetSection) {
                targetSection.classList.add("active");
            }   
        });
    });

    // 🔹 File Upload Button Functionality (Opens File Dialog)
    chooseFileButton.addEventListener("click", function () {
        fileInput.click(); // Simulates a click on the hidden file input to open file selection
    });

    // 🔹 Display the selected file name and create a temporary URL for the image
    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) { // Check if the user selected a file
            const file = fileInput.files[0]; // Get the selected file

            // This section was commented out, but it displays the selected file name
            // fileNameDisplay.textContent = "Selected file: " + file.name;

            // Create a temporary URL for the selected image file (to preview before upload)
            imageUrl = URL.createObjectURL(file);

        }
    });

    // 🔹 Display uploaded image on the home section when clicking bulletinButton2
    if (bulletinButton2) {
        bulletinButton2.addEventListener("click", function () {
            if (imageUrl) { // Ensure an image was selected
                document.getElementById("dynamicImage").src = imageUrl; // Set the image preview on the home section
            }
        });
    }

    // 🔹 Log Filter Buttons for Debugging
    console.log("Filter buttons loaded:", filterButtons);
});

// 🔹 File Upload and Removal Handling
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll("#filters input[type='checkbox']"); // Select category checkboxes
    const uploadButton = document.getElementById("uploadButton"); // Select upload button
    const removeFileButton = document.getElementById("removeFileButton"); // Select remove file button
    const fileInput = document.getElementById("fileInput"); // Select file input field
    const fileNameDisplay = document.getElementById("fileName"); // Select file name display field
    let selectedCategories = []; // Array to store selected categories
    let selectedFile = null; // Variable to store the selected file for upload

    // 🔹 Function to update the selected categories list
    function updateCategories() {
        selectedCategories = Array.from(checkboxes) // Convert NodeList to an array
            .filter(checkbox => checkbox.checked) // Keep only checked checkboxes
            .map(checkbox => checkbox.value); // Extract the values of checked checkboxes
    }

    // 🔹 Listen for changes in checkboxes to update category selection
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateCategories);
    });

    // 🔹 Handle file selection and store the selected file
    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) { // Ensure a file was selected
            selectedFile = fileInput.files[0]; // Store the selected file
            fileNameDisplay.textContent = selectedFile.name; // Display the file name
        } else {
            selectedFile = null; // Reset file selection if none chosen
            fileNameDisplay.textContent = ""; // Clear file name display
        }
    });

    // 🔹 Handle file upload
    uploadButton.addEventListener("click", function () {
        if (selectedCategories.length === 0) { // Ensure at least one category is selected
            alert("Please select at least one category before uploading.");
            return;
        }

        if (!selectedFile) { // Ensure a file was selected before uploading
            alert("No file selected.");
            return;
        }

        const reader = new FileReader(); // Create a FileReader to process the file

        // Read the file and store its data
        reader.onload = function (e) {
            const fileData = {
                name: selectedFile.name, // Store file name
                categories: selectedCategories, // Store selected categories
                fileURL: e.target.result // Convert file to Base64 for storage
            };

            // Store the uploaded file details in localStorage
            localStorage.setItem("uploadedFile", JSON.stringify(fileData));

            alert("File uploaded successfully under categories: " + selectedCategories.join(", "));

            // Show the remove button after successful upload
            removeFileButton.style.display = "inline-block";
            fileNameDisplay.textContent = selectedFile.name;

            // Reset file input after upload
            fileInput.value = "";
            selectedFile = null; // Reset stored file reference
        };

        reader.readAsDataURL(selectedFile); // Convert file to Base64
    });

    // 🔹 Function to remove uploaded file
    removeFileButton.addEventListener("click", function () {
        localStorage.removeItem("uploadedFile"); // Remove file from localStorage

        // Clear file-related UI elements
        fileNameDisplay.textContent = "";
        const dynamicImage = document.getElementById("dynamicImage");

        if (dynamicImage) {
            dynamicImage.src = ""; // Remove image preview
            dynamicImage.style.display = "none"; // Hide image element
        }

        // Reset file input
        fileInput.value = "";
        selectedFile = null; // Reset stored file reference

        // Hide the remove button after deletion
        removeFileButton.style.display = "none";

        alert("File removed successfully.");
    });

    // 🔹 Load the stored file on page load (if any)
    const uploadedFileData = JSON.parse(localStorage.getItem("uploadedFile"));
    if (uploadedFileData) {
        fileNameDisplay.textContent = uploadedFileData.name; // Display stored file name
        removeFileButton.style.display = "inline-block"; // Show remove button if a file exists
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll("#filters input[type='checkbox']");
    const images = document.querySelectorAll(".image");

    // Function to filter images
    function updateImageVisibility() {
        // Get checked filters
        const selectedCategories = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        // Loop through images and filter based on category
        images.forEach(img => {
            const imageCategories = img.classList; // Get image categories (CSS classes)
            img.style.display = selectedCategories.some(category => imageCategories.contains(category)) || selectedCategories.length === 0 
                ? "inline-block" 
                : "none";
        });

        // Handle dynamically uploaded image
        const uploadedFileData = JSON.parse(localStorage.getItem("uploadedFile"));
        if (uploadedFileData) {
            const dynamicImage = document.getElementById("dynamicImage");
            dynamicImage.src = uploadedFileData.fileURL; 
            dynamicImage.style.display = selectedCategories.some(category => uploadedFileData.categories.includes(category)) || selectedCategories.length === 0 
                ? "inline-block" 
                : "none";
        }
    }

    // Attach event listeners to checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateImageVisibility);
    });

    // Initial filtering on page load
    updateImageVisibility();
});
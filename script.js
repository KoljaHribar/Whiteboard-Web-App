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

    let imageUrl = '';
    //potentially add image as global so we can add to gallery

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

    // File Upload Button Functionality
    chooseFileButton.addEventListener("click", function () {
        fileInput.click(); // Open file dialog
      
    });

    // Display the selected file name and create temporary URL
    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];

            // Display file name    //I don't think this is necessary
            //fileNameDisplay.textContent = "Selected file: " + file.name;

            // Create a temporary URL for the image
            imageUrl = URL.createObjectURL(file);  // Create a temporary URL
             // Pass it to the HTML element
          
            // imageUrl = URL.createObjectURL(file);
        }
        // } else {
        //     fileNameDisplay.textContent = "";
        // }
    });

    // display image on home section
    if (bulletinButton2) {
        bulletinButton2.addEventListener("click", function () {
            if (imageUrl)
            {
                //this is where add to gallery function would go

               // const image = document.createElement("img");
                //image.src = imageUrl;
               // image.style.width = "200px";  // Adjust size
                //image.style.height = "auto";
               // image.style.marginTop = "10px"; // Add spacing

                //document.getElementById("dynamicImage").src = imageUrl;
                document.getElementById("dynamicImage").src = imageUrl;

                // Remove any previous images before adding a new one
                //homeSection.innerHTML = ""; // Clears previous content
                //homeSection.appendChild(image); // Add the image to "Home" section
            }
        });
    }

    // Filter Button Logging
    console.log("Filter buttons loaded:", filterButtons);
});
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll("#filters input[type='checkbox']");
    const uploadButton = document.getElementById("uploadButton");
    const removeFileButton = document.getElementById("removeFileButton");
    const fileInput = document.getElementById("fileInput");
    const fileNameDisplay = document.getElementById("fileName");
    let selectedCategories = [];
    let selectedFile = null; // Store the selected file properly

    // Function to update selected categories
    function updateCategories() {
        selectedCategories = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
    }

    // Listen for changes in checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateCategories);
    });

    // Handle file selection and store the selected file
    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            selectedFile = fileInput.files[0]; // Store file for later use
            fileNameDisplay.textContent = selectedFile.name;
        } else {
            selectedFile = null; // Reset if no file is selected
            fileNameDisplay.textContent = "";
        }
    });

    // Handle file upload
    uploadButton.addEventListener("click", function () {
        if (selectedCategories.length === 0) {
            alert("Please select at least one category before uploading.");
            return;
        }

        if (!selectedFile) { // Check stored file instead of fileInput.files
            alert("No file selected.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const fileData = {
                name: selectedFile.name,
                categories: selectedCategories,
                fileURL: e.target.result
            };
            localStorage.setItem("uploadedFile", JSON.stringify(fileData));

            alert("File uploaded successfully under categories: " + selectedCategories.join(", "));

            // Show the remove button after upload
            removeFileButton.style.display = "inline-block";
            fileNameDisplay.textContent = selectedFile.name;

            // Reset file input after upload
            fileInput.value = "";
            selectedFile = null;
        };
        reader.readAsDataURL(selectedFile);
    });

    // Function to remove file
    removeFileButton.addEventListener("click", function () {
        localStorage.removeItem("uploadedFile");

        // Clear UI
        fileNameDisplay.textContent = "";
        const dynamicImage = document.getElementById("dynamicImage");
        if (dynamicImage) {
            dynamicImage.src = "";
            dynamicImage.style.display = "none";
        }

        // Reset file input properly
        fileInput.value = "";
        selectedFile = null; // Also reset stored file reference

        // Hide the remove button
        removeFileButton.style.display = "none";

        alert("File removed successfully.");
    });

    // Load stored file on page load
    const uploadedFileData = JSON.parse(localStorage.getItem("uploadedFile"));
    if (uploadedFileData) {
        fileNameDisplay.textContent = uploadedFileData.name;
        removeFileButton.style.display = "inline-block";
    }
});
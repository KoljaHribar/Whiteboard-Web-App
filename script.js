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




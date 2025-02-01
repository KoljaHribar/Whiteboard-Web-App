// Wait until the entire HTML document is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
    // Store the currently active section (default is "home")
    let activeSection = document.getElementById("home"); 

    // 🔹 Step 1: Add a click event listener to the navigation buttons container 
    document.querySelector('.buttons').addEventListener('click', function (event) {
        // 🔹 Step 2: Check if the clicked element is an <a> (navigation link)
        if (event.target.tagName === "A") {
            let sectionId = event.target.dataset.section; // Get the section ID from data-section attribute
            showSection(sectionId); // Call function to switch sections
        }
    });

    // Function to show the selected section and hide others
    //  🛑 Start of showSection
    function showSection(sectionId) {
        // 🔹 Step 3: Get the target section by its ID
        let targetSection = document.getElementById(sectionId);

        // 🔹 Step 4: If the target section does not exist, exit the function to prevent errors
        if (!targetSection) return; 

        // 🔹 Step 5: Hide the currently active section
        if (activeSection) {
            activeSection.classList.remove('active'); // Remove "active" class to hide it
            activeSection.setAttribute('aria-hidden', 'true'); // Hide from screen readers
        }

        // 🔹 Step 6: Show the newly selected section
        activeSection = targetSection; // Update the activeSection variable
        activeSection.classList.add('active'); // Make the new section visible
        activeSection.setAttribute('aria-hidden', 'false'); // Make it accessible to screen readers
    }
    //  🛑 End of showSection
});
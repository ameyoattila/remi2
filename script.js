document.addEventListener("DOMContentLoaded", function () {
    // Search Functionality
    const searchInput = document.getElementById("search-bar");
    searchInput.addEventListener("keyup", function () {
        let query = searchInput.value.toLowerCase();
        let products = document.querySelectorAll(".product-card");
        products.forEach((product) => {
            let title = product.querySelector("h3").innerText.toLowerCase();
            let category = product.getAttribute("data-category").toLowerCase();
            product.style.display = (title.includes(query) || category.includes(query)) ? "block" : "none";
        });
    });

    // Sidebar Click Functionality
    let categories = document.querySelectorAll(".sidebar li");
    categories.forEach((category) => {
        category.addEventListener("click", function () {
            categories.forEach((item) => item.classList.remove("active"));
            this.classList.add("active");
            filterByCategory(this.innerText.toLowerCase());
        });
    });

    // Function to Filter Products by Category
    function filterByCategory(category) {
        let products = document.querySelectorAll(".product-card");
        products.forEach((product) => {
            let productCategory = product.getAttribute("data-category").toLowerCase();
            product.style.display = productCategory.includes(category) ? "block" : "none";
        });
    }
});

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

    // Sidebar Category Filtering
    let categories = document.querySelectorAll(".sidebar .category");
    categories.forEach((category) => {
        category.addEventListener("click", function () {
            let selectedCategory = this.getAttribute("data-category").toLowerCase();
            filterByCategory(selectedCategory);
        });
    });

    function filterByCategory(category) {
        let products = document.querySelectorAll(".product-card");
        products.forEach((product) => {
            let productCategory = product.getAttribute("data-category").toLowerCase();
            product.style.display = productCategory.includes(category) ? "block" : "none";
        });
    }
});

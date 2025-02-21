document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-bar");
    const likeButtons = document.querySelectorAll(".like-btn");
    const favoritesGrid = document.getElementById("favorites-grid");

    // Load liked items from localStorage
    let likedItems = JSON.parse(localStorage.getItem("likedProducts")) || [];

    // Apply "liked" class to saved products
    likeButtons.forEach((button) => {
        let productCard = button.closest(".product-card");
        let productTitle = productCard.querySelector("h3").innerText;

        if (likedItems.includes(productTitle)) {
            button.classList.add("liked");
            button.innerText = "❤️ Liked";
        }

        button.addEventListener("click", function () {
            toggleLike(productTitle, productCard, button);
        });
    });

    function toggleLike(productTitle, productCard, button) {
        if (likedItems.includes(productTitle)) {
            likedItems = likedItems.filter(item => item !== productTitle);
            button.classList.remove("liked");
            button.innerText = "❤️ Like";
        } else {
            likedItems.push(productTitle);
            button.classList.add("liked");
            button.innerText = "❤️ Liked";
        }

        // Save updated liked items to localStorage
        localStorage.setItem("likedProducts", JSON.stringify(likedItems));

        // If on Favorites page, remove unliked items
        if (window.location.pathname.includes("favorites.html")) {
            productCard.remove();
        }
    }

    // Load Favorite Items on favorites.html
    if (favoritesGrid) {
        displayFavorites();
    }

    function displayFavorites() {
        let products = document.querySelectorAll(".product-card");
        likedItems.forEach((title) => {
            let product = [...products].find(p => p.querySelector("h3").innerText === title);
            if (product) {
                let clone = product.cloneNode(true);
                clone.querySelector(".like-btn").remove(); // Remove like button from favorites page
                favoritesGrid.appendChild(clone);
            }
        });
    }
});

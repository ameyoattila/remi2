document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-bar");
    const likeButtons = document.querySelectorAll(".like-btn");
    const addToListButtons = document.querySelectorAll(".add-to-list");
    const shoppingListElement = document.getElementById("shopping-list");
    const clearListButton = document.getElementById("clear-list");
    const shareListButton = document.getElementById("share-list");
    const shareLinkInput = document.getElementById("share-link");

    // Load shopping list from localStorage
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

    // Apply "liked" class to saved products
    let likedItems = JSON.parse(localStorage.getItem("likedProducts")) || [];
    likeButtons.forEach((button) => {
        let productCard = button.closest(".product-card");
        let productTitle = productCard.querySelector("h3").innerText;

        if (likedItems.includes(productTitle)) {
            button.classList.add("liked");
            button.innerText = "❤️ Liked";
        }

        button.addEventListener("click", function () {
            toggleLike(productTitle, button);
        });
    });

    function toggleLike(productTitle, button) {
        if (likedItems.includes(productTitle)) {
            likedItems = likedItems.filter(item => item !== productTitle);
            button.classList.remove("liked");
            button.innerText = "❤️ Like";
        } else {
            likedItems.push(productTitle);
            button.classList.add("liked");
            button.innerText = "❤️ Liked";
        }
        localStorage.setItem("likedProducts", JSON.stringify(likedItems));
    }

    // Add to Shopping List
    addToListButtons.forEach((button) => {
        button.addEventListener("click", function () {
            let productCard = button.closest(".product-card");
            let productTitle = productCard.querySelector("h3").innerText;
            if (!shoppingList.includes(productTitle)) {
                shoppingList.push(productTitle);
                localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
                alert(`🛒 Added "${productTitle}" to your Shopping List!`);
            }
        });
    });

    // Display Shopping List Items
    if (shoppingListElement) {
        shoppingList.forEach((item) => {
            let li = document.createElement("li");
            li.innerText = item;
            shoppingListElement.appendChild(li);
        });
    }

    // Clear Shopping List
    if (clearListButton) {
        clearListButton.addEventListener("click", function () {
            localStorage.removeItem("shoppingList");
            shoppingListElement.innerHTML = "";
            alert("🗑️ Your shopping list has been cleared!");
        });
    }

    // Generate Shareable Shopping List Link
    if (shareListButton) {
        shareListButton.addEventListener("click", function () {
            let encodedList = encodeURIComponent(JSON.stringify(shoppingList));
            let shareURL = `${window.location.origin}/shopping-list.html?list=${encodedList}`;

            // Show the link
            shareLinkInput.style.display = "block";
            shareLinkInput.value = shareURL;
            shareLinkInput.select();
            document.execCommand("copy");

            alert("📋 Link copied! Share your shopping list with friends.");
        });
    }

    // Load Shared Shopping List from URL
    const urlParams = new URLSearchParams(window.location.search);
    const sharedList = urlParams.get("list");

    if (sharedList && shoppingListElement) {
        let decodedList = JSON.parse(decodeURIComponent(sharedList));
        shoppingListElement.innerHTML = "";
        decodedList.forEach((item) => {
            let li = document.createElement("li");
            li.innerText = item;
            shoppingListElement.appendChild(li);
        });
    }
});

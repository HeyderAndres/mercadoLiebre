window.onload = function() {
    console.log('loaded');
    let burger_menu = document.querySelector(".burger-menu");
    let menu = document.querySelector("#menu");
    burger_menu.addEventListener("click", function() {
        menu.classList.toggle("mostrarMenu")
    });

}
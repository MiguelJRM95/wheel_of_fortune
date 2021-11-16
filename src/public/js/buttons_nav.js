let homePageLink = document.getElementById("quote");
let winPageLink = document.getElementById("win");
let aboutPageLink = document.getElementById("about");
let contactPageLink = document.getElementById("contact");

const currentPage = () => {
    let location = window.location.href;
    return location.split('/')[3];
}

const activePage = (page) => {
    switch (page) {
        case "quote":
            homePageLink.classList.add("active");
            break;
        case "win":
            winPageLink.classList.add("active");
            break;
        case "about":
            aboutPageLink.classList.add("active");
            break;
        case "contact":
            contactPageLink.classList.add("active");
            break;
        case "":
            homePageLink.classList.add("active");
            break;
        default:
            homePageLink.classList.add("active");
            break;
    }
}

window.addEventListener('load', () => {
    activePage(currentPage());
})
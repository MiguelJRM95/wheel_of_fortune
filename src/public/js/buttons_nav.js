/** 
*    Functionality for color the navbar link active for the current page
*    where the user is at.
*/


/**
 * each link is a page serve 
 * the home page is the quote link
 * Because every time the user go there
 * a new quote is displayed
 */

let homePageLink = document.getElementById("quote");
let winPageLink = document.getElementById("win");
let aboutPageLink = document.getElementById("about");
let contactPageLink = document.getElementById("contact");

/**
 *  In case the app grows and a new level in the route would added
 *  This function will need to be modified
 * @returns the location the user is
 */
const currentPage = () => {
    let location = window.location.href;
    return location.split('/')[3];
}

/**
 * This functions recieve the current page location of the above function currentPage()
 * the add a class oc active to color the background of the link
 * don't return anything
 * @param {string} page 
 */
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

/**
 * Each time the window load it will know where the user is at and color 
 * highlight the link active
 */
window.addEventListener('load', () => {
    activePage(currentPage());
})
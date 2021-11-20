/**
 * The function gets the path the user is at and then print a diferent message for each one
 * In case anyone needs another modal when the window load just add a case in this switch
 * @returns the text message to shown in the modals used in index.html and win.html
 */

const textToShow = () => {
    let route = window.location.pathname;
    console.log(route);
    switch (route) {
        case '/win':
            return `Hi, Visitor! This is our Wheel Of Fortune, you have three free spins,
                    but remember, you first need to select a prize of your choise, Good Luck!
                    To play you only need to prees the spin button in the middle of the wheel,
                    the more times you press, the more speed you give the wheel.
            
                                                👇`;
        case '/':
            return `We are more than a race, or a gender or a number.
                    We live in a society, in a community, we are not alone.

                    But some times, we need a friend hand that show us our path of which we have lost.
                    Here is where Newforneurcoach comes, to help people to find her own path, to develop 
                    as a person, and help with our personal carrers.

                    Now more that ever we can't be lost, sadly our society has become extremly competitive 
                    and demanding, that we need to be the best version of our selfs.

                                                    We are here to help you so!`;
        default:
            console.log(route);
            break;
    }
}

/**
 * Creation of the background for the modal
 * style as well
 */
let backgroundPopUp = document.createElement("div");
backgroundPopUp.style.width = "100vw";
backgroundPopUp.style.height = "100vh";
backgroundPopUp.style.backgroundColor = "#2e2e2e9c";
backgroundPopUp.style.position = "absolute";
backgroundPopUp.style.top = "0";
backgroundPopUp.style.zIndex = "99";

/**
 * Creation of the container of the message and the close button
 */
let innerDivContent = document.createElement("div");
innerDivContent.style.width = "70vw";
innerDivContent.style.height = "fit-content";
innerDivContent.style.backgroundColor = "#fff";
innerDivContent.style.margin = "12% auto";
innerDivContent.style.padding = "2em";
innerDivContent.style.borderRadius = "25px";
innerDivContent.style.display = "flex";
innerDivContent.style.flexDirection = "column";
innerDivContent.style.justifyContent = "center";
innerDivContent.style.alignContent = "center";

/**
 * Creation of the close button
 */
let button = document.createElement("button");
button.type = "button";
button.innerText = "Close";
button.classList = "btn btn-primary";
button.style.width = "10vw";
button.style.margin = "3em";
button.style.alignSelf = "center";


/**
 * Paragraph element shown when the window loads
 */
let winExplanation = document.createElement("p");
winExplanation.style.textAlign = "center";
winExplanation.style.width = "70%";
winExplanation.style.margin = "0 auto";
winExplanation.innerText = textToShow();


/**
 * When the window loads the parent element backgroundPopUp
 * is append to the body, then all of the child are added
 */

window.addEventListener('load', () => {
    document.body.appendChild(backgroundPopUp);
    backgroundPopUp.appendChild(innerDivContent);
    innerDivContent.appendChild(winExplanation);
    innerDivContent.appendChild(button);
})

/**
 * When the user click on the close button
 * The parent element is remove, and the app it self is now usable
 */
button.addEventListener('click', () => {
    backgroundPopUp.remove();
})
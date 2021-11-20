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
            return `Hello World`;
        default:
            return route;
            break;
    }
}


let backgroundPopUp = document.createElement("div");
backgroundPopUp.style.width = "100vw";
backgroundPopUp.style.height = "100vh";
backgroundPopUp.style.backgroundColor = "#2e2e2e9c";
backgroundPopUp.style.position = "absolute";
backgroundPopUp.style.top = "0";
backgroundPopUp.style.zIndex = "99";


let innerDivContent = document.createElement("div");
innerDivContent.style.width = "70vw";
innerDivContent.style.height = "50vh";
innerDivContent.style.backgroundColor = "#fff";
innerDivContent.style.margin = "12% auto";
innerDivContent.style.borderRadius = "25px";
innerDivContent.style.display = "flex";
innerDivContent.style.flexDirection = "column";
innerDivContent.style.justifyContent = "center";
innerDivContent.style.alignContent = "center";

let button = document.createElement("button");
button.type = "button";
button.innerText = "Close";
button.classList = "btn btn-primary";
button.style.width = "10vw";
button.style.margin = "3em";
button.style.alignSelf = "center";

let winExplanation = document.createElement("p");
winExplanation.style.textAlign = "center";
winExplanation.style.width = "70%";
winExplanation.style.margin = "0 auto";
winExplanation.innerText = textToShow();


    window.addEventListener('load', () => {
        document.body.appendChild(backgroundPopUp);
        backgroundPopUp.appendChild(innerDivContent);
        innerDivContent.appendChild(winExplanation);
        innerDivContent.appendChild(button);
    })


button.addEventListener('click', () => {
    backgroundPopUp.remove();
})
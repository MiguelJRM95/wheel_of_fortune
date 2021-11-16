let backgroundPopUp = document.createElement("div");
backgroundPopUp.style.width = "100vw";
backgroundPopUp.style.height = "100vh";
backgroundPopUp.style.backgroundColor= "#2e2e2e9c";
backgroundPopUp.style.position= "absolute";
backgroundPopUp.style.top= "0";
backgroundPopUp.style.zIndex= "99";


let innerDivContent = document.createElement("div");
innerDivContent.style.width = "70vw";
innerDivContent.style.height = "50vh";
innerDivContent.style.backgroundColor= "#fff";
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
button.style.alignSelf = "center";


window.addEventListener('load', () =>{
    document.body.appendChild(backgroundPopUp);
    backgroundPopUp.appendChild(innerDivContent);
    innerDivContent.appendChild(button);
})


button.addEventListener('click', ()=>{
    backgroundPopUp.remove();
})
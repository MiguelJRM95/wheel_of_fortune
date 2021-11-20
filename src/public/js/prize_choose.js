/**
 * @var prize will select the three prizes the user can choose
 * @var luckyPrize the prize selected by the user of the three ones 
 *      or the default value in case the user doesn't choose anyone
 * @var warning the empty span that will warn the user in case he/she doesn't select any prize or try to select a different one
 *            once one it's chosen.
 */
let prizes = document.querySelectorAll(".prize");
let luckyPrize = document.querySelector(".eight");
let warning = document.querySelector(".warn");

/**
 * This function will set the value that the user choose inside the wheel
 * In case the user have already chose one, a warning will be shown to the user
 * @param {String} luckyPrize the div that will contain the prize choosen by the user
 * @param {String} userPrize the prize that the user choose among the three
 */
const choosePrize = (luckyPrize, userPrize) =>{
    if(luckyPrize.textContent === "Lucky prize"){
        luckyPrize.innerHTML = `<p class="wheel-text-small">${userPrize.textContent}</p>`;
    }else{
        
        let prizeTitle = document.querySelector(".prize-title");
        warning.className="bg-warning nav-link";
        warning.style.width="50%";
        warning.style.textAlign="center";
        warning.style.borderRadius="1em";
        warning.style.margin = "0 auto";
        warning.innerText = "You can choose a prize only once, sorry";
        prizeTitle.after(warning);
    }
}
/**
 * This function will listen to the prizes to know which one select the user
 * and would be set it in to the wheel
 * In case a warning has been shown to the user it will be removed
 */
Array.from(prizes).forEach((prize) => {
    prize.addEventListener('click', ()=>{
        if(warning.innerText != null){
            warning.remove();
        }
        choosePrize(luckyPrize, prize); 
    })
})
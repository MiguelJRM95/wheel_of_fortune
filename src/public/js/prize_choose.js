let prizes = document.querySelectorAll(".prize");
let luckyPrize = document.querySelector(".eight");
let warning = document.querySelector(".warn");


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

Array.from(prizes).forEach((prize) => {
    prize.addEventListener('click', ()=>{
        if(warning.innerText != null){
            warning.remove();
        }
        choosePrize(luckyPrize, prize); 
    })
})
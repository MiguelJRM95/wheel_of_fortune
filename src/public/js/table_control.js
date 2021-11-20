/**
 * @var clearTable button the user press in order to keep spinning the wheel
 */
let clearTable = document.getElementById("clear-prizes");

/**
 * 
 * @param {String} winner the Json object saved in the local storage
 * @param {int} iterator the number of winners saved in the  local storage
 */
let printWinner = (winner, iterator) =>{
    let row = document.createElement("tr");
    const luckyW = winner["luckyWinner"]==false?`\u274C`:`\u{1F4B0}`;
    row.innerHTML=`<th scope="row">${iterator+1}</th>
                    <td>${winner["luckyPrize"]}</td>
                    <td>${winner["prize"]}</td>
                    <td>${luckyW}</td>`;
    tableBody.appendChild(row);
}

/**
 * Each time the window load in the win.html
 * the local storage will be check in order to find if the user have ever spin the wheel
 */
window.addEventListener('load', ()=>{
    for (let i = 0; i < localStorage.length; i++) {
        let winner = JSON.parse(localStorage.getItem(`winner-${i+1}`));
        printWinner(winner, i);
    }
})

/**
 * When the user click on this button
 * the local storage is emptied and the table cleared
 */
clearTable.onclick = ()=>{
    localStorage.clear();
    winnerCounter = 0;
    tableBody.innerHTML="";
}

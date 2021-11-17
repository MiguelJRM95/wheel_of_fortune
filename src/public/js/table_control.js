let clearTable = document.getElementById("clear-prizes");

let printWinner = (winner, iterator) =>{
    let row = document.createElement("tr");
    const luckyW = winner["luckyWinner"]==false?`\u274C`:`\u{1F4B0}`;
    row.innerHTML=`<th scope="row">${iterator+1}</th>
                    <td>${winner["luckyPrize"]}</td>
                    <td>${winner["prize"]}</td>
                    <td>${luckyW}</td>`;
    tableBody.appendChild(row);
}

window.addEventListener('load', ()=>{
    for (let i = 0; i < localStorage.length; i++) {
        let winner = JSON.parse(localStorage.getItem(`winner-${i+1}`));
        printWinner(winner, i);
    }
})

clearTable.onclick = ()=>{
    localStorage.clear();
    tableBody.innerHTML="";
}

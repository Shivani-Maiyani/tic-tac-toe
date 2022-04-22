const statusDisplay = document.querySelector('.game--status');
// var box = document.querySelectorAll('.box-0');
// console.log(box);
let count = 0;
let gameActive = true;
let tick_X = "X";
let currentPlayer = tick_X;
let tick_round = "O";
let gameState = ["", "", "", "", "", "", "", "", ""];
console.log(gameState);

const winningMessage = () => `Player ${currentPlayer} has winner <img src="img/you-got.gif" class="winning">`;
const drawMessage = () => `Game ended in a draw!<img src="img/luck.gif" class="luck">`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
  var sound = new Audio('img/audio1.wav');
  sound.play();
    gameState[clickedCellIndex] = currentPlayer;
    console.log(gameState[clickedCellIndex]);
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === tick_X ? tick_round : tick_X;
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  console.log("9900")
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        var sound = new Audio('img/audio.mp3');
        sound.play();
        let lefttext = document.getElementById('text-left');
        let textright = document.getElementById('text-right');
        let status = document.getElementById('status');
        let body = document.getElementById('body')
        let text = document.getElementById('text');
        let table=document.getElementById('game');
        status.style.color = "#fff700";
        table.style.display="none";
        body.style.background = "url('img/bg5.jpg')";
        text.style.display ="none";
        textright.style.display ="none";
        lefttext.style.display = "none";
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
      var sound = new Audio('img/audio1.wav');
      sound.play();
        statusDisplay.innerHTML = drawMessage();
        let lefttext = document.getElementById('text-left');
        let righttext = document.getElementById('text-right');
        let text = document.getElementById('text');
        let status = document.getElementById('status');
        let body = document.getElementById('body')
        let table=document.getElementById('game');
        table.style.display="none";
        status.style.color = "rgb(0 231 255)";
        text.style.display="none";
        body.style.background = "url('img/bg.png')";
        righttext.style.display ="none";
        lefttext.style.display = "none";
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
// var box =   document.querySelector('.box-0').innerHTML;
// console.log(box==="X");
// console.log(box==="");
// console.log(box==="O");
    var clickedCell = clickedCellEvent.target;
    var clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    
    // if(box===""){
    //   handleCellPlayed(document.querySelector('.box-0'), clickedCellIndex);
    //   console.log(document.querySelector('.box-0'));
    //   handlePlayerChange();
    //   // handleResultValidation();
    //   return;
    // }
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
  if(count===10) return;
  let status = document.getElementById('status');
  let lefttext = document.getElementById('text-left');
  let righttext = document.getElementById('text-right');
  let text = document.getElementById('text');
  let body = document.getElementById('body');
  body.style.background = "url('img/wood.jpg')";
  let table = document.getElementById('game');
  table.style.display = "grid";
  righttext.style.display ="block";
  lefttext.style.display = "block";
  text.style.display ="block";
  status.style.display = "#d7a62f";
    gameActive = true;
    currentPlayer = tick_X;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    count+=1;
    console.log('count',count);
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.getElementById('0').innerHTML = " ";
    document.getElementById('1').innerHTML = " ";
    document.getElementById('2').innerHTML = " ";
    document.getElementById('3').innerHTML = " ";
    document.getElementById('4').innerHTML = " ";
    document.getElementById('5').innerHTML = " ";
    document.getElementById('6').innerHTML = " ";
    document.getElementById('7').innerHTML = " ";
    document.getElementById('8').innerHTML = " ";
    
}


// document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame)
 document.querySelector('#body').addEventListener('click',handleCellClick); 

window.onscroll = () =>{

  let scroll = document.getElementById('0');
  // let textleft = document.getElementById('text-left');
  // let textright = document.getElementById('text-right');
  if (this.scrollY <= 100) {
    scroll.className = "cell";
    // textleft.className = "text-left";
    // textright.className = "text-right";
}else {
    scroll.className = "box-0";
    // document.querySelectorAll(`.${scroll.className}`).innerHTML = currentPlayer;
    // console.log(currentPlayer,scroll.className);
    // handlePlayerChange();
    // console.log(currentPlayer);
    // console.log(document.querySelector(`.${scroll.className}`));
    // handleCellClick(); 
    // textleft.className ="text-display";
    // textright.className ="text-left";
}

 let scroll1 = document.getElementById('1');
//  let textleft1 = document.getElementById('text-left');
//   let textright1 = document.getElementById('text-right');
 if(this.scrollY <= 150){
   scroll1.className = "cell";
  //  textleft1.className = "text-display";
  //   textright1.className = "text-left";
 }
 else{
  scroll.className = "cell"; 
   scroll1.className = "box-0";
  //  textleft1.className ="text-left";
  //  textright1.className ="text-right";
 }
 
 let scroll2 = document.getElementById('2');
//  let textleft2 = document.getElementById('text-left');
//  let textright2 = document.getElementById('text-right');
 if(this.scrollY <= 300){
   scroll2.className = "cell";
  //  textleft2.className = "text-left";
  //  textright2.className = "text-right";
 }
 else{
  scroll1.className = "cell";
   scroll2.className = "box-0";
  //  textleft2.className ="text-display";
  //  textright2.className ="text-left";
 }

 let scroll3 = document.getElementById('3');
//  let textleft3 = document.getElementById('text-left');
//   let textright3 = document.getElementById('text-right');
 if(this.scrollY <= 400){
   scroll3.className = "cell";
  //  textleft3.className = "text-display";
  //   textright3.className = "text-left";
 }
 else{
  // scroll.className = "cell";
  // scroll1.className = "cell";
  scroll2.className = "cell";
   scroll3.className = "box-0";
  //  textleft3.className ="text-left";
  //  textright3.className ="text-right";
 }

 let scroll4 = document.getElementById('4');
//  let textleft4 = document.getElementById('text-left');
//   let textright4 = document.getElementById('text-right');
 if(this.scrollY <= 600){
   scroll4.className = "cell";
  //  textleft4.className = "text-left";
  //   textright4.className = "text-right"
 }
 else{
  scroll3.className = "cell";
   scroll4.className = "box-0";
  //  textleft4.className ="text-display";
  //  textright4.className ="text-left";
 }

 let scroll5 = document.getElementById('5');
//  let textleft5 = document.getElementById('text-left');
//   let textright5 = document.getElementById('text-right');
 if(this.scrollY <= 700){
   scroll5.className = "cell";
  //  textleft5.className = "text-display";
  //   textright5.className = "text-left";
 }
 else{
  scroll4.className = "cell";
   scroll5.className = "box-0";
  //  textleft5.className ="text-left";
  //  textright5.className ="text-right";
 }
 let scroll6 = document.getElementById('6');
//  let textleft6 = document.getElementById('text-left');
//   let textright6 = document.getElementById('text-right');
 if(this.scrollY <= 800){
   scroll6.className = "cell";
  //  textleft6.className = "text-left";
  //  textright6.className = "text-right"
 }
 else{
   scroll5.className ="cell";
   scroll6.className = "box-0";
  //  textleft6.className ="text-display";
  //  textright6.className ="text-left";
 }
 let scroll7 = document.getElementById('7');
//  let textleft7 = document.getElementById('text-left');
//   let textright7 = document.getElementById('text-right');
 if(this.scrollY <= 950){
   scroll7.className = "cell";
  //  textleft7.className = "text-display";
  //   textright7.className = "text-left";
 }
 else{
   scroll6.className="cell";
   scroll7.className = "box-0";
  //  textleft7.className ="text-left";
  //  textright7.className ="text-right";
 }
 let scroll8 = document.getElementById('8');
//  let textleft8 = document.getElementById('text-left');
//   let textright8 = document.getElementById('text-right');
 if(this.scrollY <= 1100){
   scroll8.className = "cell";
  //  textleft8.className = "text-left";
  //  textright8.className = "text-right"
 }
 else{
   scroll7.className ="cell";
   scroll8.className = "box-0";
  //  textleft8.className ="text-display";
  //  textright8.className ="text-left";
 }
}
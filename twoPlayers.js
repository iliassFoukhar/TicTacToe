//To initialise the game
window.addEventListener("load", init);
//Variables of DOM
const zones = document.getElementsByClassName("zone");
const displayTurn = document.getElementsByClassName("turn");
const repeatButton = document.getElementsByClassName("repeat");
//Global variables
const plays = ["X", "O"];
var messages= [];
var player1 = "";
var player2 = "";
//turns variables
var turn = 0;
var whoseTurn = "";
var maxi =0;
//the variable related to the game stat
var stop = false;

//123 horizontal 456 vertical 7 8 diagonal
const winningArrays = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var winner = "None";
//to initialise the game
function init(){
  //Player's names
  player1 = prompt("What is the name of  player 1 ?", "Player 1");
  player2 = prompt("What is the name of  player 2 ?", "Player 2");
  messages= [player1 + "'s turn", player2+"'s turn"];
  //const messages= [player1 + "'s turn", player2+"'s turn"];
  //Repeat repeatButton
  repeatButton[0].style.display = "none";
  repeatButton[0].onclick = function(){
    location.reload();
  }
  turn = 0;
  // To pick randomly who's going to start
  let randomiser = Math.random();
  if(randomiser >= 0.4){
    whoseTurn = messages[0];
    turn = 0;
    maxi = 10;
  }
  else{
    whoseTurn = messages[1];
    turn = 0;
    maxi = 9;
    changePlayer();
  }
  // To display whose turn is it
  displayTurn[0].innerHTML = messages[turn%2];
  //The player's turn fct
  for(let i=0; i<zones.length; i++){
    zones[i].onclick =  function(){
      if(zones[i].className == "zone empty" && stop == false){
        zones[i].innerHTML = plays[turn%2];
        zones[i].classList.remove("empty");
        zones[i].classList.add(plays[turn%2].toString());
        check();
        if(stop == false)
        {
          changePlayer();
        }
      }
    };
  }
}
//to change the player
function changePlayer(){
  turn++;
  displayTurn[0].innerHTML = messages[turn%2];

}


function check(){
    let xs = [];
    let os = [];
    for(let i =0; i< zones.length; i++){
      if(zones[i].className=="zone O"){
        os.push(i);
      }
      else if(zones[i].className=="zone X"){
        xs.push(i);
      }
    }
    //123 horizontal 456 vertical 7 8 diagonal
    xs.sort(function(a, b){return a - b});
    os.sort(function(a, b){return a - b});
    for(let i =0; i<8; i++){
        if(xs.includes(winningArrays[i][0]) && xs.includes(winningArrays[i][1]) &&xs.includes(winningArrays[i][2]))
        {
          zones[winningArrays[i][0]].style.backgroundColor = "#0AB9E6";
          zones[winningArrays[i][1]].style.backgroundColor = "#0AB9E6";
          zones[winningArrays[i][2]].style.backgroundColor = "#0AB9E6";
          zones[winningArrays[i][0]].style.color = "white";
          zones[winningArrays[i][1]].style.color = "white";
          zones[winningArrays[i][2]].style.color = "white";
          gameOver();
        }

        if(os.includes(winningArrays[i][0]) && os.includes(winningArrays[i][1]) && os.includes(winningArrays[i][2]))
        {
          zones[winningArrays[i][0]].style.backgroundColor = "#0AB9E6";
          zones[winningArrays[i][1]].style.backgroundColor = "#0AB9E6";
          zones[winningArrays[i][2]].style.backgroundColor = "#0AB9E6";
          zones[winningArrays[i][0]].style.color = "white";
          zones[winningArrays[i][1]].style.color = "white";
          zones[winningArrays[i][2]].style.color = "white";
          gameOver();
        }
    }
    if(xs.length + os.length == 9&&winner =="None"){
      draw();
    }
}

function gameOver(){
  if(turn%2 ==0){
    winner = "Player";
    stop = true;
  }
  else{
    winner = "Computer";
    stop = true;
  }
  displayTurn[0].innerHTML = "The winner is "+ winner + "!";
  displayTurn[0].style.backgroundColor = "#FF3C28";
  repeatButton[0].style.display = "block";
}

function draw(){
  stop = true;
  displayTurn[0].innerHTML = "It's a draw !";
  displayTurn[0].style.backgroundColor = "#FF3C28";
  repeatButton[0].style.display = "block";
}

const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPositions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
        ]



function initGame(){
    currentPlayer = 'X';
    gameGrid = ["","","","","","","","",""];
    //ui
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
function swapTurn(){
    if(currentPlayer === 'X'){
        currentPlayer = 'O';
    } 
    else{
        currentPlayer = 'X';
    }
    
    
    //UI update as we have a winner
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
   let answer = "";
   winningPositions.forEach((position) => {
    if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){ 
            if(gameGrid[position[0]] === 'X'){
                answer = "X";
            } else{
                answer = "O";
            }
            //disable pointer event as winner was found
            boxes.forEach((box) => {
                box.style.pointerEvents = "none"
            })

            //now we have a winenr
            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")
        }
   })

   //now we have a winner because answer is not empty
   if(answer !== ""){
    gameInfo.innerText = `Winner Player - ${currentPlayer}`;
    newGameBtn.classList.add("active");
   }

//    check tie
   let fillCount = 0;
   gameGrid.forEach((box) => {
    if(box !== ""){
        fillCount++;
    }
   });
   //board is filled and tie
   if(fillCount === 9){
    gameInfo.innerText= "Game tied !";
    newGameBtn.classList.add("active")
   }


}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer; 
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click", ()=>{
        handleClick(index)
    })
})

initGame()

newGameBtn.addEventListener('click',initGame)
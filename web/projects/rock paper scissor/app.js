let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");
const userScorepara=document.querySelector("#user-score");
const compScorepara=document.querySelector("#comp-score");

const genCompChoice = () => {
  //randomly generate rock paper scissors
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};
const drawGame = () => {
  msg.innerText="Game Was Draw.Play Again";
  
    msg.style.backgroundColor="#081b31";
};

const showWinner = (userWin,userChoice,compChoice) => {
  if (userWin) {
    userScore++;
    userScorepara.innerText=userScore;
    
    msg.innerText=`You Win! Computer choses ${compChoice}`;
    msg.style.backgroundColor="green";
  } else {
    compScore++;
    compScorepara.innerText=compScore;
    
    msg.innerText=`You Lose Computer choses ${userChoice}`;
    msg.style.backgroundColor="red";
  }
};

const playGame = (userChoice) => {
 

  //generating computer choice
  const compChoice = genCompChoice();
 
  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
        //scissor,paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
        //rock,scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
        //rock,paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin,userChoice,compChoice);
  }
  
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const UserChoice = choice.getAttribute("id");
    playGame(UserChoice);
  });
});

//to reset the score
const resetButton = document.getElementById("button");

resetButton.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  console.log("Scores reset to 0");
  
  document.getElementById("user-score").textContent = userScore;
  document.getElementById("comp-score").textContent = compScore;
});

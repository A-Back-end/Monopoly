//import { gameClient } from './connect.js';
  
gameClient.start();


function onCorrectAnswer() {
  gameClient.moves.rollDice(); 
  updateUI();
}

function updateUI() {
  const G = gameClient.store.getState().G;
  const player = G.players[gameClient.playerID];
  moveTokenToPosition(player.pos);
}

function startGame() {
    document.getElementById("backgroundMusic").play();
  }
  function finishGame() {
    document.getElementById("backgroundMusic").pause();
    document.getElementById("backgroundMusic").currentTime = 0;
  }
  
  const board = document.getElementById("board");
  const boardSize = 10;
  const totalCells = boardSize * boardSize;
  const finalCell = totalCells - 1;
  
  const squareDescriptions = [
      "Start", "Bank", "Tax -$100", "Chance", "Jail", "Gift +$100", "Empty", "Fine -$50", "Invest", "Bonus +$50",
      "Shop", "Pay Rent", "Free Pass", "Gamble", "Luxury Tax -$200", "Gift +$100", "Loan Bank", "Empty", "Pay Fee -$20", "Win +$75",
      "Gas Bill -$60", "Gift +$30", "Take Loan", "Prize +$100", "Travel", "Empty", "Chance", "Empty", "Jail Visit", "Pay Fine -$40",
      "Hospital", "Tax -$70", "Bank Deposit", "Win +$120", "Empty", "Market", "Fine -$30", "Buy Stock", "Bonus +$80", "Empty",
      "Charity -$50", "Gift +$90", "Chance", "Pay Rent", "Bank Interest", "Empty", "Vacation", "Get +$200", "Empty", "Lose -$60",
      "Pay Utility", "Win +$150", "Empty", "Buy Property", "Empty", "Chance", "Pay Fine", "Get Bonus", "Empty", "Buy Bond",
      "Bank", "Gift", "Hospital", "Jail", "Fine", "Free Turn", "Donate", "Prize", "Empty", "Bonus +$100",
      "Start Over", "Buy Asset", "Lose -$100", "Double Turn", "Market Crash", "Win +$50", "Jail", "Pay Debt", "Invest", "Empty",
      "Hospital Bill", "Tax", "Stock Market", "Spin", "Jackpot", "Thief", "Sell Land", "Get +$70", "Pay Tax", "Bonus +$30",
      "Empty", "Gift", "Bank", "Vacation", "Random", "Pay Toll", "Empty", "Extra Turn", "Lose -$80", "Final Prize +$500"
  ];
  squareDescriptions[0] = "Start";
  squareDescriptions[4] = "Jail -$200";
  squareDescriptions[9] = "Bonus +$50";
  squareDescriptions[finalCell] = "🏁 Finish";
  
  const snakePath = [];
  for (let row = 0; row < boardSize; row++) {
      const rowCells = [];
      for (let col = 0; col < boardSize; col++) {
          const actualCol = row % 2 === 0 ? col : boardSize - col - 1;
          rowCells.push(row * boardSize + actualCol);
      }
      snakePath.push(...rowCells);
  }
  
  for (let i = 0; i < totalCells; i++) {
      const cellIndex = snakePath[i];
      const square = document.createElement("div");
      square.className = "square";
      square.id = `square-${cellIndex}`;
      square.innerHTML = `<span>${squareDescriptions[cellIndex]}</span>`;
      board.appendChild(square);
  }
  
  const rainbowColors = ["red", "orange", "yellow", "green", "blue", "violet", "cyan", "lime", "pink"];
  let players = [];
  let currentIndex = 0;
  let canRoll = false;
  
  function addPlayer() {
      const name = document.getElementById("newPlayerName").value.trim();
      if (!name) return;
      const color = rainbowColors[players.length % rainbowColors.length];
      players.push({ name, color, position: 0, offset: players.length * 14, money: 1000 });
      document.getElementById("newPlayerName").value = "";
      drawPlayers();
  }
  
  window.addEventListener("DOMContentLoaded", () => {
      const storedPlayers = localStorage.getItem("monopolyPlayers");
      if (storedPlayers) {
          const playerNames = JSON.parse(storedPlayers);
          playerNames.forEach((name, index) => {
              const color = rainbowColors[index % rainbowColors.length];
              players.push({ name, color, position: 0, offset: index * 14, money: 1000 });
          });
          drawPlayers();
      }
  });
  
  function drawPlayers() {
      document.querySelectorAll('.player-dot').forEach(dot => dot.remove());
      players.forEach(player => {
          const square = document.getElementById(`square-${snakePath[player.position]}`);
          if (square) {
              const dot = document.createElement("div");
              dot.className = "player-dot";
              dot.style.backgroundColor = player.color;
              dot.style.bottom = (2 + player.offset % 30) + "px";
              dot.style.left = (2 + player.offset % 30) + "px";
              square.appendChild(dot);
          }
      });
      updatePlayerList();
  }
  
  function updatePlayerList() {
      const list = document.getElementById("playerList");
      list.innerHTML = "";
      players.forEach(player => {
          const item = document.createElement("li");
          item.innerText = `${player.name} — Cell: ${snakePath[player.position]} — $${player.money}`;
          list.appendChild(item);
      });
      document.getElementById("currentPlayerName").innerText = players.length > 0 ? players[currentIndex].name : "None";
  }
  
  const questions = [
    { question: "What is √81?", answers: ["9", "8"], correct: 0 },
    { question: "The area of a circle is calculated using the formula:", answers: ["πr²", "2πr"], correct: 0 },
    { question: "Which is greater: 2⁴ or 4²?", answers: ["2⁴", "4²"], correct: 1 },
    { question: "What is the sum of the angles in a triangle?", answers: ["180°", "360°"], correct: 0 },
    { question: "What is the derivative of the function y = x²?", answers: ["2x", "x"], correct: 0 },
    { question: "Which device measures electric current?", answers: ["Ammeter", "Voltmeter"], correct: 0 },
    { question: "What is the SI unit of energy?", answers: ["Joule", "Newton"], correct: 0 },
    { question: "What is Newton's third law called?", answers: ["Action equals reaction", "More mass means more inertia"], correct: 0 },
    { question: "Sound travels faster in:", answers: ["Solid", "Gas"], correct: 0 },
    { question: "What happens at absolute zero temperature?", answers: ["All molecules freeze", "Thermal motion stops"], correct: 1 },
    { question: "Which gas is released during a reaction between acids and metals?", answers: ["Hydrogen", "Oxygen"], correct: 0 },
    { question: "How is water represented in chemistry?", answers: ["H₂O", "HO₂"], correct: 0 },
    { question: "What is the pH of a neutral solution?", answers: ["pH 2", "pH 7"], correct: 1 },
    { question: "What is formed when carbon burns?", answers: ["CO₂", "H₂O"], correct: 0 },
    { question: "Which element is represented by the symbol Fe?", answers: ["Fluorine", "Iron"], correct: 1 },
    { question: "What is the basic unit of life?", answers: ["Cell", "Cell"], correct: 0 },
    { question: "Which organ filters blood in the human body?", answers: ["Kidneys", "Lungs"], correct: 0 },
    { question: "Which organisms have no nucleus?", answers: ["Bacteria", "Fungi"], correct: 0 },
    { question: "Which organ controls coordination of movements?", answers: ["Heart", "Cerebellum"], correct: 1 },
    { question: "Which process takes place in chloroplasts?", answers: ["Photosynthesis", "Circulation"], correct: 0 },
    { question: "What is the longest river in the world?", answers: ["Nile", "Amazon"], correct: 1 },
    { question: "Where is Mount Everest located?", answers: ["Asia", "South America"], correct: 0 },
    { question: "Which country spans two continents?", answers: ["Russia", "India"], correct: 0 },
    { question: "What is the capital of Canada?", answers: ["Toronto", "Ottawa"], correct: 1 },
    { question: "What is the largest desert?", answers: ["Antarctica", "Sahara"], correct: 0 },
    { question: "Who was the first president of the USA?", answers: ["George Washington", "Abraham Lincoln"], correct: 0 },
    { question: "In what year did World War II begin?", answers: ["1939", "1941"], correct: 0 },
    { question: "Where was Napoleon born?", answers: ["Corsica", "Paris"], correct: 0 },
    { question: "In what year did the USSR collapse?", answers: ["1992", "1991"], correct: 1 },
    { question: "Who was the khan of the Golden Horde in the 13th century?", answers: ["Batu Khan", "Genghis Khan"], correct: 0 }
  ];
  
  let currentQuestion;
  
  
  function askQuestion() {
      if (players.length === 0) return;
      currentQuestion = questions[Math.floor(Math.random() * questions.length)];
  
      const questionText = document.getElementById("questionText");
      const answerButtons = document.getElementById("answerButtons");
  
      questionText.innerText = currentQuestion.question;
      answerButtons.innerHTML = "";
  
      currentQuestion.answers.forEach((answer, index) => {
          const button = document.createElement("button");
          button.innerText = answer;
          button.className = "answer-button";
          button.onclick = () => checkAnswer(index);
          answerButtons.appendChild(button);
      });
  
      document.getElementById("questionModal").style.display = "block";
  }
  function checkAnswer(selectedIndex) {
      const player = players[currentIndex];
      const isCorrect = selectedIndex === currentQuestion.correct;
      const resultText = document.getElementById("resultText");
  
      if (isCorrect) {
          player.money += 100;
          resultText.innerText = `${player.name}, Correct! +$100`;
          drawPlayers();
          setTimeout(() => {
              document.getElementById("questionModal").style.display = "none";
              document.getElementById("resultText").innerText = "";
              rollDice();  
          }, 1000);
      } else {
          player.money -= 50;
          resultText.innerText = `${player.name}, Incorect. -$50`;
          drawPlayers();
          setTimeout(() => {
              document.getElementById("questionModal").style.display = "none";
              document.getElementById("resultText").innerText = "";
              nextTurn();  
          }, 1000);
      }
  }
  
  
  function nextTurn() {
      currentIndex = (currentIndex + 1) % players.length;
      updatePlayerList();
      canRoll = true;
  }
  
  function rollDice() {
      if (players.length === 0) return;
      const roll = Math.floor(Math.random() * 6) + 1;
      const player = players[currentIndex];
      player.position = Math.min(player.position + roll, totalCells - 1);
      const cellDesc = squareDescriptions[snakePath[player.position]];
      handleCellEvent(player, cellDesc);
  }
  
  canRoll = true;
  rollDice()
  
  
  function handleCellEvent(player, text) {
      if (text.includes("+$")) {
          const amount = parseInt(text.match(/\+\$(\d+)/)?.[1] || 0);
          player.money += amount;
          drawPlayers();
          nextTurn();
      } else if (text.includes("-$")) {
          const amount = parseInt(text.match(/-\$(\d+)/)?.[1] || 0);
          showPopup(text, `Pay $${amount} or skip next turn.`, () => {
              player.money -= amount;
              drawPlayers();
              nextTurn();
          }, nextTurn);
      } else if (text.includes("Jail")) {
          showPopup("🚓 Jail Time", `${player.name}, you landed in Jail! Pay $100 to get out or skip your next turn.`, () => {
              player.money -= 100;
              drawPlayers();
              nextTurn();
          }, () => {
              nextTurn();
          });
      } else if (text.includes("Buy") || text.includes("Invest") || text.includes("Property") || text.includes("Asset")) {
  
          askBuyQuestion(player);
      } else if (text.includes("Finish")) {
          document.getElementById("finishPopup").style.display = "block";
          document.getElementById("winnerMessage").innerText = `${player.name} has won the game! 🎉`;
          finishGame();
      } else {
          drawPlayers();
          nextTurn();
      }
  }
  
  function askBuyQuestion(player) {
      currentQuestion = questions[Math.floor(Math.random() * questions.length)];
  
      const questionText = document.getElementById("questionText");
      const answerButtons = document.getElementById("answerButtons");
  
      questionText.innerText = `${player.name}, to buy, answer the question:\n\n${currentQuestion.question}`;
      answerButtons.innerHTML = "";
  
      currentQuestion.answers.forEach((answer, index) => {
          const button = document.createElement("button");
          button.innerText = answer;
          button.className = "answer-button";
          button.onclick = () => {
              const isCorrect = index === currentQuestion.correct;
              if (isCorrect) {
                  player.money -= 150; 
                  resultText.innerText = `The purchase was successful! -$150`;
              } else {
                  resultText.innerText = `Incorect. You miss 2 moves.`;
                  player.skipTurns = 2;
              }
              drawPlayers();
              setTimeout(() => {
                  document.getElementById("questionModal").style.display = "none";
                  document.getElementById("resultText").innerText = "";
                  nextTurn();
              }, 2000);
          };
          answerButtons.appendChild(button);
      });
  
      document.getElementById("questionModal").style.display = "block";
  }
  
  function nextTurn() {
      do {
          currentIndex = (currentIndex + 1) % players.length;
      } while (players[currentIndex].skipTurns && --players[currentIndex].skipTurns > 0);
  
      updatePlayerList();
      canRoll = true;
  }
  
  function showPopup(title, message, payCallback, skipCallback) {
      document.getElementById("popupTitle").innerText = title;
      document.getElementById("popupMessage").innerText = message;
      document.getElementById("eventPopup").style.display = "block";
      document.getElementById("overlay").style.display = "block";
  
      document.querySelector("#eventPopup button:nth-of-type(1)").onclick = () => {
          document.getElementById("eventPopup").style.display = "none";
          document.getElementById("overlay").style.display = "none";
          payCallback();
      };
  
      document.querySelector("#eventPopup button:nth-of-type(2)").onclick = () => {
          document.getElementById("eventPopup").style.display = "none";
          document.getElementById("overlay").style.display = "none";
          skipCallback();
      };
  }
  
  function endGame(winner) {
    alert(`${winner.name} won the game!`);
  
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  
  }

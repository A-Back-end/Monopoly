const players = [];

    function addPlayer() {
      const input = document.getElementById("playerNameInput");
      const name = input.value.trim();
      if (name) {
        players.push(name);
        updatePlayerList();
        input.value = "";
      }
    }

function updatePlayerList() {
    const list = document.getElementById("playerList");
      list.innerHTML = "";
      players.forEach((name, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${name}`;
        list.appendChild(li);
      });
}

function startGame() {
      if (players.length < 1) {
        alert("Add at least one player!");
        return;
      }
      localStorage.setItem("monopolyPlayers", JSON.stringify(players));
      window.location.href = "game.html";
}

    function toggleInstructions() {
      const panel = document.getElementById("instructionPanel");
      panel.classList.toggle("open");
}
# 🎲 Monopoly Lite
Monopoly Lite is a browser-based multiplayer game inspired by the classic Monopoly, but with an educational twist. Before each turn, the player must correctly answer a question on school subjects such as mathematics, physics, or chemistry. Only after giving the right answer does the player get to roll the dice and move their token.

# Installation and launch instructions

# Installation (local)

```
1. Clone the repositories:
bash
git clone https://github.com/your-username/monopoly-lite.git
monopoly-lite CD


2. Install dependencies:
pip install -r requirements.txt

3. Start the Flask server:
python app.py

4. Open the game in your browser
http://localhost:5000
```

# Description of design and development

-The server is written in Flash with Socket support.IO for real-time communication.
-The client is implemented using HTML, CSS, and JavaScript. 
-Implemented in a separate Game class that controls players, movement on the field, purchases, rentals, and random events
-Modern UI with pop-up quizzes, action log, display of players' chips and their balance.

# Unique approaches

-The player must answer a random question from school subjects before each turn. Only if the answer is correct will they be allowed to roll the dice and make a move.
-There is no need for a database for MVP.
-The game state is instantly synchronized for all players.
-Divided the website into two sections: the first includes the introduction and player addition, while the second displays the game board (Monopoly map).


# Discussion of trade-offs made during development

-player data is lost after the server is restarted.
-Advanced Monopoly features like mortgages, auctions, and upgrade cards are not yet implemented in the game
-Any user can create a room and play, there is no verification.

# ❌ Description of known errors or problems in the application 

-Synchronization issues may occur when the connection is lost.
-Sometimes the token doesn't visually move, even though its coordinates are updated.
-The interface is not fully optimized for mobile devices.
-Reconnecting to a room does not restore the player's previous state.

# Explain why you chose this technical stack 

-Python + Flask: I think it is one of the minimalist and flexible server-side framework that is easy to configure and extend.
-Flask-SocketIO: it enables real-time interaction between players.
-HTML, CSS, JavaScript (Vanilla): I chose web-dev tools because their interface is easy to customize and can be made more vibrant. Additionally, I have more experience with these than with Python itself.













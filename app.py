from flask import Flask, render_template, redirect, url_for, request, session
from flask_socketio import SocketIO, emit, join_room
import random



app = Flask(__name__)
app.secret_key = 'your-secret-key'
socketio = SocketIO(app)

rooms = {}

class Property:
    def __init__(self, name, cost, rent):
        self.name = name
        self.cost = cost
        self.rent = rent
        self.owner = None

class Player:
    def __init__(self, name):
        self.name = name
        self.position = 0
        self.money = 1500

class Game:
    def __init__(self):
        self.players = []
        self.board = [
            Property("Go", 0, 0),
            Property("Street 1", 100, 10),
            Property("Street 2", 120, 12),
            Property("Chance", 0, 0),
            Property("Street 3", 150, 15),
            Property("Tax", 0, 0)
        ] * 4  
        self.current_turn = 0

    def add_player(self, name):
        self.players.append(Player(name))

    def roll_dice(self):
        return random.randint(1, 6)

    def move_player(self, name):
        player = next((p for p in self.players if p.name == name), None)
        if player:
            dice = self.roll_dice()
            player.position = (player.position + dice) % len(self.board)
            tile = self.board[player.position]
            return {
                'player': player.name,
                'dice': dice,
                'position': player.position,
                'tile': tile.name,
                'money': player.money
            }

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/create_room', methods=['POST'])
def create_room():
    room_code = str(random.randint(1000, 9999))
    rooms[room_code] = Game()
    session['room'] = room_code
    return redirect(url_for('game_room', room_code=room_code))

@app.route('/join_room', methods=['POST'])
def join_room_view():
    room_code = request.form['room']
    session['room'] = room_code
    return redirect(url_for('game_room', room_code=room_code))

@app.route('/room/<room_code>')
def game_room(room_code):
    return render_template('game.html', room_code=room_code)

@app.route('/about')
def about():
    return render_template('about.html')

@socketio.on('join')
def on_join(data):
    room = data['room']
    name = data['name']
    join_room(room)
    game = rooms.get(room)
    if game:
        game.add_player(name)
        emit('update', {'players': [p.name for p in game.players]}, room=room)

@socketio.on('roll')
def on_roll(data):
    room = data['room']
    name = data['name']
    game = rooms.get(room)
    if game:
        result = game.move_player(name)
        emit('rolled', result, room=room)

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    socketio.run(app, host='0.0.0.0', port=port)

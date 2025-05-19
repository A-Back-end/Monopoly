import random

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

class MonopolyGame:
    def __init__(self):
        self.players = []
        self.current_player = 0
        self.board = [
            Property("Go", 0, 0),
            Property("Mediterranean Ave", 60, 2),
            Property("Community Chest", 0, 0),
            Property("Baltic Ave", 60, 4),
            Property("Income Tax", 0, 0),
            Property("Reading Railroad", 200, 25)
        ]

    def add_player(self, name):
        if name and all(p.name != name for p in self.players):
            self.players.append(Player(name))

    def roll_dice_and_move(self):
        if not self.players:
            return
        dice = random.randint(1, 6) + random.randint(1, 6)
        player = self.players[self.current_player]
        player.position = (player.position + dice) % len(self.board)

        current_tile = self.board[player.position]
        if current_tile.cost > 0 and current_tile.owner and current_tile.owner != player:
            player.money -= current_tile.rent
            current_tile.owner.money += current_tile.rent

        self.current_player = (self.current_player + 1) % len(self.players)

    def buy_property(self):
        player = self.players[self.current_player]
        tile = self.board[player.position]
        if tile.cost > 0 and tile.owner is None and player.money >= tile.cost:
            player.money -= tile.cost
            tile.owner = player

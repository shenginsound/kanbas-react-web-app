import tkinter as tk 
from tkinter import messagebox  
from ai1 import AI 
from ai2 import AI2 
from checkline import CheckLine 

# Definition of Gomoku
class GomokuGame:
    def __init__(self):
        # 初始化棋盘参数
        self.BOARD_SIZE = 15  # The number of grid spaces on the board
        self.CELL_SIZE = 40  # The size of each grid space
        self.CHESS_RADIUS = 18  # The radius of a game piece
        self.CHESSBOARD_COLOR = "#DDD"  # The color of the board.
        self.CHESS_COLOR_FIRST = "black"  # The color of the first player's pieces
        self.CHESS_COLOR_SECOND = "white"  # 后手棋子颜色
        self.latest_ai_heart = None  # Recording the last move made by the AI, used for drawing markers.
        self.first = 1  # The first player; 1 indicates that the AI plays first.
        self.algorithm = 0  # The current algorithm selected
        # Create a board matrix where 0 represents an empty position
        self.board = [[0 for _ in range(self.BOARD_SIZE)] for _ in range(self.BOARD_SIZE)]
        self.start = 1  # Keep track of whose turn it is; 1 indicates it's the AI's turn.
        self.ending = False  # Game over flag
        # Eight directional vectors used for line checking.
        self.dx = [1, 1, 0, -1, -1, -1, 0, 1]
        self.dy = [0, 1, 1, 1, 0, -1, -1, -1]
        self.ai = 1  # The numerical representation of the AI on the board.
        
        # Create an instance for line checking
        self.cl = CheckLine(self)
        # Create two instances of AI algorithms.
        self.AI = AI(self)
        self.AI2 = AI2(self)

        # Create a GUI window
        self.root = tk.Tk()
        self.root.title("gobang")  # Set the window title
        # Calculate the canvas size and create a canvas
        self.canvas_width = self.CELL_SIZE * (self.BOARD_SIZE - 1) + self.CELL_SIZE
        self.canvas_height = self.CELL_SIZE * (self.BOARD_SIZE - 1) + self.CELL_SIZE
        self.canvas = tk.Canvas(self.root, width=self.canvas_width, height=self.canvas_height, bg=self.CHESSBOARD_COLOR)
        self.canvas.pack(side=tk.TOP)  # Calculate the canvas size and create a canvas
        # Initialize the GUI
        self.draw_board()
        self.init_ui()
        # Bind the mouse click event to the chessboard's click handling function
        self.canvas.bind("<Button-1>", self.canvas_click)

    def draw_board(self):
        # Draw the lines of the chessboard on the canvas.
        for i in range(self.BOARD_SIZE):
            # draw the horizontal lines of the chessboard on a canvas
            self.canvas.create_line(self.CELL_SIZE / 2, self.CELL_SIZE / 2 + i * self.CELL_SIZE,
                                    self.CELL_SIZE / 2 + (self.BOARD_SIZE - 1) * self.CELL_SIZE, self.CELL_SIZE / 2 + i * self.CELL_SIZE)
            # raw the vertical lines of the chessboard on a canvas
            self.canvas.create_line(self.CELL_SIZE / 2 + i * self.CELL_SIZE, self.CELL_SIZE / 2,
                                    self.CELL_SIZE / 2 + i * self.CELL_SIZE, self.CELL_SIZE / 2 + (self.BOARD_SIZE - 1) * self.CELL_SIZE)
    
    def canvas_click(self, event):
        # handle mouse click events on a chessboard in a Tkinter canvas,
        #  handle the scenario where the game has ended or it's not the player's turn when processing a mouse click event on the chessboard canvas
        if self.ending or self.start != 2:
            return
        # Calculate the checkerboard grid corresponding to the click position
        x, y = event.x, event.y
        row, col = round((y - self.CELL_SIZE / 2) / self.CELL_SIZE), round((x - self.CELL_SIZE / 2) / self.CELL_SIZE)
        # Perform player actions
        self.player_operat(row, col)

    def init_ui(self):
        # Initialize user interface elements
        # Create and place hint labels for selection algorithms
        self.algorithm_label = tk.Label(self.root, text="Please select an algorithm", font=("Arial", 16))
        self.algorithm_label.pack(side=tk.TOP)
        # Create a button frame for the selection algorithm
        algo_frame = tk.Frame(self.root)
        algo_frame.pack(side=tk.TOP, pady=(10, 0))
        # Create and place two buttons to select the algorithm
        algo_button1 = tk.Button(algo_frame, text="Algorithm 1", command=lambda: self.select_algorithm("Algorithm 1"))
        algo_button1.pack(side=tk.LEFT, padx=10)
        algo_button2 = tk.Button(algo_frame, text="Algorithm 2", command=lambda: self.select_algorithm("Algorithm 2"))
        algo_button2.pack(side=tk.RIGHT, padx=10)
        # Initialize game control buttons
        self.init_buttons()

    def select_algorithm(self, algo):
        # Processing functions when selecting algorithms
        # Adjust the label display according to the selected algorithm and set the algorithm flag
        if algo == "Algorithm 1":
            self.algorithm = 1
            self.algorithm_label.config(text=f"Algorithm : minimax + IDS")
        else:
            self.algorithm = 2
            self.algorithm_label.config(text=f"Algorithm : minimax + α-β")
        # After selecting the algorithm, enable the AI  Go First and Player Go First buttons.
        self.ai_button.config(state=tk.NORMAL)
        self.player_button.config(state=tk.NORMAL)

    def init_buttons(self):
        # Initialize bottom control buttons
        frame_buttons = tk.Frame(self.root)
        frame_buttons.pack(side=tk.BOTTOM, fill=tk.X)
        # Create and place buttons to restart and exit the game
        restart_button = tk.Button(frame_buttons, text="restart", command=self.restart)
        restart_button.pack(side=tk.LEFT)
        quit_button = tk.Button(frame_buttons, text="exit", command=self.root.quit)
        quit_button.pack(side=tk.RIGHT)
        # Create and place buttons to select AI first and player first. The initial state is unavailable.
        self.ai_button = tk.Button(frame_buttons, text="AI first", state=tk.DISABLED, command=lambda: self.ini_player(1))
        self.ai_button.pack(side=tk.LEFT)
        self.player_button = tk.Button(frame_buttons, text="Player first", state=tk.DISABLED, command=lambda: self.ini_player(2))
        self.player_button.pack(side=tk.RIGHT)

    def ini_player(self, side):
        # Initialize settings for player first or AI first
        self.start = side
        self.first = side
        # Call corresponding AI operations based on algorithm selection and the first mover
        if self.start == 1:
            if self.algorithm == 1:
                self.AI.ai_operat()
            else:
                self.AI2.ai_operat()
        # Disable first move selection button after selecting first mover
        self.ai_button.config(state=tk.DISABLED)
        self.player_button.config(state=tk.DISABLED)

    def drawing_piece(self, row, col):
        # Draw a chess piece at a specified location
        x, y = col * self.CELL_SIZE + self.CELL_SIZE / 2, row * self.CELL_SIZE + self.CELL_SIZE / 2
        # Choose the color of the chess piece according to the current round
        color = self.CHESS_COLOR_FIRST if self.start == self.first else self.CHESS_COLOR_SECOND
        # Draw chess pieces
        self.canvas.create_oval(x - self.CHESS_RADIUS, y - self.CHESS_RADIUS, x + self.CHESS_RADIUS, y + self.CHESS_RADIUS, fill=color)
        self.board[row][col] = 1 if self.start == 1 else 2
        # If it is an AI move, draw a mark
        if self.start == 1:
            heart_size = 2
            self.latest_ai_heart = self.canvas.create_oval(x - heart_size, y - heart_size, x + heart_size, y + heart_size, fill="red")
        # Check if the game is over and pop up the winning message
        if self.cl.gameOver(row, col): 
            self.ending = True 
            winner = "AI" if self.start == 1 else "Player"
            messagebox.showinfo("Game over.", f"{winner} Winning") 
        # Change round
        if self.start == 1:
            self.start = 2
        else:
            self.AI.ai_operat()

    def restart(self):
        # Reset game state
        self.canvas.delete("all")  # Clear all elements on the canvas
        self.draw_board()  # Redraw the chessboard
        self.board = [[0 for _ in range(self.BOARD_SIZE)] for _ in range(self.BOARD_SIZE)]  # Reset board data
        self.ending = False  # Reset game over flag
        self.start = None  # Reset current round party
        # Disable AI initiative and player initiative buttons, waiting for algorithm selection
        self.ai_button.config(state=tk.DISABLED)
        self.player_button.config(state=tk.DISABLED)
        self.algorithm_label.config(text="Please select an algorithm")  # Reset algorithm selection prompt label

    def player_operat(self, row, col):
        # player moves
        # Check if the player's move legal or not
        if 0 <= row < self.BOARD_SIZE and 0 <= col < self.BOARD_SIZE and self.board[row][col] == 0:
            self.drawing_piece(row, col)  # draw the piece
            self.root.update()  # update theInterface
            self.start = 1  # move to the AI turn
            self.AI.ai_operat()  # call AI

if __name__ == "__main__":
    game = GomokuGame()
    game.root.mainloop()  # Activate GUI Loop

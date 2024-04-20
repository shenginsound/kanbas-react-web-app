# minimax + IDS
# import checkline
from checkline import CheckLine

class AI:
    def __init__(self, game):
        # Initialize the board game and define the variable
        self.game = game
        # Build CheckLine instance, in order to check examine the connection of chess pieces.
        self.cl = CheckLine(self)

    # AI操作的主函数
    def ai_operat(self):
        # If the game has ended or it's not the AI's turn, return directly.
        if self.game.ending or self.game.start != 1:
            return
        # Remove the marker of the last AI move if it exists.
        if self.game.latest_ai_heart is not None:
            self.game.canvas.delete(self.game.latest_ai_heart)
            self.game.latest_ai_heart = None
        # Perform iterative deepening search.
        self.IDS()
        # Set the game state after AI's move
        self.game.start = 2

    # Iterative Deepening Search (IDS) method
    def IDS(self):
        # Iterate from depth 1 to depth 4
        for depth in range(1, 5):
            # Initialize the maximum score to a very small value
            self.game.L1_max = -100000
            # Invoke depth search; break the loop if a suitable move is found.
            if self.depth_search(depth):
                break

    # 深度搜索方法
    def depth_search(self, depth, current_depth=0):
        # If the current depth equals the target depth, return False
        if current_depth == depth:
            return False
        # If the position (7, 7) is empty and it's the AI's first move, then AI places a piece directly at (7, 7)."
        if self.game.board[7][7] == 0 and self.game.first == self.game.ai and current_depth == 0:
            self.game.drawing_piece(7, 7)
            return True
        # Initialize the best move position
        pawns_i, pawns_j = -1, -1
        # Iterate board
        for x in range(16):
            for y in range(16):
                # Skip invalid positions.
                if not self.game.cl.checkCorrect(x, y):
                    continue
                # Attempt to place a piece at the position (x, y)
                self.game.board[x][y] = self.game.ai
                # Retrieve the score of this position
                flag = self.getScore(x, y)
                # If the score is 0, undo the move and continue trying
                if flag == 0:
                    self.game.board[x][y] = 0
                    continue
                # If the score is 10000, it means winning the game directly; place the piece immediately
                if flag == 10000:
                    self.game.drawing_piece(x, y)
                    return True
                # If the target depth has not been reached, recursively call the depth search
                if current_depth + 1 < depth:
                    if self.depth_search(depth, current_depth + 1):
                        return True
                else:  # Otherwise, call the second layer search
                    flag = self.Layer2()
                # Undo the move
                self.game.board[x][y] = 0
                # Update the best move position
                if flag > self.game.L1_max:
                    self.game.L1_max = flag
                    pawns_i, pawns_j = x, y
        # If the best move position is found, place the piece at that position
        if pawns_i != -1 and pawns_j != -1:
            self.game.drawing_piece(pawns_i, pawns_j)
            return True
        # If not found, return False
        return False

    # Second layer search method (minimax)
    def Layer2(self):
        # Initialize the minimum score to a very large value
        self.game.L2_min = 100000
        for x in range(15):
            for y in range(15):
                # Skip invalid positions
                if not self.game.cl.checkCorrect(x, y):
                    continue
                # Attempt to place an opponent's piece at position (x, y)
                self.game.board[x][y] = 3 - self.game.ai
                # Retrieve the score of this position
                flag = self.getScore(x, y)
                # If the score is 0, undo the move and continue trying
                if flag == 0:
                    self.game.board[x][y] = 0
                    continue
                # If the score is 10000, it means the opponent wins the game directly; undo the move and return -10000
                if flag == 10000:
                    self.game.board[x][y] = 0
                    return -10000
                # Invoke the third layer search
                flag = self.Layer3(flag)
                # If the score from the third layer search is less than the maximum score of the first layer, undo the move and return -10000
                if flag < self.game.L1_max:
                    self.game.board[x][y] = 0
                    return -10000
                # Undo the move
                self.game.board[x][y] = 0
                # Update the minimum score
                if flag < self.game.L2_min:
                    self.game.L2_min = flag
        return self.game.L2_min

    # Third layer search method
    def Layer3(self, p2):
        # Initialize the score to a very small value.
        pawns = -100000
        for x in range(15):
            for y in range(15):
                # Skip invalid positions
                if not self.game.cl.checkCorrect(x, y):
                    continue
                # Attempt to place a piece at position (x, y)
                self.game.board[x][y] = self.game.ai
                # Retrieve the score of this position.
                flag = self.getScore(x, y)
                # If the score is 0, undo the move and continue trying
                if flag == 0:
                    self.game.board[x][y] = 0
                    continue
                # f the score is 10000, it means winning the game directly. Undo the move and return 10000
                if flag == 10000:
                    self.game.board[x][y] = 0
                    return 10000
                # If the score minus twice the opponent's score is greater than the minimum score of the second layer, undo the move and return 10000
                if flag - p2 * 2 > self.game.L2_min:
                    self.game.board[x][y] = 0
                    return 10000
                # Undo the move
                self.game.board[x][y] = 0
                # Update the highest score
                if flag - p2 * 2 > pawns:
                    pawns = flag - p2 * 2
        return pawns

    # Scoring method
    def getScore(self, x, y):
        # If the position (x, y) is prohibited, return a score of 0
        if self.game.cl.prohibit(x, y):
            return 0
        # If placing a piece at position (x, y) ends the game, set the game ending flag to False and return a score of 10000
        if self.game.cl.gameOver(x, y):
            self.game.ending = False
            return 10000
        # Calculate the score: 4-in-a-row score * 1000 + (number of 4-in-a-row + number of 3-in-a-row) * 100
        pawns = self.game.cl.fourRow(x, y) * 1000 + (self.game.cl.numberTofour(x, y) + self.game.cl.threeRow(x, y)) * 100
        # Check the surroundings in eight directions
        for u in range(8):
            if self.game.cl.borderInspect(x + self.game.dx[u], y + self.game.dy[u]) and self.game.board[x + self.game.dx[u]][y + self.game.dy[u]] != 0:
                # If there's a piece nearby, increase the score by one."
                pawns += 1
        return pawns

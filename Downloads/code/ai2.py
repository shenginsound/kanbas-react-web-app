# minimax + α-β
from checkline import CheckLine


class AI2:

    def __init__(self, game):
        # Initialize the board game and define the variable
        self.game = game
        # Build CheckLine instance, in order to check examine the connection of chess pieces.
        self.cl = CheckLine(self)

    # Main control function for AI operations
    def ai_operat(self):
        # If the game is over or it's not the AI's turn, return directly
        if self.game.ending or self.game.start != 1:
            return
        # If it exists, remove the last AI's marker
        if self.game.latest_ai_heart is not None:
            self.game.canvas.delete(self.game.latest_ai_heart)
            self.game.latest_ai_heart = None
        # Start executing the first layer search
        self.Layer1()
        self.game.start = 2

    # Calculate the score of a specific position on the board
    def getScore(self, x, y):
        # If the position (x, y) is forbidden, return a score of 0.
        if self.game.cl.prohibit(x, y):
            return 0
        # If placing a piece results in the game ending, set the game ending flag to False and return a score of 10000
        if self.game.cl.gameOver(x, y):
            self.game.ending = False
            return 10000
        # Calculate the score: score for forming a line of 4 pieces * 1000 + (score for forming a line of 4 pieces + score for forming a line of 3 pieces) * 100
        pawns = self.game.cl.fourRow(x, y) * 1000 + (self.game.cl.numberTofour(x, y) + self.game.cl.threeRow(x, y)) * 100
        # Check the eight surrounding directions
        for u in range(8):
            if self.game.cl.borderInspect(x + self.game.dx[u], y + self.game.dy[u]) and self.game.board[x + self.game.dx[u]][y + self.game.dy[u]] != 0:
                pawns += 1  # If there are pieces around, increase the score by one
        return pawns

    def Layer1(self):
        # Initialize the maximum score for the first layer
        self.game.L1_max = -100000
        alpha = -100000  # Initialize the alpha value
        beta = 100000  # Initialize the beta value
        # If the center point is vacant and it's the AI's first move, place a piece directly in the center
        if self.game.board[7][7] == 0 and self.game.first == self.game.ai:
            self.game.drawing_piece(7, 7)
            return True
        # Initialize the best move position
        pawns_i, pawns_j = -1, -1
        for x in range(16):
            for y in range(16):
                # Determine if the move is legal
                if not self.game.cl.checkCorrect(x, y):
                    continue
                # Determine if the move is legal
                self.game.board[x][y] = self.game.ai
                flag = self.getScore(x, y)  # Get the score
                if flag == 0:  # The score is zero, undo the operation
                    self.game.board[x][y] = 0
                    continue
                if flag == 10000:  # Win directly, make the move
                    self.game.drawing_piece(x, y)
                    return True
                score = self.Layer2(alpha, beta)  # Enter the second layer of search
                self.game.board[x][y] = 0  # Undo the move
                # Update the maximum score and the best position
                if score > self.game.L1_max:
                    self.game.L1_max = score
                    pawns_i, pawns_j = x, y
                    alpha = max(alpha, score)  # 更新α值
        if pawns_i != -1 and pawns_j != -1:
            # Find the best move position and execute the move
            self.game.drawing_piece(pawns_i, pawns_j)
        return True

    # 第二层搜索
    def Layer2(self, alpha, beta):
        L2_min = 100000  # Initialize the minimum score
        for x in range(16):
            for y in range(16):
                # Check if the move position is out of bounds or invalid; skip the operation if it's invalid
                if not self.game.cl.checkCorrect(x, y):
                    continue
                # Attempt to make a move as the opponent
                self.game.board[x][y] = 3 - self.game.ai
                flag = self.getScore(x, y)
                if flag == 0:
                    self.game.board[x][y] = 0
                    continue
                if flag == 10000:  # If the opponent can win directly, undo the move and return the worst score
                    self.game.board[x][y] = 0
                    return -10000
                score = self.Layer3(alpha, beta)  # Enter the third layer of search
                self.game.board[x][y] = 0
                if score < L2_min:  # Update the minimum score and the beta value.
                    L2_min = score
                    beta = min(beta, score)
                if L2_min <= alpha:  # Satisfy the pruning condition, perform pruning
                    return L2_min
        return L2_min

    # 第三层搜索
    def Layer3(self, alpha, beta):
        pawnp = -100000
        for x in range(16):
            for y in range(16):
                if not self.game.cl.checkCorrect(x, y):
                    continue
                self.game.board[x][y] = self.game.ai  # Attempt to make a move
                flag = self.getScore(x, y)
                if flag == 0:
                    self.game.board[x][y] = 0
                    continue
                if flag == 10000:  # If a direct win is possible, undo the move and return the highest score
                    self.game.board[x][y] = 0
                    return 10000
                if flag > pawnp:  # Update the score and the alpha value
                    pawnp = flag
                    alpha = max(alpha, pawnp)
                self.game.board[x][y] = 0
                if beta <= alpha:  # Perform alpha-beta pruning
                    return pawnp
        return pawnp

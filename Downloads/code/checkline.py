class CheckLine:
    def __init__(self, game):
        self.game = game  # Store the game instance during initialization for accessing game state and methods

    def borderInspect(self, x, y):
        return 0 <= x < 15 and 0 <= y < 15  # Check if the coordinates (x, y) are within the bounds of the chessboard

    def checkCorrect(self, x, y):
        return self.borderInspect(x, y) and self.game.board[x][y] == 0  # Check if the move position is legal: it must be within the board and unoccupied by any piece

    def sameColor(self, x, y, i):
        return self.borderInspect(x, y) and self.game.board[x][y] == i  # Check if the specified position has a chess piece of the same color as the parameter 'i'

    def boardInline(self, x, y, v):
        i, j = x + self.game.dx[v], y + self.game.dy[v]  # Compute the next coordinate in the specified direction
        s, referee_number = 0, self.game.board[x][y]  # skeeps track of the number of consecutive same-color pieces, while "referee_number" records the color of the piece at the current coordinate
        if referee_number == 0: return 0  # If there is no piece at the current position, return 0 directly
        while self.sameColor(i, j, referee_number):  # 在Loop in the specified direction until encountering a different-colored piece
            s += 1
            i += self.game.dx[v]
            j += self.game.dy[v]
        return s  # Return the number of consecutive pieces of the same color in a straight line

    def fourRow(self, x, y):
        point, s = self.game.board[x][y], 0  # point" records the color of the piece at the current coordinate, while "s" keeps track of the number of four-in-a-row sequences
        for u in range(4):  # Traverse the four directions
            samepoint = 1
            samepoint, i = self.boardofSamepoint(x, y, u, 1, point, samepoint)  # Search for consecutive same-color pieces in the current direction
            if not self.checkCorrect(x + self.game.dx[u] * i, y + self.game.dy[u] * i): continue  # If the next position is not valid, skip the current directio
            samepoint, i = self.boardofSamepoint(x, y, u, -1, point, samepoint)  # Reverse search for consecutive same-color pieces
            if not self.checkCorrect(x + self.game.dx[u] * i, y + self.game.dy[u] * i): continue
            if samepoint == 4: s += 1  # If the number of consecutive same-color pieces is 4, increment the count
        return s  # Return the count of four-in-a-row sequences

    def numberTofour(self, x, y):
        point = self.game.board[x][y]  # The color of the piece at the current coordinate
        s = 0  # Record the count of potential four-in-a-row sequences
        for u in range(8):  # Traverse the eight directions
            samepoint = 0
            flag = True
            i = 1
            while self.sameColor(x + self.game.dx[u] * i, y + self.game.dy[u] * i, point) or flag:  # Check for same-color pieces or empty spaces
                if not self.sameColor(x + self.game.dx[u] * i, y + self.game.dy[u] * i, point):  # If it's not a piece of the same color
                    if flag and self.borderInspect(x + self.game.dx[u] * i, y + self.game.dy[u] * i) and self.game.board[x + self.game.dx[u] * i][y + self.game.dy[u] * i] != 0:
                        samepoint -= 10  # If encountering a different-colored piece for the first time, and if the position is within the board and not empty, deduct points
                    flag = False  # Mark that a different-colored piece has been encountered
                samepoint += 1  # Count consecutive same-color pieces
                i += 1
            i -= 1  # Backtrack to the position of the last same-color piece
            if not self.borderInspect(x + self.game.dx[u] * i, y + self.game.dy[u] * i): continue  # if it's beyond the board boundary, skip the current direction
            samepoint, i = self.boardofSamepoint(x, y, u, -1, point, samepoint)  # Check in the reverse direction
            if samepoint == 4: s += 1  # f the number of consecutive same-color pieces is 4, increment the count
        return s - self.fourRow(x, y) * 2  # Return the difference between the count of potential four-in-a-row sequences and the actual count of four-in-a-row sequences multiplied by two (because each direction is counted twice)

    def threeRow(self, x, y):
        point = self.game.board[x][y]  # The color of the piece at the current coordinate
        s = 0  # Record the count of three-in-a-row sequences
        for u in range(4):  # Traverse the four primary directions.
            samepoint = 1  # Initialize the count of consecutive same-color pieces to 1, including the current piece
            # Check for consecutive same-color pieces in the current direction, and return the updated count and offset
            samepoint, i = self.boardofSamepoint(x, y, u, 1, point, samepoint)
            # Check if the next position after consecutive same-color pieces is valid (empty); if not valid, skip the current direction
            if not self.checkCorrect(x + self.game.dx[u] * i, y + self.game.dy[u] * i):
                continue
            # Check if the position two steps after the end of consecutive same-color pieces is valid, used to determine if it can form a live three
            if not self.checkCorrect(x + self.game.dx[u] * (i + 1), y + self.game.dy[u] * (i + 1)):
                continue
            # Reverse directionally check for consecutive same-color pieces, and update the count and offset
            samepoint, i = self.boardofSamepoint(x, y, u, -1, point, samepoint)
            # Check if the next position after the end of consecutive same-color pieces in the reverse direction is valid (empty)
            if not self.checkCorrect(x + self.game.dx[u] * i, y + self.game.dy[u] * i):
                continue
            # Check if the position two steps after the end of consecutive same-color pieces in the reverse direction is valid
            if not self.checkCorrect(x + self.game.dx[u] * (i - 1), y + self.game.dy[u] * (i - 1)):
                continue
            # If the count of consecutive same-color pieces is 3, increment the count of three-in-a-row sequences
            if samepoint == 3:
                s += 1
        # The following loop iterates through all eight directions to check for potential formations of a live three
        for u in range(8):
            samepoint = 0; flag = True; i = 1
            # Check for consecutive same-color pieces; if encountering a different-colored piece and haven't encountered one before, perform special handling
            while self.sameColor(x + self.game.dx[u] * i, y + self.game.dy[u] * i, point) or flag:
                # If the current position is not a piece of the same color
                if not self.sameColor(x + self.game.dx[u] * i, y + self.game.dy[u] * i, point):
                    # If encountering a piece of a different color for the first time and the position is within the board and not empty, handle it by deducting points
                    if flag and self.borderInspect(x + self.game.dx[u] * i, y + self.game.dy[u] * i) and self.game.board[x + self.game.dx[u] * i][y + self.game.dy[u] * i] != 0:
                        samepoint -= 10
                    flag = False  # Update the flag to indicate that a different-colored piece has been processed.
                samepoint += 1  # Increment the count of consecutive same-color pieces
                i += 1  # Move to the next position
            # Check for the possibility of forming a live three
            if not self.checkCorrect(x + self.game.dx[u] * i, y + self.game.dy[u] * i):
                continue
            if self.borderInspect(x + self.game.dx[u] * (i - 1), y + self.game.dy[u] * (i - 1)) and self.game.board[x + self.game.dx[u] * (i - 1)][y + self.game.dy[u] * (i - 1)] == 0:
                continue
            # Check the count of consecutive same-color pieces in the opposite direction
            samepoint, i = self.boardofSamepoint(x, y, u, 1, point, samepoint)
            if not self.checkCorrect(x + self.game.dx[u] * i, y + self.game.dy[u] * i):
                continue
            # If the count of consecutive same-color pieces is 3, increase the count of three-in-a-row sequences.
            if samepoint == 3:
                s += 1
        return s  # Return the total count of three-in-a-row sequences.


    def checkLine(self, x, y):
        flag = False  # Set a flag to record whether a connection exists
        for u in range(4):  # Traverse the four primary directions
            if (self.boardInline(x, y, u) + self.boardInline(x, y, u + 4)) > 4:  # 如果任一方向上的连线长度超过4
                flag = True  # Set the flag to true
        return flag  # Return whether a connection exists

    def prohibit(self, x, y):
        if self.sameColor(x, y, 3 - self.game.first):
            return False  # If the current move position has the same color as the opponent's piece, it does not constitute a forbidden move
        '''
        Check if the current move constitutes a forbidden move: if the number of 
        simultaneous three-in-a-row sequences is greater than 1, or if there exists a line 
        with five or more consecutive pieces, or if the number of simultaneous four-in-a-row sequences 
        (including live four and double threes) is greater than 1.
        '''
        flag = (self.threeRow(x, y) > 1) or (self.checkLine(x, y)) or ((self.fourRow(x, y) + self.numberTofour(x, y)) > 1)
        return flag  # Return whether it constitutes a forbidden move

    def boardofSamepoint(self, x, y, u, i, point, sk):
        # Check the count of consecutive same-color pieces in the specified direction
        if i == 1:  # Check in the forward direction
            while self.sameColor(x + self.game.dx[u] * i, y + self.game.dy[u] * i, point):
                sk += 1  # Increment the count of consecutive same-color pieces
                i += 1  # Move along the specified direction
        elif i == -1:  # Check in the reverse direction
            while self.sameColor(x + self.game.dx[u] * i, y + self.game.dy[u] * i, point):
                sk += 1  # Increment the count of consecutive same-color pieces
                i -= 1  # Move along the specified direction
        return sk, i  # Return the count of consecutive same-color pieces and the offset of the last checked position

    def gameOver(self, x, y):
        for u in range(4):  # Traverse the four primary directions
            if (self.boardInline(x, y, u) + self.boardInline(x, y, u + 4)) >= 4:  # If the length of any line in any direction is at least 4.
                self.game.ending = True  # Set the game over flag
                return True  # Return the game over flag.
        return False  # "If none of the directions satisfy the ending condition, return that the game is not over
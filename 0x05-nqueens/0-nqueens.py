#!/usr/bin/python3
"""This is the nqueens problem"""

import sys


def check_valid(board, row, col):
    """To check if the backtrack placement is valid

    Args:
        board (list[list[int]]): The board
        row (int): the row
        col (int): the column

    Returns:
        bool: True if valid, False otherwise
    """
    # Checking the left side row of the point
    for i in range(col):
        if board[row][i]:  # if there's attack return False
            return False
    # Checking the lower left diagonal
    for i, j in zip(range(row, len(board)), range(col, -1, -1)):
        if board[i][j]:  # if there's an attack return False
            return False
    # Checking the upper left diagonal
    for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
        if board[i][j]:  # if there's an attack return False
            return False
    return True  # return True when there's no attack


def solve_nqueens(board, col, solution):
    """This solves the nqueens with recursion

    Args:
        board (list[list[int]]): The board
        col (int): The column to start from1

    Returns:
        None
    """
    if col == len(board):
        b = []
        for i in range(len(board)):
            for j in range(len(board)):
                if board[i][j]:
                    b.append([i, j])
        solution.append(b)
        return
    for i in range(len(board)):
        if check_valid(board, i, col):
            board[i][col] = 1
            solve_nqueens(board, col + 1, solution)
            board[i][col] = 0


def main():
    """_summary_

    Returns:
        _type_: _description_
    """

    if len(sys.argv) != 2:
        print("Usage: nqueens N")
        sys.exit(1)

    try:
        N = int(sys.argv[1])
    except ValueError:
        print("N must be a number")
        sys.exit(1)

    if N < 4:
        print("N must be at least 4")
        sys.exit(1)

    board = [[0 for j in range(N)] for i in range(N)]
    solution = []
    solve_nqueens(board, 0, solution)
    solution.sort(key=lambda x: x[0][1])
    for i in solution:
        print(i)


if __name__ == "__main__":
    main()

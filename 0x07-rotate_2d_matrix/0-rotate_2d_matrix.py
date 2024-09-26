#!/usr/bin/python3
"""This module is used to rotate a matrix"""


def rotate_2d_matrix(matrix):
    """This is the function for rotating a matrix

    Args:
        matrix (matrix): The matrix
    """
    n = len(matrix)
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    for i in range(n):
        matrix[i] = matrix[i][::-1]

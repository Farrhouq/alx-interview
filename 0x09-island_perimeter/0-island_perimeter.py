#!/usr/bin/python3
"""This is the Island Perimeter interview Question"""


def island_perimeter(grid):
    """_summary_

    Args:
        grid (_type_): _description_
    """
    ans = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == 1:
                ans += 4
                if i != 0 and grid[i-1][j] == 1:
                    ans -= 1
                if i < len(grid) - 1 and grid[i+1][j] == 1:
                    ans -= 1
                if j != 0 and grid[i][j-1] == 1:
                    ans -= 1
                if j < len(grid[0]) - 1 and grid[i][j+1] == 1:
                    ans -= 1
    return ans

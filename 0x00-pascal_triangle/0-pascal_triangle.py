#!/usr/bin/python3
"""Pascal Triangle"""


def pascal_triangle(n):
    """This is the pascal triangle generator"""
    res = []
    if n <= 0:
        return res
    for i in range(n):
        row = []
        for j in range(i+1):
            if i == 0:
                row.append(1)
            elif i == 1:
                row.append(1)
            else:
                if j == 0 or j == i:
                    row.append(1)
                else:
                    row.append(res[i-1][j-1] + res[i-1][j])
        res.append(row)
    return res

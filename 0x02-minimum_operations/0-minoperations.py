#!/usr/bin/python3
"""this is the file for the min operations"""


def minOperations(n):
    """This is the minOperations function"""
    if n <= 1:
        return 0
    for i in range(n - 1, 0, -1):
        if n % i == 0:
            return minOperations(i) + n // i
    return 0

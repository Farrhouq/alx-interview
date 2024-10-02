#!/usr/bin/python3
"""This is making change problem solution"""


def makeChange(coins, total):
    """This is the makeChange function to solve the problem

    Args:
        coins (_type_): _description_
        total (_type_): _description_
    """
    if total <= 0:
        return 0
    v = total
    coins.sort()
    i = len(coins) - 1
    ans = []
    while i >= 0:
        while v >= coins[i]:
            v -= coins[i]
            ans.append(coins[i])
        i -= 1
    if total != sum(ans):
        return -1
    return len(ans)

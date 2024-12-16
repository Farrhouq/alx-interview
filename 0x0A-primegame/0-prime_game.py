#!/usr/bin/python3
"""This is the prime game project"""


def isWinner(x, nums):
    """_summary_

    Args:
        x (_type_): _description_
        nums (_type_): _description_
    """
    if x <= 0:
        return None

    def sieve(n):
        primes = [0, 0] + [1] * (n - 1)
        p = 2
        while p * p <= n:
            if primes[p]:
                for i in range(p * p, n + 1, p):
                    primes[i] = 0
            p += 1
        return primes

    def play(n):
        primes = sieve(n)
        return sum(primes) % 2 == 1

    Maria = Ben = 0
    for n in nums:
        if play(n):
            Maria += 1
        else:
            Ben += 1

    if Maria > Ben:
        return "Maria"
    elif Ben > Maria:
        return "Ben"
    else:
        return None

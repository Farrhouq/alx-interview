#!/usr/bin/python3
"""This is the utf8 validation file"""


def validUTF8(data):
    """This is the function that validates utf8"""

    num_bytes = 0

    for num in data:
        if num_bytes == 0:
            mask = 1 << 7
            while num & mask:
                num_bytes += 1
                mask >>= 1

            if num_bytes == 1 or num_bytes > 4:
                return False

            if num_bytes > 0:
                num_bytes -= 1

        else:
            if num >> 6 != 2:
                return False

            num_bytes -= 1

    return num_bytes == 0

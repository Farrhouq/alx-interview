#!/usr/bin/python3
"""This is the log parsing file"""

import sys


t_size = 0
s_codes = {
    200: 0,
    301: 0,
    400: 0,
    401: 0,
    403: 0,
    404: 0,
    405: 0,
    500: 0
}
l_count = 0

try:
    for line in sys.stdin:
        try:
            args = line.split()
            size = int(args[-1])
            code = int(args[-2])

            if code in s_codes:
                s_codes[code] += 1

            t_size += size
            l_count += 1

            if l_count % 10 == 0:
                print(f"File size: {t_size}")
                [print(f"{c}: {v}") for c, v in s_codes.items() if v != 0]
        except ValueError:
            pass
except KeyboardInterrupt:
    pass
finally:
    print(f"File size: {t_size}")
    [print(f"{c}: {v}") for c, v in s_codes.items() if v != 0]


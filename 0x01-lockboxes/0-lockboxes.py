#!/usr/bin/python3
"""This is the locked boxes problem"""


def canUnlockAll(boxes):
    """This function determines if all boxes can be unlocked"""

    total_boxes = len(boxes)
    unlocked = [False] * total_boxes

    keys = [0]

    while keys:
        new_key = keys.pop()
        if not unlocked[new_key]:
            unlocked[new_key] = True
            for key in boxes[new_key]:
                if key < total_boxes and not unlocked[key]:
                    keys.append(key)
    return all(unlocked)

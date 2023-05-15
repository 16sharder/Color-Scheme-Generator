from helper import *


def calculate_color(counts, all_pixels):
    highest, cat = max(counts), dict()

    # finds most used color and removes it from dict and count, adding it to category
    color = find_highest(highest, all_pixels)
    rm_pixel(color, highest, all_pixels, counts, cat)

    keys = list(all_pixels)
    h, s, v = convert_hsv(color)

    # determines if color is on the greyscale
    bgw = greyscale(s, v)

    # establishes range for colors similar to chosen color
    rng = boundaries(h, s, v)

    # iterates over all pixels not previously eliminated to compare with chosen color
    for pixel in keys:
        count = all_pixels[pixel]
        hsv = convert_hsv(pixel)

        # performs comparison with chosen color
        if to_delete(hsv, bgw, rng):
            rm_pixel(pixel, count, all_pixels, counts, cat)

    return [color, cat, all_pixels]

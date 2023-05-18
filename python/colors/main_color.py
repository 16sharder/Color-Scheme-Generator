from helper import *


def calculate_color(counts, all_pixels, factors):
    highest, cat = max(counts), dict()

    # finds most used color and removes it from dict and count, adding it to category
    color = find_highest(highest, all_pixels)
    rm_pixel(color, highest, all_pixels, counts, cat)

    keys = list(all_pixels)
    h, s, v = convert_hsv(color)
    total = highest

    # determines if color is on the greyscale
    bgw = greyscale(s, v, factors[2])

    # establishes range for colors similar to chosen color
    rng = boundaries(h, s, v, factors[0], factors[1])

    # iterates over all pixels not previously eliminated to compare with chosen color
    for pixel in keys:
        count = all_pixels[pixel]
        hsv = convert_hsv(pixel)

        # performs comparison with chosen color
        if close_color(hsv, bgw, rng, factors[0], factors[2]):
            rm_pixel(pixel, count, all_pixels, counts, cat)
            total += count

    return color, total, cat, all_pixels


def check_overlap(color_1, others, factors):
    """Takes a color, a list of colors, and boundaries; determines if the color has the
    chance of overlapping pixels in its category with another color; returns a list of
    colors where overlap is possible"""
    h, s, v = color_1
    hue_factor, bw_factor = factors[0], factors[2]
    bgw = greyscale(s, v, bw_factor)

    to_compare = []

    for color_2 in others:

        # expands the range of comparison to see if colors are close
        fctr = [hue_factor + 1, 100, bw_factor * 2 - 1]
        ranges = boundaries(h, s, v, fctr[0], fctr[1])

        # checks if colors are close enough to overlap
        if close_color(color_2, bgw, ranges, fctr[0], fctr[2]):
            to_compare.append(color_2)

    return to_compare


def determine_main(cats):
    """Takes an array of categories; determines which categories have the highest num
    of pixels in them; returns the main colors of those categories and the sorted array
    of categories"""
    # creates and sorts an array of all of the category totals
    totals = []
    for cat in cats:
        totals.append(cat["count"])
    totals.sort(reverse=True)

    print(totals)
    print(len(cats))

    # determines which 6 colors to use based on the highest totals

    categories = [{"color": (0, 0, 0)}] * len(cats)
    for cat in cats:
        idx = totals.index(cat["count"])
        categories[idx] = cat

    colors = [cat["color"] for cat in categories[:6]]

    return colors, categories

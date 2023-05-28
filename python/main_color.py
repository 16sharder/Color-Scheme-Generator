from helper import *


def calculate_color(counts, all_pixels, factors):
    """Takes a list of counts, a dictionary of pixels, and boundaries; finds the pixel
    with the highest count, then moves all pixels close to that color from the dict to
    a new category dict; returns the category dict"""
    highest, cat = max(counts), dict()

    # finds most used color and removes it from dict and count, adding it to category
    color = find_highest(highest, all_pixels)
    rm_pixel(color, highest, all_pixels, counts, cat)

    keys = list(all_pixels)
    h, s, v = color
    total = highest

    # determines if color is on the greyscale or brown
    bgw = greyscale(h, s, v, factors[2])

    # establishes range for colors similar to chosen color
    rng = boundaries(h, s, v, factors[0], factors[1])

    # iterates over all pixels not previously eliminated to compare with chosen color
    for pixel in keys:
        count = all_pixels[pixel]

        # performs comparison with chosen color
        if close_color(pixel, bgw, rng, factors[2]):
            rm_pixel(pixel, count, all_pixels, counts, cat)
            total += count

    cat["color"] = color
    cat["count"] = total

    return cat


def determine_main(cats):
    """Takes an array of categories; determines which categories have the highest num
    of pixels in them; returns the main colors of those categories and the sorted array
    of categories"""
    # creates and sorts an array of all of the category totals
    totals = []
    for cat in cats:
        totals.append(cat["count"])

    totals.sort(reverse=True)

    # determines which 6 colors to use based on the highest totals
    categories = [{"color": (0, 0, 0)}] * len(cats)
    for cat in cats:
        if cat["count"] in totals:
            idx = totals.index(cat["count"])
            categories[idx] = cat

    colors = [cat["color"] for cat in categories[:6]]

    return colors, categories

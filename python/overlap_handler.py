from helper import *


def check_overlap(color_1, others, factors):
    """Takes a color, a list of colors, and boundaries; determines if the color has the
    chance of overlapping pixels in its category with another color; returns a list of
    colors where overlap is possible"""
    h, s, v = color_1
    hue_factor, bw_factor = factors[0], factors[2]
    bgw = greyscale(h, s, v, bw_factor)

    to_compare = []

    for color_2 in others:

        # expands the range of comparison to see if colors are close
        fctr = [hue_factor * 2, 100, bw_factor * 2 - 1]
        ranges = boundaries(h, s, v, fctr[0], fctr[1])

        # checks if colors are close enough to overlap
        if close_color(color_2, bgw, ranges, fctr[2]):
            to_compare.append(color_2)

    return to_compare


def move_overlapping(color_1, color_2, cat_1, cat_2, factors):
    """Takes 2 similar colors and their categories, and boundaries for the first color;
    Examines each pixel in the first colors category - if it is closer to the second
    color, moves it to the second color's category; returns nothing"""
    h1, s1, v1 = color_1
    h2, s2, v2 = color_2
    hue_factor, sv_factor, bw_factor = factors

    bgw = greyscale(h1, s1, v1, bw_factor)

    # if color_1 is on the strict grey scale, hue is ignored on color_1's end
    if bgw in ["black", "pgrey", "white"]:
        h1 = h2

    ranges = boundaries(h2, s2, v2, hue_factor, sv_factor)

    # determines which color each pixel is closer to
    keys = list(cat_1.keys())
    for pixel in keys:
        if pixel != "color" and pixel != "count":
            # if the pixel wouldn't be in color_2's cat to begin with, it shouldn't be moved
            if not close_color(pixel, greyscale(h2, s2, v2, bw_factor), ranges, bw_factor):
                continue

            hue, sat, val = pixel

            # if the pixel itself is black or pure grey, it should stay where is
            bg = greyscale(hue, sat, val, bw_factor)
            if bg in ["black", "pgrey"]:
                if bg == bgw:
                    continue

            # determines which cat the color is closer to, prioritizing hue
            hdif_1 = abs(h1 - hue)
            hdif_2 = abs(h2 - hue)
            sdif_1 = abs(s1 - sat)
            sdif_2 = abs(s2 - sat)
            vdif_1 = abs(v1 - val)
            vdif_2 = abs(v2 - val)

            prox_1 = (hdif_1 * 1.5) + sdif_1 + vdif_1
            prox_2 = (hdif_2 * 1.5) + sdif_2 + vdif_2

            # if closer to color_1, keep, otherwise move to color_2
            if prox_1 < prox_2: keep = True
            elif prox_1 > prox_2: keep = False
            else:
                if hdif_1 <= hdif_2: keep = True
                else: keep = False

            if not keep:
                # if color_1 is on strict greyscale, color_2's hue needs examining
                if bgw in ["black", "pgrey", "white"]:
                    rng = ranges[1] if hue > 360-hue_factor else ranges[0]

                    # if the hue of the pixel is not close to color_2's hue, it shouldn't be moved
                    if hue not in rng:
                        continue

                # switches the pixel from cat_1 to cat_2
                count = cat_1[pixel]

                cat_2[pixel] = count
                del cat_1[pixel]

                cat_1["count"] -= count
                cat_2["count"] += count

from helper import *


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


def move_overlapping(color_1, color_2, cat_1, cat_2, factors):
    """Takes 2 similar colors and their categories, and boundaries for the first color;
    Examines each pixel in the first colors category - if it is closer to the second
    color, moves it to the second color's category; returns nothing"""
    h1, s1, v1 = color_1
    h2, s2, v2 = color_2
    hue_factor, sv_factor, bw_factor = factors

    black, grey, white = greyscale(s1, v1, bw_factor)

    # determine which element to use to determine the appropriate category
    # if the hues are far apart, hue takes priority over val, over sat
    if abs(h1 - h2) >= hue_factor / 2: cmp = "hue"
    elif abs(v1 - v2) >= sv_factor / 2: cmp = "val"
    else: cmp = "sat"

    # if color_1 is on the grey scale, hue is ignored on color_1's end
    if black or grey or white and cmp == "hue":
        if abs(v1 - v2) >= sv_factor / 2: cmp = "val"
        else: cmp = "sat"

    # determines which color each pixel is closer to
    keys = list(cat_1.keys())
    for pixel in keys:
        if pixel != "color" and pixel != "count":
            hue, sat, val = pixel

            # for the desired element, finds how close the pixel is to colors 1 and 2
            if cmp == "hue":
                keep = abs(h1 - hue)
                reset = abs(h2 - hue)
            elif cmp == "val":
                keep = abs(v1 - val)
                reset = abs(v2 - val)
            else:
                keep = abs(s1 - sat)
                reset = abs(s2 - sat)

            # if color_2 is closer, reset < keep and pixel needs moving; otherwise color_1 is closer
            if reset < keep:
                # if color_1 is on greyscale, color_2's hue needs examining
                if black or grey or white:
                    fctr = [hue_factor + 1, 100]
                    ranges = boundaries(h2, s2, v2, fctr[0], fctr[1])

                    rng = ranges[1] if hue > 360-fctr[0] else ranges[0]

                    # if the hue of the pixel is not close to color_2's hue, it shouldn't be moved
                    if hue not in rng:
                        continue

                    # switches the pixel from cat_1 to cat_2
                    count = cat_1[pixel]

                    cat_2[pixel] = count
                    del cat_1[pixel]

                    cat_1["count"] -= count
                    cat_2["count"] += count

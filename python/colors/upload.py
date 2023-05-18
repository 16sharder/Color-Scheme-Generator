# Upload (python server) is used to retrieve the colors from the provided path's image
from PIL import Image
from main_color import *


def upload(image_path):
    """Takes an image_path, opens the image and analyzes all of its pixels; determines
    which 6 colors appear the most in the image, and returns them"""
    try:
        image = Image.open(image_path)

    except FileNotFoundError:
        print(f"Sending reply: File not found")
        return "File not found"
    except IsADirectoryError:
        print(f"Sending reply: Directory")
        return "Directory"
    except PermissionError:
        print(f"Sending reply: Permission denied")
        return "Permission denied"

    pixels = image.load()
    width = image.size[0]
    height = image.size[1]
    all_pixels = dict()

    # iterates over each pixel of the image and adds its count to dict
    for w in range(width):
        for h in range(height):
            pixel = pixels[w, h]
            pixel = pixel[:3]

            if pixel in all_pixels:
                all_pixels[pixel] += 1
            else:
                all_pixels[pixel] = 1

    # create a list of pixel totals, excluding minuscule ones
    counts = []
    keys = list(all_pixels)
    for pixel in keys:
        count = all_pixels[pixel]
        if count > width * height * 0.00001:
            counts.append(count)
        else:
            del all_pixels[pixel]

    # algorithm numbers for determining similar colors
    hue_factor = 30
    sv_factor = 33
    bw_factor = 21
    factors = [hue_factor, sv_factor, bw_factor]

    # runs the main algorithm: finds main colors, adds pixels to their categories, counts totals
    cats = []
    while len(counts) != 0:
        color, count, cat, all_pixels = calculate_color(counts, all_pixels, factors)

        cat["color"] = color
        cat["count"] = count
        cats.append(cat)

    # creates a list of the main colors (in hsv)
    all_colors = []
    for cat in cats:
        rgb = cat["color"]
        hsv = convert_hsv(rgb)
        all_colors.append(tuple(hsv))

    # analyzes whether any of the main colors could have overlapping pixels in their cats
    evaluate = dict()
    for idx in range(len(all_colors)):

        color_1 = all_colors[idx]
        evaluate[color_1] = check_overlap(color_1, all_colors[idx+1:], factors)

    # moves any overlapping pixels to appropriate color category
    for color_1 in evaluate:
        h1, s1, v1 = color_1

        for color_2 in evaluate[color_1]:
            h2, s2, v2 = color_2

            idx = all_colors.index(color_1)
            take = cats[idx]
            idx = all_colors.index(color_2)
            place = cats[idx]

            black, grey, white = greyscale(s1, v1, bw_factor)

            if abs(h1 - h2) >= hue_factor / 2:
                cmp = "hue"
            elif abs(v1 - v2) >= sv_factor / 2:
                cmp = "val"
            else:
                cmp = "sat"

            if black or grey or white and cmp == "hue":
                if abs(v1 - v2) >= sv_factor / 2:
                    cmp = "val"
                else:
                    cmp = "sat"

            keys = list(take.keys())
            for pixel in keys:
                if pixel != "color" and pixel != "count":
                    hue, sat, val = convert_hsv(pixel)

                    if cmp == "hue":
                        keep = abs(h1 - hue)
                        reset = abs(h2 - hue)
                    elif cmp == "val":
                        keep = abs(v1 - val)
                        reset = abs(v2 - val)
                    else:
                        keep = abs(s1 - sat)
                        reset = abs(s2 - sat)

                    if reset < keep:
                        if black or grey or white:
                            # expands the range of comparison to see if hues are close enough
                            fctr = [hue_factor + 1, 100]
                            ranges = boundaries(h2, s2, v2, fctr[0], fctr[1])

                            rng = ranges[1] if hue > 329 else ranges[0]

                            if hue not in rng:
                                continue

                        place[pixel] = take[pixel]
                        del take[pixel]

    # determines which 6 colors to use
    colors, cats = determine_main(cats)

    return colors, cats

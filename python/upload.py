# Upload (python server) is used to retrieve the colors from the provided path's image
from PIL import Image
from main_color import *
from overlap_handler import *


def upload():
    """Takes an image_path, opens the image and analyzes all of its pixels; determines
    which 6 colors appear the most in the image, and returns them"""
    try:
        image = Image.open("../image.jpg")

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
    all_hsvs = dict()

    # iterates over each pixel of the image and adds its count to dict
    for w in range(width):
        for h in range(height):
            pixel = pixels[w, h]
            pixel = pixel[:3]

            all_pixels[pixel] = 1 if pixel not in all_pixels else all_pixels[pixel] + 1

    # converts all the founds pixels to hsv and adds it to a new dict
    for pixel in all_pixels:
        count = all_pixels[pixel]
        # excludes pixels with miniscule count
        if count > width * height * 0.000001:
            hsv = tuple(convert_hsv(pixel))
            all_hsvs[hsv] = count if hsv not in all_hsvs else all_hsvs[hsv] + count

    all_pixels = all_hsvs

    # create a list of pixel totals
    counts = []
    for pixel in all_pixels:
        counts.append(all_pixels[pixel])

    # algorithm numbers for determining similar colors
    hue_factor = 30
    sv_factor = 33
    bw_factor = 21
    factors = [hue_factor, sv_factor, bw_factor]

    # runs the main algorithm: finds main colors, adds pixels to their categories, counts totals
    cats = []
    while len(counts) != 0:
        cat = calculate_color(counts, all_pixels, factors)
        cats.append(cat)

    # creates a list of the main colors (in hsv)
    all_colors = []
    for cat in cats:
        all_colors.append(cat["color"])

    # analyzes whether any of the main colors could have overlapping pixels in their cats
    evaluate = dict()
    for idx in range(len(all_colors)):
        color_1 = all_colors[idx]
        # adds list of colors with potential overlap to dict for current color
        evaluate[color_1] = check_overlap(color_1, all_colors[idx+1:], factors)

    # moves any overlapping pixels to appropriate color category
    for color_1 in evaluate:
        for color_2 in evaluate[color_1]:
            cat_1 = cats[all_colors.index(color_1)]
            cat_2 = cats[all_colors.index(color_2)]

            move_overlapping(color_1, color_2, cat_1, cat_2, factors)

    for idx in range(len(cats)):
        cat = cats[idx]
        rgb_cat = {"color": convert_rgb(cat["color"]),
                   "count": cat["count"]}
        for pixel in cat:
            if pixel != "color" and pixel != "count":
                rgb = convert_rgb(pixel)
                rgb_cat[tuple(rgb)] = cat[pixel]

        cats[idx] = rgb_cat

    # determines which 6 colors to use
    colors, cats = determine_main(cats, width*height)

    return colors, cats

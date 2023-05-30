# Upload1 (used in color_server) is used to retrieve and count all pixels in image.jpg
import PIL
from PIL import Image
from overlap_handler import *
from math import ceil


def upload1():
    """Opens image.jpg and analyzes all of its pixels; counts them
    and converts them to hsv,then returns a dict of the pixels"""
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
    except PIL.UnidentifiedImageError:
        print(f"Sending reply: Not jpg")
        return "Not jpg"

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

    # determines the approximate amount of time that upload2 will take
    seconds = (len(all_hsvs)/1000)**2 * 0.0011 + 3
    if seconds < 5: seconds = 5

    return all_hsvs, ceil(seconds)

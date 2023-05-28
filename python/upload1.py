# Upload (python server) is used to retrieve the colors from the provided path's image
import PIL
from PIL import Image
from overlap_handler import *
from math import ceil


def upload1():
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

    seconds = (len(all_hsvs)/1000)**2 * 0.0011 + 3
    if seconds < 5: seconds = 5

    return all_hsvs, ceil(seconds)

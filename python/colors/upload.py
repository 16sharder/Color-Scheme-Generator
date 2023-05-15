# Upload (python server) is used to retrieve the colors from the provided path's image
import zmq
from PIL import Image
from main_color import calculate_color

context = zmq.Context()
socket = context.socket(zmq.REQ)
socket.connect("tcp://localhost:7170")


def upload(image_path):
    # attempts to open the file
    try:
        image = Image.open(image_path)

    # if the attempt fails, sends error message
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

    # create a list of pixel counts, excluding minuscule ones
    counts = []
    keys = list(all_pixels)
    for pixel in keys:
        count = all_pixels[pixel]
        if count > width * height * 0.00001:
            counts.append(count)
        else:
            del all_pixels[pixel]

    # list of main colors, list of color categories
    colors, cats = [], []

    # retrieves the 6 colors with most pixels
    for num in range(0, 6):
        res = calculate_color(counts, all_pixels)

        colors.append(res[0])
        cats.append(res[1])
        all_pixels = res[2]

    return [colors, counts, all_pixels, cats]

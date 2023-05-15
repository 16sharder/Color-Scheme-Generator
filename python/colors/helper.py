import zmq

context = zmq.Context()
socket = context.socket(zmq.REQ)
socket.connect("tcp://localhost:7170")


def convert_hsv(pixel):
    """Given an rgb pixel, sends a request to partner's microservice to retrieve and return
    hsv values"""
    rgb = list(pixel)
    rgb.append("r")
    socket.send_json(rgb)
    return eval(socket.recv())


def find_highest(highest, all_pixels):
    """Iterates over all pixels and returns the pixel with the highest count"""
    for pixel in all_pixels:
        count = all_pixels[pixel]
        if count == highest:
            return pixel


def rm_pixel(pixel, count, all_pixels, counts, cat):
    """Attempts the removal of the given pixel from the pixel dict and count list;
    also adds the pixel to the color category dict; returns nothing"""
    try:
        del all_pixels[pixel]
        counts.remove(count)
    except ValueError:
        print(counts)
        print(pixel, count)
    cat[pixel] = count


def greyscale(sat, val):
    """Evaluates if given color leans towards black, grey, white, or not on greyscale;
    returns a tuple of bools indicating if result is black, grey, or white"""
    if val < 21: return True, False, False

    elif sat < 21:
        if val < 34: return True, False, False
        elif val < 67: return False, True, False
        else: return False, False, True

    else: return False, False, False


def boundaries(hue, sat, val):
    """Establishes the boundaries of the given color in terms of hue range, saturation range,
    and value range; hue range can have four vals, because the upper and lower bounds change
    when the range is around 0 or 360; returns a list of 4 hue bounds, sat upper and lower bounds,
    and value upper and lower bounds"""
    # sets highs and lows for each value for comparison
    hue_low, hue_high = (hue - 30), (hue + 30)
    sat_low, sat_high = sat - 33, sat + 33
    val_low, val_high = val - 33, val + 33

    # accommodates for changes in range around 0 and 360
    hue_low_1, hue_low_2, hue_high_1, hue_high_2 = hue_low, hue_low, hue_high, hue_high
    if hue < 30:
        hue_low_1, hue_low_2 = hue_low, hue_low + 360
        hue_high_1, hue_high_2 = hue_high, hue_high + 360
    elif hue >= 330:
        hue_low_1, hue_low_2 = hue_low - 360, hue_low
        hue_high_1, hue_high_2 = hue_high - 360, hue_high

    return [hue_low_1, hue_low_2, hue_high_1, hue_high_2, sat_low, sat_high, val_low, val_high]


def to_delete(hsv, bgw, rng):
    """Takes an hsv pixel [list], a list of 3 bools (see greyscale()), and a list of
    ranges (see boundaries()); determines if the given pixel should be kept or discarded
    depending on how close it is to the current chosen color  (to which bgw and rng apply);
    returns 1 if color is to be deleted, 2 if color is to be kept"""
    h, s, v = hsv
    black, grey, white = bgw

    # if chosen color is close to black, grey, or white, removes similar pixels regardless of hue
    if black and (v < 34 and s < 21 or v < 21): return True
    if grey and v < 67 and s < 21: return True
    if white and s < 21: return True

    # pixels similar to chosen color are removed based on hue, sat, and value similarity
    hl1, hl2, hh1, hh2, sl, sh, vl, vh = rng

    hl = hl1 if h < 30 else hl2
    hh = hh1 if h >= 330 else hh2

    if hl < h < hh and sl < s < sh and vl < v < vh: return True

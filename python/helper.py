from microservice.color_conversion import *


def convert_hsv(pixel):
    """Given an rgb pixel, directly calls partner's microservice to retrieve and return
    hsv values; not done through zmq only because of the large quantity of pixels going through
    this function, causing extended wait times"""
    rgb = list(pixel)
    rgb.append("r")
    return RGB_to_HSV(rgb)


def convert_rgb(pixel):
    """Given an hsv pixel, directly calls partner's microservice to retrieve and return
    rgb values; not done through zmq only because of the large quantity of pixels going through
    this function, causing extended wait times"""
    hsv = list(pixel)
    hsv.append("u")
    return HSV_to_RGB(hsv)


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


def greyscale(sat, val, bw_factor):
    """Evaluates if given color leans towards black, grey, white, or not on greyscale;
    returns a tuple of bools indicating if result is black, grey, or white"""
    if val < bw_factor: return True, False, False

    elif sat < bw_factor:
        if val < 34: return True, False, False
        elif val < 67: return False, True, False
        else: return False, False, True

    else: return False, False, False


def boundaries(hue, sat, val, hue_factor, sv_factor):
    """Establishes the boundaries of the given color in terms of hue range, saturation range,
    and value range; hue range can have four vals, because the upper and lower bounds change
    when the range is around 0 or 360; returns a list of 4 hue bounds, sat upper and lower bounds,
    and value upper and lower bounds"""
    # determines the range of the boundaries
    sat_range = range(sat - sv_factor, sat + sv_factor)
    val_range = range(val - sv_factor, val + sv_factor)

    hue_range_low = range(hue - hue_factor, hue + hue_factor)
    hue_range_high = hue_range_low

    # accommodates for changes in range around 0 and 360
    if hue < hue_factor:
        hue_range_low = range(0, hue + hue_factor)
        hue_range_high = range(hue - hue_factor + 360, 360)
    elif hue >= 360-hue_factor:
        hue_range_low = range(0, hue + hue_factor - 360)
        hue_range_high = range(hue - hue_factor, 360)

    return hue_range_low, hue_range_high, sat_range, val_range


def close_color(hsv, bgw, rng, hue_factor, bw_factor):
    """Takes an hsv pixel [list], a list of 3 bools (see greyscale()), and a list of
    ranges (see boundaries()); determines if the given pixel should be kept or discarded
    depending on how close it is to the current chosen color  (to which bgw and rng apply);
    returns 1 if color is to be deleted, 2 if color is to be kept"""
    h, s, v = hsv
    black, grey, white = bgw

    # if chosen color is close to black, grey, or white, removes similar pixels regardless of hue
    if black and (v < 34 and s < bw_factor or v < bw_factor): return True
    if grey and 33 < v < 67 and s < bw_factor: return True
    if white and 66 < v and s < bw_factor: return True

    # pixels similar to chosen color are removed based on hue, sat, and value similarity
    hrl, hrh, sr, vr = rng
    hr = hrh if h >= 360-hue_factor else hrl

    if h in hr and s in sr and v in vr: return True

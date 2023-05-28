# Get Details (used in color_server) is used to retrieve the categories of the current 6
# main colors, and sort their pixels

def get_details(cats, indices):
    """Takes a list of categories and a list of indices; takes the 6 categories
    in the positions indicated by indices and sorts their pixels; returns a dictionary
    where the keys are the string cat[i] and the value is a list of pixel in rgb with
    their frequency appended"""
    details = dict()
    i = 1

    # if there aren't enough categories, adds empty cats equal to background color
    while len(cats) < 6:
        cats.append({(90, 90, 90): 0})

    # iterates over each color category
    for idx in indices:
        cat = cats[idx]
        frequencies = []
        # iterates over each pixel in the category and appends its frequency
        for pixel in cat:
            if pixel != "color" and pixel != "count":
                frequencies.append(cat[pixel])

        # sorts the frequency list and cuts it at 100
        frequencies.sort(reverse=True)
        if len(frequencies) > 100:
            highest = frequencies[:100]
        else:
            highest = frequencies

        # for each pixel in the category, determines if its frequency is in highest
        for pixel in cat:
            if pixel == "color" or pixel == "count":
                continue
            count = cat[pixel]
            try:
                idx = highest.index(count)
                rgb = list(pixel)

                # appends the frequency to the rgb vals [r, g, b, frequency]
                rgb.append(count)
                highest[idx] = rgb
            except ValueError:
                continue

        details[f"cat{i}"] = highest
        i += 1

    return details

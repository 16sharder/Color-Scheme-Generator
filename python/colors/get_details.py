def get_details(cats):
    details = dict()
    i = 1

    # iterates over each color category
    for cat in cats:
        frequencies = []
        # iterates over each pixel in the category and appends its frequency
        for pixel in cat:
            frequencies.append(cat[pixel])

        # sorts the frequency list and cuts it at 100
        frequencies.sort(reverse=True)
        if len(frequencies) > 100:
            highest = frequencies[:100]
        else:
            highest = frequencies

        # for each pixel in the category, determines if its frequency is in highest
        for pixel in cat:
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

def get_details(cats):
    details = dict()
    i = 1

    # iterates over each color category
    for cat in cats:
        highest = []
        # iterates over each pixel in the category and appends its frequency
        for pixel in cat:
            if pixel == "count":
                continue
            highest.append(cat[pixel])

        # sorts the frequency list and cuts it at 100
        highest.sort(reverse=True)
        if len(highest) > 100:
            highest = highest[:100]

        # for each pixel in the category, determines if its frequency is in highest
        for pixel in cat:
            if pixel == "count":
                continue
            try:
                idx = highest.index(cat[pixel])
                lest = list(pixel)
                # appends the frequency to the rgb vals [r, g, b, frequency]
                lest.append(cat[pixel])
                highest[idx] = lest
            except ValueError:
                continue

        details[f"cat{i}"] = highest
        i += 1

    return details

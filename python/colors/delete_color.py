def delete_color(idx, colors, counts, dictionary, cats):
    a = max(counts)
    counts.remove(a)

    # identifies the 6 categories coordinating with those counts (from dict of cats)
    for item in dictionary:
        cat = dictionary[item]
        if cat["count"] == a:
            cats[idx] = cat

    # identifies color with highest pixel count in that category
    color = None
    maxi = 0
    cat = cats[idx]
    for pixel in cat:
        if pixel == "count":
            continue
        if cat[pixel] > maxi:
            color = pixel
            maxi = cat[pixel]
    colors[idx] = color

    return [colors, counts, cats]

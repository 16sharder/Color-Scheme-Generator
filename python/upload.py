from PIL import Image
import os

end = False

while end is False:
    # if the file isn't empty, proceeds to read the path
    if os.stat("../textfiles/path.txt").st_size != 0:
        with open("../textfiles/path.txt", 'r+') as file:
            image_path = file.read()
            file.close()

            # after saving the path, erases the contents of the file
            open("../textfiles/path.txt", 'w').close()

            image = Image.open(image_path)

            pixels = image.load()
            width = image.size[0]
            height = image.size[1]
            dictionary = dict()

            # iterates over each pixel of the image
            for w in range(width):
                for h in range(height):
                    pixel = pixels[w, h]

                    # puts the pixel's color into one of 27 categories
                    r = pixel[0] // 85      # 255/85 = 3 categories for red
                    g = pixel[1] // 85      # times 3 categories for green
                    b = pixel[2] // 85      # times 3 categories for blue

                    # if that category is already in the dictionary
                    if (r, g, b) in dictionary:
                        cat = dictionary[(r, g, b)]

                        # adds this pixel to the number of pixels found in that category
                        cat["count"] += 1

                        # adds one to the count for that specific pixel
                        if pixel in cat:
                            cat[pixel] += 1
                        else:
                            cat[pixel] = 1

                    # if the category is not in the dictionary, adds it in
                    else:
                        dictionary[(r, g, b)] = {pixel: 1,
                                                "count": 1}

            # creates a set of num of pixels found in each category
            counts = set()
            for item in dictionary:
                cat = dictionary[item]
                counts.add(cat["count"])

            # finds the 6 highest pixel counts in the set
            maxes = []
            for i in range(6):
                a = max(counts)
                counts.remove(a)
                maxes.append(a)

            # identifies the 6 categories coordinating with those counts
            cats = []
            for item in dictionary:
                cat = dictionary[item]
                for num in maxes:
                    if cat["count"] == num:
                        cats.append(cat)

            # finds the pixel in each category with the highest indiv count
            colors = []
            for cat in cats:
                color = None
                maxi = 0
                for pixel in cat:
                    if pixel == "count":
                        continue
                    if cat[pixel] > maxi:
                        color = pixel
                        maxi = cat[pixel]
                colors.append(color)

            # converts each color to one long string
            string = ""
            for color in colors:
                string += str(color)
                if color != colors[5]:
                    string += ", "

            # writes the string to the colors text file
            with open("../textfiles/colors.txt", 'w') as fileW:
                fileW.write(string)
                fileW.close()


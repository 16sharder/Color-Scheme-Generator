import os
import imghdr

end = True

while end:
    # if the file isn't empty, proceeds to read the path
    if os.stat("../textfiles/getdir.txt").st_size != 0:
        with open("../textfiles/getdir.txt", "r") as file:
            path = file.read()
            file.close()

            open("../textfiles/getdir.txt", 'w').close()

            # if trying to determine start of path
            if path == "/":
                origin = os.getcwd()
                idx = origin[1:].find("/")
                path = origin[:idx+1]

            if os.path.isdir(path):
                directory = os.listdir(path)
                directory.sort()
                string = path + "*,* "

                dirstring = ""
                imgstring = "*,* "
                for item in directory:
                    if item[0] != ".":
                        if os.path.isdir(path + "/" + item):
                            dirstring += item + ",* "
                        elif imghdr.what(path + "/" + item) is not None:
                            imgstring += item + ",* "

                string += dirstring + imgstring

                with open("../textfiles/directory.txt", "w") as fileW:
                    fileW.write(string)
                    fileW.close()


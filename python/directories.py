import os
import imghdr
import zmq

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:1951")

end = True

while end:
    # if the file isn't empty, proceeds to read the path
    path = socket.recv()
    path = path.decode("utf-8")
    print(f"Received path request: {path}")

    char = "/"
    index = path.find(char)
    if index == -1:
        char = "\\"

    # if trying to determine start of path
    if path == "/":
        origin = os.getcwd()
        idx = origin[1:].find("/")
        if idx == -1:
            idx = origin[4:].find("\\")
            char = "\\"
        path = origin[:idx+4]

    if os.path.isdir(path):
        try:
            directory = os.listdir(path)
        except PermissionError:
            socket.send(bytes("Permission denied", encoding='utf-8'))
            continue

        directory.sort()
        string = path + "*,* "

        dirstring = ""
        imgstring = "*,* "
        for item in directory:
            try:
                if item[0] != ".":
                    if os.path.isdir(path + char + item):
                        dirstring += item + ",* "
                    elif imghdr.what(path + char + item) is not None:
                        imgstring += item + ",* "
            except PermissionError:
                continue

        string += dirstring + imgstring

        print(f"Sending reply: {string}")
        socket.send(bytes(string, encoding='utf-8'))

    else:
        print(f"Sending reply: Not a directory")
        socket.send(bytes("Not a directory", encoding='utf-8'))


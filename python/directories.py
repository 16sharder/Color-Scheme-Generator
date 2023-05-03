# Directories (python server) is used to retrieve the folders and images in a given path

import os
import imghdr
import zmq

# creates a socket to receive from the client
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:1951")

end = True

while end:
    # once a message has been received, decodes it
    path = socket.recv()
    path = path.decode("utf-8")
    print(f"Received path request: {path}")

    # determines whether the path should use "/" or "\\" (Mac vs. Windows)
    char = "/"
    index = path.find(char)
    if index == -1:
        char = "\\"

    # if path is empty, provide origin path
    if path == "/":
        origin = os.getcwd()
        idx = origin[1:].find("/")
        if idx == -1:
            idx = origin[4:].find("\\")
            char = "\\"
        path = origin[:idx+4]

    # if the path is a directory, attempt to open its contents
    if os.path.isdir(path):
        try:
            directory = os.listdir(path)
        except PermissionError:
            socket.send(bytes("Permission denied", encoding='utf-8'))
            continue

        # sorts the contents in alphabetical order
        directory.sort()

        res = {"path": path}
        folders = []
        images = []

        # iterates over each item to determine if it is a directory or an image
        for item in directory:
            try:
                if item[0] != ".":
                    if os.path.isdir(path + char + item):
                        folders.append(item)
                    elif imghdr.what(path + char + item) is not None:
                        images.append(item)
            except PermissionError:
                continue

        res["folders"] = folders
        res["images"] = images

        # sends on the resulting list of folders and images
        print(f"Sending reply: {res}")
        socket.send_json(res)

    # if the path is not a directory, sends error message
    else:
        print(f"Sending reply: Not a directory")
        socket.send(bytes("Not a directory", encoding='utf-8'))


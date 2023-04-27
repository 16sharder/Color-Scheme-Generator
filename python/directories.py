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
    print(f"Received path request: {path}")

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

        print(f"Sending reply: {string}")
        socket.send(bytes(string, encoding='utf-8'))


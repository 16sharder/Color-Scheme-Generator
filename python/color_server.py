# The python color_server is used to connect to zmq, and uses the data to perform/call
# the appropriate function

import zmq
from upload1 import upload1
from upload2 import upload2
from get_details import get_details

# creates a socket to receive from the client
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:1952")

# empty variable initialization
all_colors, colors, cats, indices = {}, [], [], [0, 1, 2, 3, 4, 5]
originals = [colors, cats]

responses = {"path": 0,
             "colors": 1,
             "originals": 2,
             "details": 3,
             "delete": 4}
toggle = False
deleted = 0

while True:
    # once a message has been received, decodes it
    message = socket.recv()
    message = message.decode("utf-8")
    message = eval(message)

    # prevents the code from calculating things twice because of double message from server
    if toggle:
        toggle = False
        socket.send_json(responses[message[0]])

    # received a request to read image, MUST execute first
    elif message[0] == "path":
        print(f"Received image upload request")

        # retrieves the pixels from the image
        res = upload1()

        # if res is a string, it is an error message to be returned
        if type(res) == str:
            print(f"Sending error reply")
            socket.send(bytes(res, encoding='utf-8'))
            continue

        # establishes variables for use in next sections
        all_colors, seconds = res

        # sends back the number of seconds estimated for second part
        print(f"Sending reply: {seconds}")
        responses["path"] = seconds
        toggle = True
        socket.send_json([seconds])

    # received a request to analyze pixels, MUST execute second
    elif message[0] == "colors":
        print(f"Received retrieve colors request")

        # retrieves the main colors from the pixels
        res = upload2(all_colors)

        # establishes variables for use in next sections
        colors, cats = res
        while len(colors) != 6:
            colors.append([90, 90, 90])
        originals = [item.copy() for item in res]

        # sends back the main color results
        print(f"Sending reply: {colors}")
        responses["colors"] = colors
        toggle = True
        socket.send_json(colors)

    # received request for original colors
    elif message[0] == "originals":
        # resets all variables to original values
        colors, cats = [item.copy() for item in originals]
        indices = [0, 1, 2, 3, 4, 5]
        deleted = 0

        # sends back original colors
        print(f"Sending originals: {colors}")
        responses["originals"] = colors
        socket.send_json(colors)

    # received request for color details
    elif message[0] == "details":
        print(f"Received request for details")

        details = get_details(cats, indices)

        # sends on the resulting list of categories with highest pixels
        print("Sending details")
        responses["details"] = [colors, details]
        toggle = True
        socket.send_json([colors, details])

    # received index for color to be deleted
    elif message[0] == "delete":
        idx = message[1]
        print(f"Received delete request: {idx}")

        # attempt to delete by shifting category and changing index
        try:
            i = 6 + deleted
            colors[idx] = cats[i]["color"]
            indices[idx] = i
            deleted += 1

        # if failed because out of bounds, there are no more cats to shift
        except IndexError:
            print(f"Sending error reply")
            socket.send(bytes("no more", encoding='utf-8'))
            continue

        # sends back the new main color results
        print(f"Sending reply: {colors[idx]}")
        responses["delete"] = colors[idx]
        socket.send_json(colors[idx])

    else:
        socket.send_json(None)

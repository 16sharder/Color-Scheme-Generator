import zmq
from upload import upload
from get_details import get_details

# creates a socket to receive from the client
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:1952")

# empty variable initialization
colors, cats, indices = [], [], [0, 1, 2, 3, 4, 5]
originals = [colors, cats]

responses = {"path": 0,
             "details": 1}
toggle = False
deleted = 0

while True:
    # once a message has been received, decodes it
    message = socket.recv()
    message = message.decode("utf-8")
    message = eval(message)

    if toggle:
        toggle = False
        socket.send_json(responses[message[0]])

    # received a path for an image, MUST execute first
    elif message[0] == "path":
        print(f"Received image upload request")

        # retrieves the main colors from the image
        res = upload()

        # if res is a string, it is an error message to be returned
        if type(res) == str:
            print(f"Sending error reply")
            socket.send(bytes(res, encoding='utf-8'))
            continue

        # establishes variables for use in next sections
        colors, cats = res
        originals = [item.copy() for item in res]

        # sends back the main color results
        print(f"Sending reply: {colors}")
        responses["path"] = colors
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

        try:
            i = 6 + deleted
            indices[idx] = i
            colors[idx] = cats[i]["color"]
            deleted += 1

        except IndexError:
            print(f"Sending error reply")
            socket.send(bytes("no more", encoding='utf-8'))
            continue

        # sends back the new main color results
        print(f"Sending reply: {colors[idx]}")
        socket.send_json(colors[idx])

    else:
        socket.send_json(None)

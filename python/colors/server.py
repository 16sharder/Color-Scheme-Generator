import zmq
from get_details import get_details
from delete_color import delete_color
from upload import upload

# creates a socket to receive from the client
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:1952")

# empty variable initialization
colors, counts, dictionary, cats = [], [], {}, []
originals, orig_counts, orig_cats = colors, counts, cats

while True:
    # once a message has been received, decodes it
    message = socket.recv()
    message = message.decode("utf-8")
    message = eval(message)

    # received a path for an image, MUST execute first
    if message[0] == "path":
        image_path = message[1]
        print(f"Received path request: {image_path}")

        # retrieves the main colors from the image
        res = upload(image_path)

        # if res is a string, it is an error message to be returned
        if type(res) == str:
            socket.send(bytes(res, encoding='utf-8'))

        else:
            # establishes variables for use in next sections
            colors, counts, dictionary, cats = res[0], res[1], res[2], res[3]
            originals, orig_counts, orig_cats = colors.copy(), counts.copy(), cats.copy()

            # sends back the main color results
            print(f"Sending reply: {colors}")
            socket.send_json(colors)

    # received request for original colors
    elif message[0] == "originals":
        # resets all variables to original values
        colors, counts, cats = originals.copy(), orig_counts.copy(), orig_cats.copy()

        # sends back original colors
        print(f"Sending originals: {originals}")
        socket.send_json(originals)

    # received request for color details
    elif message[0] == "details":
        print(f"Received request for details")

        details = get_details(cats)

        # sends on the resulting list of categories with highest pixels
        print("Sending details")
        socket.send_json([colors, details])

    # received index for color to be deleted
    elif message[0] == "delete":
        idx = message[1]
        print(f"Received delete request: {idx}")

        # deletes the color from current list and retrieves main color from next cat
        res = delete_color(idx, colors, counts, dictionary, cats)

        # resets all variables to new values
        colors, counts, cats = res[0], res[1], res[2]

        # sends back the new main color results
        print(f"Sending reply: {colors}")
        socket.send_json(colors)

    else:
        socket.send_json(None)

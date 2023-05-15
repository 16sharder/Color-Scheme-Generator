import zmq
from upload import upload
from get_details import get_details
from main_color import calculate_color

# creates a socket to receive from the client
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:1952")

# empty variable initialization
colors, counts, all_pixels, cats = [], [], {}, []
originals = [colors, counts, all_pixels, cats]

responses = {"path": 0,
             "originals": 1,
             "details": 2,}
toggle = False

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
        image_path = message[1]
        print(f"Received path request: {image_path}")

        # retrieves the main colors from the image
        res = upload(image_path)

        # if res is a string, it is an error message to be returned
        if type(res) == str:
            socket.send(bytes(res, encoding='utf-8'))

        else:
            # establishes variables for use in next sections
            colors, counts, all_pixels, cats = res
            originals = [item.copy() for item in res]

            # sends back the main color results
            print(f"Sending reply: {colors}")
            responses["path"] = colors
            toggle = True
            socket.send_json(colors)

    # received request for original colors
    elif message[0] == "originals":
        # resets all variables to original values
        colors, counts, all_pixels, cats = [item.copy() for item in originals]

        # sends back original colors
        print(f"Sending originals: {colors}")
        responses["originals"] = colors
        toggle = True
        socket.send_json(colors)

    # received request for color details
    elif message[0] == "details":
        print(f"Received request for details")

        details = get_details(cats)

        # sends on the resulting list of categories with highest pixels
        print("Sending details")
        responses["details"] = [colors, details]
        toggle = True
        socket.send_json([colors, details])

    # received index for color to be deleted
    elif message[0] == "delete":
        idx = message[1]
        print(f"Received delete request: {idx}")

        # deletes the color from current list and retrieves next most common color
        colors[idx], cats[idx], all_pixels = calculate_color(counts, all_pixels)

        # sends back the new main color results
        print(f"Sending reply: {colors}")
        responses["delete"] = colors
        socket.send_json(colors)

    else:
        socket.send_json(None)

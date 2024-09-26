# color-scheme-generator

This React app takes a user provided image and extracts its colors for use in a color scheme.

The colors in the scheme are based on the quantity of pixels in specific color ranges that are found within the image.

The program process itself is simple - all you have to do is pick an image and click upload. 
The user can also optionally play around with the scheme by swapping colors, editing colors, and more. 
Results from the program can be downloaded as a pdf for future use. 

Interacts with a microservice created for this project by Michael Hrenko, with the purpose of converting color codes from RGB to HSB and back.

Please feel free to leave me any comments or suggestions!




To run the program:

Open the software engineering folder in pycharm. 
Open the ms_side.py file in the microservice folder.
Run the file using pycharm's built in run button.
Repeat with the color_server.py file in the python folder.

Open the software engineering folder in visual studio. 
Open two terminals, and cd into color-scheme-back and color-scheme-generator.
Input npm start into both terminals, starting with the back end terminal.

A browser should open automatically with the application running.

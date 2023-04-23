// The Loading Page:
// Shown after the user has uploaded an image
// This page displays for 15 seconds, allowing the program to analyze the colors
// Sends the user to the results page once colors are retrieved

import React from 'react';
import {useHistory} from "react-router-dom"

import { getColors, resetFile } from '../requests/requests';

function LoadingPage () {const history = useHistory()

    const send = async () => {
        const colors = await getColors()
        resetFile("../textfiles/colors.txt")

        // if there was an error with the file path, asks the user to try again
        if (colors == "File not found"){
            alert("File not found - Please try again")
            history.push({pathname: "/"})
        }
        else if (colors == "Directory"){
            alert("A folder is not a valid image - Please try again")
            history.push({pathname: "/"})
        }
        // if there was no error, continues to the results page
        else history.push({pathname: "/results", state: {colors: colors}})

        // reloads the page to allow user to input again successfully
        window.location.reload()
    }

    // timer causes the send function to wait 15 seconds before execution
    setTimeout(send, 15000)

    return(
        <>
            <h1>Currently generating your colors...</h1>
            <h4>This will take about 15 seconds</h4>
        </>
    )
}

export default LoadingPage
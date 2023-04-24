// The Loading Page:
// Shown after the user has uploaded an image
// This page displays for 15 seconds, allowing the program to analyze the colors
// Sends the user to the results page once colors are retrieved

import React from 'react';
import {useHistory} from "react-router-dom"

import { getColors, resetFile } from '../helpers/requests';

function LoadingPage () {const history = useHistory()

    const send = async () => {
        let colorString = await getColors()
        resetFile("../textfiles/colors.txt")

        // if there was an error with the file path, asks the user to try again
        if (colorString == "File not found"){
            alert("File not found - Please try again")
            history.push({pathname: "/"})
        }
        else if (colorString == "Directory"){
            alert("A folder is not a valid image - Please try again")
            history.push({pathname: "/"})
        }
        // if there was no error, continues to the results page
        else{
            // cuts off the unnecessary first and last chars
            colorString = colorString.slice(1, colorString.length - 1)

            // splits the string to retrieve 6 single strings, one for each color
            const colorList = colorString.split("), (")
            const colors = []
            for (let color of colorList){
                // splits the color's string and makes it an array of rgb vals
                color = color.split(", ")
                for (let i in color){
                    color[i] = Number(color[i])
                }
                colors.push(color)
            }


            history.push({pathname: "/results", state: {colors: colors}})
        }

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
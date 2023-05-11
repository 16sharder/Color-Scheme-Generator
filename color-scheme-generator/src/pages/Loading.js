// The Loading Page:
// Shown after the user has uploaded an image
// This page displays for 15 seconds, allowing the program to analyze the colors
// Sends the user to the results page once colors are retrieved

import React from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom"
import retrieve from '../helpers/requests';


function LoadingPage () {
    const history = useHistory()
    const location = useLocation()

    const path = location.state.path        //      selected image path in user directory

    const getColors = async () => {
        // sends retreive colors request to Python Server
        // defined in requests.js, sends HTTP request to back end which sends ZMQ request
        let colors = await retrieve(path, '1952')

        // if there was an error with the file path, asks the user to try again
        if (colors == "File not found"){
            alert("File not found - Please try again")
            history.push({pathname: "/"})
        }
        else if (colors == "Directory"){
            alert("A folder is not a valid image - Please try again")
            history.push({pathname: "/"})
        }
        else if (colors == "Permission denied"){
            alert("You do not have permission to access that image - Please try again")
            history.push({pathname: "/"})
        }

        // if no error, retrieves the hsv vals and sends the user on to colors page when ready
        else{
            const HSV = []
            for (let color of colors) {
                const rgb = color.slice()
                rgb.push("r")
                const hsv = await retrieve(JSON.stringify(rgb), 7170)
                HSV.push(hsv)
            }
            history.push({pathname: "/results", state: {rgbs: colors, hsvs: HSV}})
        }
    }

    useEffect(() => {
        getColors()
    }, [])


    return(
        <>
            <h1>Examining your image and generating your colors...</h1>
            <h4>This will take about 10 seconds</h4>
        </>
    )
}

export default LoadingPage
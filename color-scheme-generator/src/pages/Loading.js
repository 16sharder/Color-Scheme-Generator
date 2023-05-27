// The Loading Page:
// Shown after the user has uploaded an image
// This page displays until the program has analyzed the image colors
// Sends the user to the results page once colors are retrieved

import React from 'react';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom"
import retrieve from '../helpers/requests';
import { convertHex } from '../helpers/converters';


function LoadingPage () {
    const history = useHistory()

    const getColors = async () => {
        // sends retreive colors request to Python Server
        let colors = await retrieve(JSON.stringify(["path"]), 1952)

        // if there was an error with the file path, asks the user to try again
        if (colors == "File not found"){
            alert(`File not found - Please try again`)
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

        // if no error, retrieves the hsv and hex vals and sends the user on to colors page when ready
        else{
            const HSV = [], hexvals = []
            for (let color of colors) {
                // retrieves the hsv vals from microservice
                const rgb = color.slice()
                rgb.push("r")
                const hsv = await retrieve(JSON.stringify(rgb), 7170)
                HSV.push(hsv)

                let hex = convertHex(color)
                hexvals.push(hex)
            }

            const current = {hexs: hexvals, rgbs: colors, hsvs: HSV, idxs: [0, 1, 2, 3, 4, 5]}
            history.push({pathname: "/results", state: {current: current}})
        }
    }

    useEffect(() => {
        getColors()
    }, [])


    return(
        <>
            <h1>Examining your image and generating your colors...</h1>
            <h4>This may take between 10 and 20 seconds</h4>
        </>
    )
}

export default LoadingPage
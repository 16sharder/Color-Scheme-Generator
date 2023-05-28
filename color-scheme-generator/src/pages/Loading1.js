// The Loading Page:
// Shown after the user has uploaded an image
// This page displays until the program has analyzed the image colors
// Sends the user to the results page once colors are retrieved

import React from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom"
import retrieve from '../helpers/requests';


function Loading1Page () {
    const history = useHistory()
    const location = useLocation()

    const pushImage = async () => {
        // sends retreive colors request to Python Server
        let seconds = await retrieve(JSON.stringify(["path"]), 1952)

        // if there was an error with the file path, asks the user to try again
        if (seconds == "File not found"){
            alert(`File not found - Please try again`)
            history.push({pathname: "/"})
        }
        else if (seconds == "Directory"){
            alert("A folder is not a valid image - Please try again")
            history.push({pathname: "/"})
        }
        else if (seconds == "Permission denied"){
            alert("You do not have permission to access that image - Please try again")
            history.push({pathname: "/"})
        }
        else if (seconds == "Not jpg"){
            alert("Please upload a jpg file")
            history.push({pathname: "/"})
        }

        // if no error, retrieves the hsb and hex vals and sends the user on to colors page when ready
        else history.push({pathname: "/loading2", state: {seconds: seconds}})
    }

    useEffect(() => {
        pushImage()
    }, [])


    return(
        <>
            <h1>Examining your image...</h1>
            <h4>This part should take about {location.state.seconds} seconds</h4>
        </>
    )
}

export default Loading1Page
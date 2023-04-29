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
        let colorString = await retrieve(path, '1952')


        // if there was an error with the file path, asks the user to try again
        if (colorString == "File not found"){
            alert("File not found - Please try again")
            history.push({pathname: "/"})
        }
        else if (colorString == "Directory"){
            alert("A folder is not a valid image - Please try again")
            history.push({pathname: "/"})
        }
        else if (colorString == "Permission denied"){
            alert("You do not have permission to access that image - Please try again")
            history.push({pathname: "/"})
        }


        // if there was no error, retreives the rgb number vals from string
        else{
            // cuts off the unnecessary first and last chars
            colorString = colorString.slice(1, colorString.length - 1)

            // string is in format "color1), (color2), (... ), (color6"
            const colorList = colorString.split("), (")
            const colors = []
            
            for (let color of colorList){
                // each color is in format "r, g, b"
                color = color.split(", ")

                // iterates over r, g, and b in color
                for (let i in color){
                    color[i] = Number(color[i])
                }
                // adds the array of rgb numbers to the array of all colors
                colors.push(color)
            }

            // automatically sends the user on to colors page when ready
            history.push({pathname: "/results", state: {colors: colors}})
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
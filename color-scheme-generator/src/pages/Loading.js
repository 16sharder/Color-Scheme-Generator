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
        resetFile()
        history.push({pathname: "/results", state: {colors: colors}})
    }

    setTimeout(send, 15000)

    return(
        <>
            <h1>Currently generating your colors...</h1>
            <h4>This will take about 15 seconds</h4>
        </>
    )
}

export default LoadingPage
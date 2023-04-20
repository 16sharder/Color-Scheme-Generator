// The Upload Page:
// Shown when the user arrives at the website
// This page allows the user to upload an image for color scheme generation
// Allows the user to access their folders before sending to results page

import React from 'react';
import {useState} from "react"
import {useHistory} from "react-router-dom"

function UploadPage () {
    const history = useHistory()

    const send = () => {
        history.pushState({pathname: "/results"})
    }

    return(
        <>
            <h2>Upload an image to generate a color scheme</h2>
            <button onClick={() => send()}>Upload</button>
        </>
    )
}

export default UploadPage
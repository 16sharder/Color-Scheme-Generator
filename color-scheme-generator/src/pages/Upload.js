// The Upload Page:
// Shown when the user arrives at the website
// This page allows the user to upload an image for color scheme generation
// Allows the user to access their folders before sending to results page

import React from 'react';
import {useState} from 'react'
import {useHistory} from "react-router-dom"

import { postPath } from '../requests/requests';

function UploadPage () {
    const [filepath, setPath] = useState()

    const history = useHistory()

    const send = async () => {
        postPath(filepath)
        history.push({pathname: "/results"})
    }

    return(
        <>
            <h2>Upload an image to generate a color scheme</h2>
            <form>
                <label>File Path:</label>
                <input type="text" onChange={n => setPath(n.target.value)}></input>
                <br></br>
                <button className='upload' onClick={() => send()}>Upload</button>
            </form>
        </>
    )
}

export default UploadPage
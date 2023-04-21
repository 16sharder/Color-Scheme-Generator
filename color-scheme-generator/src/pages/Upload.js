// The Upload Page:
// Shown when the user arrives at the website
// This page allows the user to upload an image for color scheme generation
// Allows the user to access their folders before sending to results page

import React from 'react';
import {useState} from 'react'
import {useHistory} from "react-router-dom"

function UploadPage () {
    const [filepath, setPath] = useState()

    const history = useHistory()

    const send = async () => {
        const response = await fetch("/upload", {
            method: "POST", 
            body: JSON.stringify({filepath: filepath}),
            headers: {"Content-type": "application/json"}
        })
        if (response.status !== 201){
            alert(`Upload image failed. Status code = ${response.status}`)
        }
        console.log(response)
        // history.push({pathname: "/results"})
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
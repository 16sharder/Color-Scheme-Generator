// The Upload Page:
// Shown when the user has selected an image from the directory
// This page allows the user to upload an image for color scheme generation
// Allows the user to access their folders before sending to results page

import React from 'react';
import {useHistory, useLocation} from "react-router-dom"


function UploadPage () {

    const history = useHistory()
    const location = useLocation()

    const path = location.state.path        //      current path in user directory
    const char = location.state.char        //      "/" or "\\" for Mac vs Windows paths


    // When a previous folder in path is selected, sends to select page to enter that directory
    const ret = (path) => {
        history.push({pathname: "/select1", state: {path: path, char: char}})
    }

    // When upload button is pressed, sends to loading page to retrieve image colors
    const upload = async () => {
        history.push({pathname: "/loading", state: {path: path}})
    }

    return(
        <>
            <h2>Upload an image to generate a color scheme</h2>
            <div className='folderpath'>
                {path.split(char).slice(1, 9).map((folder, i) => 
                <a onClick={() => ret(path.slice(0, path.indexOf(folder)) + folder)} key={i}>{char}{folder}</a>
                )}
                <br/>
                {path.split(char).slice(9, 17).map((folder, i) => 
                <a onClick={() => ret(path.slice(0, path.indexOf(folder)) + folder)} key={i}>{char}{folder}</a>
                )}
                <br/>
                {path.split(char).slice(18, 26).map((folder, i) => 
                <a onClick={() => ret(path.slice(0, path.indexOf(folder)) + folder)} key={i}>{char}{folder}</a>
                )}
            </div>
            <button className='upload' onClick={() => upload()}>Upload</button>
        </>
    )
}

export default UploadPage
// The Upload Page:
// Shown when the user has selected an image from the directory
// This page allows the user to upload an image for color scheme generation
// Allows the user to access their folders before sending to results page

import React from 'react';
import {useHistory, useLocation} from "react-router-dom"

import { postPath, resetFile } from '../helpers/requests';

function UploadPage () {

    const history = useHistory()
    const location = useLocation()

    const path = location.state.path

    resetFile("../textfiles/directory.txt")

    const ret = (path) => {
        history.push({pathname: "/select1", state: {path: path}})
        window.location.reload()
    }

    const send = async () => {
        postPath(path)
        history.push({pathname: "/loading"})
    }

    return(
        <>
            <h2>Upload an image to generate a color scheme</h2>
            <div className='folderpath'>
                {path.split("/").slice(1, 9).map((folder, i) => 
                <a onClick={() => ret(path.slice(0, path.indexOf(folder)) + folder)} key={i}>/{folder}</a>
                )}
                <br/>
                {path.split("/").slice(9, 17).map((folder, i) => 
                <a onClick={() => ret(path.slice(0, path.indexOf(folder)) + folder)} key={i}>/{folder}</a>
                )}
                <br/>
                {path.split("/").slice(18, 26).map((folder, i) => 
                <a onClick={() => ret(path.slice(0, path.indexOf(folder)) + folder)} key={i}>/{folder}</a>
                )}
            </div>
            <button className='upload' onClick={() => send()}>Upload</button>
        </>
    )
}

export default UploadPage
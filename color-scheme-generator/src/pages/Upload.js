// The Upload Page:
// Shown when the user arrives at the website
// This page allows the user to upload an image for color scheme generation
// Allows the user to access their folders before sending to results page

import React from 'react';
import {useState} from 'react'
import {useHistory, useLocation} from "react-router-dom"

import { getDirectory, postPath, readDirectory, resetFile } from '../requests/requests';

function UploadPage () {

    const history = useHistory()
    const location = useLocation()

    const path = location.state.path

    resetFile("../textfiles/directory.txt")

    const ret = (path) => {
        history.push({pathname: "/select1", state: {path: path}})
    }

    const send = async () => {
        postPath(path)
        history.push({pathname: "/loading"})
    }

    return(
        <>
            <h2>Upload an image to generate a color scheme</h2>
            <table>
                <tbody>
                    <tr>
                        {path.split("/").map((folder, i) => 
                        <td className='folder' onClick={() => ret(path.slice(0, path.indexOf(folder)) + folder)} key={i}>{folder}</td>
                        )}
                    </tr>
                </tbody>
            </table>
            <button className='upload' onClick={() => send()}>Upload</button>
        </>
    )
}

export default UploadPage
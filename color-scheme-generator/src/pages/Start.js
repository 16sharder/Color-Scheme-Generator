// The Upload Page:
// Shown when the user arrives at the website
// This page allows the user to start selecting a file
// Sends them to the First Select Page if they select a folder
// Sends them to the Upload Page if they select a file

import React from 'react';
import {useState} from 'react'
import {useHistory} from "react-router-dom"

import { getDirectory, readDirectory, resetFile } from '../helpers/requests';

function StartPage () {

    const history = useHistory()

    const [path, setPath] = useState("/")
    const [curdir, setDir] = useState([])
    const [images, setImgs] = useState([])


    const read = async () => {
        const string = await readDirectory()
        const pd = string.split("*,* ")
        resetFile("../textfiles/directory.txt")

        setPath(pd[0])
        const folders = pd[1]
        const imges = pd[2]

        const directory = folders.split(",* ")
        
        const imgs = imges.split(",* ")

        setDir(directory.slice(0, directory.length - 1))
        setImgs(imgs.slice(0, imgs.length - 1))
    }

    getDirectory("/")
    setTimeout(read, 100)

    const send = async (path) => {
        history.push({pathname: "/select1", state: {path: path}})
        window.location.reload()
    }

    const imgSelect = (path) => {
        history.push({pathname: "/upload", state: {path: path}})
        window.location.reload()
    }

    return(
        <>
            <h2>Upload an image to generate a color scheme</h2>
            <div className='folderpath'>
                {path.split("/").slice(1, 9).map((folder, i) => 
                <a onClick={() => send(path.slice(0, path.indexOf(folder)) + folder)} key={i}>/{folder}</a>
                )}
                <br/>
                {path.split("/").slice(9, 17).map((folder, i) => 
                <a onClick={() => send(path.slice(0, path.indexOf(folder)) + folder)} key={i}>/{folder}</a>
                )}
                <br/>
                {path.split("/").slice(18, 26).map((folder, i) => 
                <a onClick={() => send(path.slice(0, path.indexOf(folder)) + folder)} key={i}>/{folder}</a>
                )}
            </div>
            <table>
                <tbody>
                    <tr>
                        <td className='folder'>
                            Folders: <br/>
                            {curdir.map((item, i) => 
                            <div className='folder' onClick={() => send(path + "/" + item)} key={i}>{item}</div>
                            )}
                        </td>
                        <td className='folder'>
                            <br />
                            Images: <br/>
                            {images.map((item, i) => 
                            <div className='folder' onClick={() => imgSelect(path + "/" + item)} key={i}>{item}</div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            <br/>
        </>
    )
}

export default StartPage
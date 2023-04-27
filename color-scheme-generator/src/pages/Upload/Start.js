// The Upload Page:
// Shown when the user arrives at the website
// This page allows the user to start selecting a file
// Sends them to the First Select Page if they select a folder
// Sends them to the Upload Page if they select a file

import React from 'react';
import {useState} from 'react'
import {useHistory} from "react-router-dom"

import { readDirectory, resetFile } from '../../helpers/requests';
import { getDirectory } from '../../helpers/zmq';
import { sendMessage } from '../../helpers/rabbitmq';

function StartPage () {

    const history = useHistory()

    const [path, setPath] = useState("/")
    const [curdir, setDir] = useState([])
    const [images, setImgs] = useState([])


    sendMessage("Hello world")
    const string = "*,* ,* *,* ,* "
    const pd = string.split("*,* ")

    setPath(pd[0])
    const folders = pd[1]
    const imges = pd[2]

    const directory = folders.split(",* ")
    
    const imgs = imges.split(",* ")

    setDir(directory.slice(0, directory.length - 1))
    setImgs(imgs.slice(0, imgs.length - 1))

    const send = async (filepath) => {
        history.push({pathname: "/select1", state: {path: filepath}})
        window.location.reload()
    }

    const imgSelect = (filepath) => {
        history.push({pathname: "/upload", state: {path: filepath}})
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
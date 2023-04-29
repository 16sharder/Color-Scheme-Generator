// The Start Page:
// Shown when the user arrives at the website
// This page allows the user to start selecting a file
// Sends them to the First Select Page if they select a folder
// Sends them to the Upload Page if they select a file

import React from 'react';
import {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom"

import retrieve from '../../helpers/requests';

function StartPage () {

    const history = useHistory()

    const [path, setPath] = useState("/")       //      current path in user directory
    const [char, setChar] = useState("/")       //      "/" or "\\" for Mac vs Windows paths
    const [folders, setFldr] = useState([])     //      array of folders in current directory
    const [images, setImgs] = useState([])      //      array of images in current directory

    const getDirectory = async () => {
        // sends retreive directory request to Python Server
        // defined in requests.js, sends HTTP request to back end which sends ZMQ request
        const string = await retrieve("/", "1951")

        // response is in format "path*,* folders*,* images"
        const pd = string.split("*,* ")

        setPath(pd[0])
        const fldrs = pd[1]
        const imges = pd[2]

        // determines whether char should be "/" or "\\"
        const i = pd[0].indexOf("/")
        if (i == -1) setChar("\\")

        // folders is in format "folder1,* folder2,*"
        const directory = fldrs.split(",* ")

        // images is in format "image1,* image2,*"
        const imgs = imges.split(",* ")

        // sets folders and images arrays without empty last elem
        setFldr(directory.slice(0, directory.length - 1))
        setImgs(imgs.slice(0, imgs.length - 1))
    }

    useEffect(() => {
        getDirectory()
    }, [])

    // When a folder is selected, sends to next page to enter that directory
    const send = async (filepath) => {
        history.push({pathname: "/select1", state: {path: filepath, char: char}})
    }

    // When an image is selected, sends to upload page
    const imgSelect = (filepath) => {
        history.push({pathname: "/upload", state: {path: filepath, char: char}})
    }

    return(
        <>
            <h2>Upload an image to generate a color scheme</h2>
            <div className='folderpath'>
                {path.split(char).slice(1, 9).map((folder, i) => 
                <a onClick={() => send(path.slice(0, path.indexOf(folder)) + folder)} key={i}>{char}{folder}</a>
                )}
                <br/>
                {path.split(char).slice(9, 17).map((folder, i) => 
                <a onClick={() => send(path.slice(0, path.indexOf(folder)) + folder)} key={i}>{char}{folder}</a>
                )}
                <br/>
                {path.split(char).slice(18).map((folder, i) => 
                <a onClick={() => send(path.slice(0, path.indexOf(folder)) + folder)} key={i}>{char}{folder}</a>
                )}
            </div>
            <table>
                <tbody>
                    <tr>
                        <td className='folder'>
                            Folders: <br/>
                            {folders.map((item, i) => 
                            <div className='folder' onClick={() => send(path + char + item)} key={i}>{item}</div>
                            )}
                        </td>
                        <td className='folder'>
                            <br />
                            Images: <br/>
                            {images.map((item, i) => 
                            <div className='folder' onClick={() => imgSelect(path + char + item)} key={i}>{item}</div>
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
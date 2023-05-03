// The Second Select Page:
// Shown alternately with the First Select Page while the user is choosing a file
// This page allows the user to select a file or a folder
// Sends them to the First Select Page if they select a folder
// Sends them to the Upload Page if they select a file

import React from 'react';
import {useState, useEffect} from 'react'
import {useHistory, useLocation} from "react-router-dom"

import retrieve from '../../helpers/requests';

function Select2Page () {

    const history = useHistory()
    const location = useLocation()

    const char = location.state.char            //      "/" or "\\" for Mac vs Windows paths

    const [path, setPath] = useState(location.state.path)   //      current path in user directory
    const [folders, setFldr] = useState([])                 //      array of folders in current directory
    const [images, setImgs] = useState([])                  //      array of images in current directory
    
    const getDirectory = async () => {
        // sends retreive directory request to Python Server
        // defined in requests.js, sends HTTP request to back end which sends ZMQ request
        const res = await retrieve(path, "1951")
        
        if (res == "Permission denied") {
            setFldr(["Permission denied"])
            setImgs(["Permission denied"])
        } else {
            setPath(res["path"])
            setFldr(res["folders"])
            setImgs(res["images"])
        }
    }

    useEffect(() => {
        getDirectory()
    }, [])


    // When a folder is selected, sends to next page to enter that directory
    const send = (filepath) => {
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
                {path.split(char).slice(18, 26).map((folder, i) => 
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
                            <br />
                        </td>
                        <td className='folder'>
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

export default Select2Page
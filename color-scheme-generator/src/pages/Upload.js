// The Upload Image Page:
// Shown when the user first accesses the site
// This page allows the user to upload an image from their local files
// Sends the user on to the loading page once uploaded

// Source for file managing code: https://w3collective.com/preview-selected-img-file-input-js/

import React, { useEffect, useState } from 'react';
import {useHistory} from "react-router-dom"

import { postImage } from '../helpers/requests';


function Upload() {
    const history = useHistory()

    // source used to display a preview of the image
    const [source, setSource] = useState("")


    // executed when an image is chosen; retrieves the data from the image
    const getImgData = async () => {
        setButton("100%")
        setPointer("pointer")

        // retrieves the files from the chooseFile input button
        const chooseFile = document.getElementById("choose-file");
        const files = chooseFile.files[0];

        if (files) {
            // creates a file reader for extracting the file data
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.onload = async function () {

                // sets the preview
                setSource(this.result)

                // copies the data to image.js, where python can then use it
                const data = this.result.replace("data:image/jpeg;base64,", "")
                const res = await postImage(data)

                if (res == "failed") {
                    alert("Upload image failed. Please try again")
                    setSource("")
                }
                else if (res == "large") {
                    alert("Your image is too large. Please keep your image under 15MB")
                    setSource("")
                }
            };    
        }
    }

    const [buttonFade, setButton] = useState("40%")
    const [pointer, setPointer] = useState("initial")

    const upload = async () => {
        if (buttonFade == "40%") alert("Please select an image")
        else history.push({pathname: "/loading"})
    }


    return (
        <>
            <h2>Upload an image to generate a color scheme</h2>

            <div className="image">
                <img src={source} alt="image"></img>
            </div>

            <table className='upload'><tbody><tr>
                <td>
                    <button id="cf-button">Choose File</button>
                </td>
                <td>
                <input type="file" id="choose-file" name="choose-file" accept="image/*" 
                    onChange={() => getImgData()}/>
                </td>
                <td>
                    <button style={{"opacity": buttonFade, "cursor": pointer}} onClick={() => upload()}>Upload</button>
                </td>
            </tr></tbody></table>
        </>
    )
}

export default Upload
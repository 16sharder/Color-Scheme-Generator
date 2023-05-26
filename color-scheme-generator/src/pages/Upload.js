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

    // creates a variable for the choose file input button
    let chooseFile;
    useEffect(() => {
        chooseFile = document.getElementById("choose-file");
    }, [document.getElementById("choose-file")])

    // source used to display a preview of the image
    const [source, setSource] = useState("")


    // executed when an image is chosen; retrieves the data from the image
    const getImgData = async () => {
        const files = chooseFile.files[0];
        if (files) {
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

    const upload = async () => {
        history.push({pathname: "/loading"})
    }


    return (
        <>
            <h2>Upload an image to generate a color scheme</h2>

            <input type="file" id="choose-file" name="choose-file" accept="image/*" 
                onChange={() => getImgData()}/>

            <img src={`${source}`}></img>

            <button className='upload' onClick={() => upload()}>Upload</button>
        </>
    )
}

export default Upload
// Source for file managing code: https://w3collective.com/preview-selected-img-file-input-js/

import React, { useEffect, useState } from 'react';
import {useHistory} from "react-router-dom"

import { postImage } from '../helpers/requests';


function Upload() {
    const history = useHistory()

    let chooseFile;

    useEffect(() => {
        chooseFile = document.getElementById("choose-file");
    }, [document.getElementById("choose-file")])


    const [source, setSource] = useState("")


    const getImgData = async () => {
        const files = chooseFile.files[0];
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.onload = async function () {
                setSource(this.result)

                const data = this.result.replace("data:image/jpeg;base64,", "")
                const res = await postImage(data)

                console.log(res)
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
// The View Details Page:
// Shown once the user clicks "See Image Details" from the Results page
// This page shows the user the presice percentage that each specific pixel has appeared 
// Includes a return button to go back to the results

import React from 'react';
import {useState, useEffect} from "react"
import {useHistory, useLocation} from "react-router-dom"
import { getDetails } from '../helpers/requests';
import { convertHex } from './Results';

function ViewDetails () {

    const history = useHistory()
    const location = useLocation()

    const mainColors = location.state.colors
    const rgbs = location.state.rgbs
    const text = location.state.text

    const [allPixels, setPixels] = useState([[], [], [], [], [], []])

    const read = async () => {
        let colorString = await getDetails()

        const catList = colorString.split("*,* ")
        const catPixs = []
        for (let category of catList){
            category = category.slice(1, category.length - 3)
            const pixelArray = category.split("], [")
            const pixels = []
            for (let pixel of pixelArray){
                // splits the pixel's string and makes it an array of rgb vals
                pixel = pixel.split(", ")
                let hex = "#"
                for (let i in pixel.slice(0, 3)){
                    pixel[i] = Number(pixel[i])
                    // converts number to hex and adds to hex val
                    const hex2 = pixel[i] % 16
                    const hex1 = (pixel[i] - hex2) / 16
                    hex = hex.concat(convertHex(hex1))
                    hex = hex.concat(convertHex(hex2))
                }
                hex = hex.concat(" " + pixel[3])
                pixels.push(hex)
            }
            catPixs.push(pixels)
        }
        setPixels(catPixs)
    }

    useEffect(() => {
        read()
    }, [])

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>
                    Here is a list of 600 of the colors that appear in your
                    image. The numbers to the right of each hex value represent
                    the number of pixels of that color in your image.
                    </th>
                    <th>
                        <button onClick={() => history.push({pathname: "/results", state: {colors: rgbs}})}>Return to Results</button>
                    </th>
                </tr>
            </thead>
        </table>
        <table className='details'>
            <tbody>
                <tr>
                    {mainColors.map((color, i) => 
                    <td style={{"backgroundColor": color, "color": text[i]}} key={i}>
                        <h4>{color}</h4>
                        <table>
                            <tbody>
                            {allPixels[i].map((pixel, i) => 
                            <tr key={i}>
                                <td>{pixel.slice(0, 7)}</td>
                                <td style={{"backgroundColor": pixel.slice(0, 7)}}>{pixel.slice(8)}</td>
                            </tr>
                            )}
                            </tbody>
                        </table>
                    </td>)}
                </tr>
            </tbody>
        </table>
        </>
    )
}


export default ViewDetails
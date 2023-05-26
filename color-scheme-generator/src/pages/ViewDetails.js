// The View Details Page:
// Shown once the user clicks "See Image Details" from the Results page
// This page shows the user the presice percentage that each specific pixel has appeared 
// Includes a return button to go back to the results

import React from 'react';
import {useState, useEffect} from "react"
import {useHistory, useLocation} from "react-router-dom"

import retrieve from '../helpers/requests';
import { convertHex } from '../helpers/converters';
import { determineText } from '../helpers/text_colors';


function ViewDetails () {

    const history = useHistory()
    const location = useLocation()

    const [mainColors, setColors] = useState([])
    const [text_arr, setText] = useState([])

    // A set of arrays for each color category - each array holds top 100 pixels in that category
    const [allPixels, setPixels] = useState(new Array(6).fill([]))

    const getPixels = async () => {
        // sends retreive details request to Python Server
        const response = await retrieve(JSON.stringify(["details"]), 1952)
        const originals = response[0]
        const details = response[1]

        // converts the colors from rgb to hex and hsv
        const hexs = [], hsvs = []
        for (const rgb of originals){
            hexs.push(convertHex(rgb))

            rgb.push("r")
            const hsv = await retrieve(JSON.stringify(rgb), 7170)
            hsvs.push(hsv)
        }

        // establishes main colors and text colors to display
        setColors(hexs)
        setText(determineText(hsvs))

        const cats = []

        // iterates over each of 6 color categories
        for (let i=1; i<7; i++) {
            const category = details[`cat${i}`]
            const pixels = []

            // iterates over each pixel in the category and converts it to hex
            for (let pixel of category) {
                let hex = convertHex(pixel.slice(0, 3))

                // adds that pixel's quantity to the end
                hex = hex.concat(" " + pixel[3])
                pixels.push(hex)
            }
            cats.push(pixels)
        }
        setPixels(cats)
    }

    useEffect(() => {
        getPixels()
    }, [])

    return (
        <>
        <table><thead><tr>
                    <th>
                    Here is a list of 600 of the colors that appear in your
                    image. The numbers to the right of each hex value represent
                    the number of pixels of that color in your image.
                    </th>
                    <th>
                        <button onClick={() => history.push({pathname: "/results", state: location.state})}>Return to Results</button>
                    </th>
        </tr></thead></table>

        <table className='details'><tbody><tr>

                    {mainColors.map((color, i) => 
                    <td style={{"backgroundColor": color, "color": text_arr[i]}} key={i}>
                        <h4>{color}</h4>

                        <table><tbody>
                            {allPixels[i].map((pixel, i) => 
                            <tr key={i}>
                                <td>{pixel.slice(0, 7)}</td>
                                <td style={{"backgroundColor": pixel.slice(0, 7)}}>{pixel.slice(8)}</td>
                            </tr>
                            )}
                        </tbody></table>

                    </td>)}

        </tr></tbody></table>
        </>
    )
}


export default ViewDetails
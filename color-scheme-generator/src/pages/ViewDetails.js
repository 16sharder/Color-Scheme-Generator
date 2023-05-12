// The View Details Page:
// Shown once the user clicks "See Image Details" from the Results page
// This page shows the user the presice percentage that each specific pixel has appeared 
// Includes a return button to go back to the results

import React from 'react';
import {useState, useEffect} from "react"
import {useHistory, useLocation} from "react-router-dom"

import retrieve from '../helpers/requests';
import { convertHex } from '../helpers/converters';

function ViewDetails () {

    const history = useHistory()
    const location = useLocation()
    const text = location.state.text                //      array of determined text colors (black or white)

    const [mainColors, setColors] = useState([])

    // A set of arrays for each color category - each array holds all pixels in that category
    const [allPixels, setPixels] = useState([[], [], [], [], [], []])

    const getPixels = async () => {
        // sends retreive details request to Python Server
        // defined in requests.js, sends HTTP request to back end which sends ZMQ request
        const response = await retrieve(JSON.stringify(["details"]), 1952)
        const originals = response[0]
        const details = response[1]

        // converts the colors from rgb to hex
        const hexs = []
        for (const rgb of originals){
            hexs.push(convertHex(rgb))
        }
        setColors(hexs)

        const cats = []

        // iterates over each of 6 color categories
        for (let i=1; i<7; i++) {
            const category = details[`cat${i}`]
            const pixels = []

            // iterates over each pixel in the category and converts it to hex
            for (let pixel of category) {
                let hex = convertHex(pixel.slice(0, 3))
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
        <table>
            <thead>
                <tr>
                    <th>
                    Here is a list of 600 of the colors that appear in your
                    image. The numbers to the right of each hex value represent
                    the number of pixels of that color in your image.
                    </th>
                    <th>
                        <button onClick={() => history.push({pathname: "/results", state: {current: location.state.current}})}>Return to Results</button>
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
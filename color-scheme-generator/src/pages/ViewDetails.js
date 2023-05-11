// The View Details Page:
// Shown once the user clicks "See Image Details" from the Results page
// This page shows the user the presice percentage that each specific pixel has appeared 
// Includes a return button to go back to the results

import React from 'react';
import {useState, useEffect} from "react"
import {useHistory, useLocation} from "react-router-dom"
import retrieve from '../helpers/requests';
import { convertHex } from './Results';

function ViewDetails () {

    const history = useHistory()
    const location = useLocation()

    const mainColors = location.state.colors        //      array of generated hex colors
    const rgbs = location.state.rgbs                //      array of generated rgb colors (for passing use)
    const hsvs = location.state.hsvs                //      array of generated rgb colors (for passing use)
    const text = location.state.text                //      array of determined text colors (black or white)

    // A set of arrays for each color category - each array holds all pixels in that category
    const [allPixels, setPixels] = useState([[], [], [], [], [], []])

    const getPixels = async () => {
        // sends retreive details request to Python Server
        // defined in requests.js, sends HTTP request to back end which sends ZMQ request
        const details = await retrieve("null", "1952")
        const cats = []

        // iterates over each of 6 color categories
        for (let i=1; i<7; i++) {
            const category = details[`cat${i}`]
            const pixels = []

            // iterates over each pixel in the category and converts it to hex
            for (let pixel of category) {
                let hex = "#"
                for (let p of pixel.slice(0, 3)) {
                    const hex2 = p % 16
                    const hex1 = (p - hex2) / 16
                    hex = hex.concat(convertHex(hex1))
                    hex = hex.concat(convertHex(hex2))
                }
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
                        <button onClick={() => history.push({pathname: "/results", state: {rgbs: rgbs, hsvs: hsvs}})}>Return to Results</button>
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
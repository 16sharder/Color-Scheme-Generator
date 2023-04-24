// The Results Page:
// Shown once the user has uploaded an image
// This page shows the user their generated color scheme
// Includes buttons to other pages for playing with the scheme
// Includes an upload button to generate a new scheme

import React from 'react';
// import {useState} from "react"
import {useHistory, useLocation} from "react-router-dom"

function convertHex (num) {
    // converts a number from 0 to 15 to hex string
    let hex;
    if (num == 10) hex = "A"
    else if (num == 11) hex = "B"
    else if (num == 12) hex = "C"
    else if (num == 13) hex = "D"
    else if (num == 14) hex = "E"
    else if (num == 15) hex = "F"
    else hex = String(num)
    return hex
}

function ResultsPage () {
    const history = useHistory()
    const location = useLocation()

    // retrieves the string of rgb vals
    const rgbs = location.state.colors

    const hexvals = [], text = []

    // for each color creates hex vals
    for (let color of rgbs){
        let hex = "#", blk = false
        // for each number in the color, calculates hex
        for (let i in color){
            // blk variable used to determine if color is light or dark
            if (color[i] > 175) blk = true

            // converts number to hex and adds to hex val
            const hex2 = color[i] % 16
            const hex1 = (color[i] - hex2) / 16
            hex = hex.concat(convertHex(hex1))
            hex = hex.concat(convertHex(hex2))
        }
        hexvals.push(hex)
        if (blk) text.push("black")
        else text.push("white")
    }

    return(
        <>
            <h2>Here is your color scheme:</h2>
            <h4>Select a color to edit or discard it</h4>
            <table className="colors">
                <tbody>
                    <tr>
                        <td><button>Modify Scheme</button></td>
                        {hexvals.slice(0, 3).map((color, i) => 
                        <td className="color" style={{"backgroundColor": color, "color": text[i]}} key={i}>
                            <div className='stats'>{color}
                            <br/>rgb({rgbs[i][0]}, {rgbs[i][1]}, {rgbs[i][2]})</div>
                        </td>)}
                        <td><button>Hide Color Statistics</button></td>
                    </tr>
                    <tr>
                        <td><button>Restore Original Colors</button></td>
                        {hexvals.slice(3, 6).map((color, i) => 
                        <td className="color" style={{"backgroundColor": color, "color": text[i+3]}} key={i}>
                            <div className='stats'>{color}
                            <br/>rgb({rgbs[i+3][0]}, {rgbs[i+3][1]}, {rgbs[i+3][2]})</div>
                        </td>)}
                        <td><button onClick={() => history.push({pathname: "/details", state: {colors: hexvals, rgbs: rgbs, text: text}})}>See Image Details</button></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button>Download Results</button></td>
                        <td></td>
                        <td><button onClick={() => history.push({pathname: "/"})}>Upload New Image</button></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default ResultsPage
export {convertHex}
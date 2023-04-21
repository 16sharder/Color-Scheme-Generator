// The Results Page:
// Shown once the user has uploaded an image
// This page shows the user their generated color scheme
// Includes buttons to other pages for playing with the scheme
// Includes an upload button to generate a new scheme

import React from 'react';
// import {useState} from "react"
import {useHistory, useLocation} from "react-router-dom"

function convertHex (num) {
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

    // retrieves the string of rgb vals, cutting off unneccessary first and last char
    let colorString = location.state.colors
    colorString = colorString.slice(1, colorString.length - 1)

    const send = () => {
        history.push({pathname: "/"})
    }

    const rgbs = [], hexvals = [], text = []
    // splits the string to retrieve 6 single strings, one for each color
    const colorList = colorString.split("), (")
    for (let color of colorList){
        // splits the color's string and makes it an array of ints
        color = color.split(", ")
        let hex = "#", blk = false
        for (let i in color){
            color[i] = Number(color[i])
            if (color[i] > 175) blk = true

            const hex2 = color[i] % 16
            const hex1 = (color[i] - hex2) / 16
            hex = hex.concat(convertHex(hex1))
            hex = hex.concat(convertHex(hex2))
        }
        rgbs.push(color)
        hexvals.push(hex)
        if (blk) text.push("black")
        else text.push("white")
    }

    return(
        <>
            <h2>Here is your color scheme:</h2>
            <h4>Select a color to edit or discard it</h4>
            <table>
                <tbody>
                    <tr>
                        {hexvals.slice(0, 3).map((color, i) => 
                        <td style={{"backgroundColor": color, "color": text[i]}} key={i}>
                            <div className='stats'>{color}
                            <br/>rgb({rgbs[i][0]}, {rgbs[i][1]}, {rgbs[i][2]})</div>
                        </td>)}
                    </tr>
                    <tr>
                        {hexvals.slice(3, 6).map((color, i) => 
                        <td style={{"backgroundColor": color, "color": text[i+3]}} key={i}>
                            <div className='stats'>{color}
                            <br/>rgb({rgbs[i+3][0]}, {rgbs[i+3][1]}, {rgbs[i+3][2]})</div>
                        </td>)}
                    </tr>
                </tbody>
            </table>
            <button onClick={() => send()}>Upload New Image</button>
        </>
    )
}

export default ResultsPage
// The Results Page:
// Shown once the user has uploaded an image
// This page shows the user their generated color scheme
// Includes buttons to other pages for playing with the scheme
// Includes an upload button to generate a new scheme

import React from 'react';
// import {useState} from "react"
import {useHistory, useLocation} from "react-router-dom"

function ResultsPage () {
    const history = useHistory()
    const location = useLocation()

    const colorList = location.state.colors
    console.log(colorList)

    const send = () => {
        history.push({pathname: "/"})
    }

    // creation of 6 random colors
    const colors = [], rgbs = [], text = []
    for (let r=0; r<6; r++) {
        let color = "#", two = true, thr = 0, rgb = [], blk = false
        for (let i=0; i<6; i++) {
            // chooses 6 random numbers per color, from 1 to 16
            let val = Math.floor(Math.random() * 16);

            // for every 2 numbers, multiplies first by 16
            if (two) {
                thr = val * 16
                two = false
            // adds second to first, creating 1 out of 3 rgb vals
            } else {
                rgb.push(thr+val)
                if (thr+val > 175) blk = true
                thr = 0
                two = true
            }

            // for each random num, determines its hex val
            if (val == 10) val = "A"
            else if (val == 11) val = "B"
            else if (val == 12) val = "C"
            else if (val == 13) val = "D"
            else if (val == 14) val = "E"
            else if (val == 15) val = "F"
            else val = String(val)
            color = color.concat(val)
        }
        // pushes calculated hex val and rgb vals
        if (blk) text.push("black")
        else text.push("white")
        colors.push(color)
        rgbs.push(rgb)
    }

    return(
        <>
            <h2>Here is your color scheme:</h2>
            <h4>Select a color to edit or discard it</h4>
            <table>
                <tbody>
                    <tr>
                        {colors.slice(0, 3).map((color, i) => 
                        <td style={{"backgroundColor": color, "color": text[i]}} key={i}>
                            <div className='stats'>{color}
                            <br/>rgb({rgbs[i][0]}, {rgbs[i][1]}, {rgbs[i][2]})</div>
                        </td>)}
                    </tr>
                    <tr>
                        {colors.slice(3, 6).map((color, i) => 
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
// The Results Page:
// Shown once the user has uploaded an image
// This page shows the user their generated color scheme
// Includes buttons to other pages for playing with the scheme
// Includes an upload button to generate a new scheme

import React from 'react';
import {useState} from "react"
import {useHistory} from "react-router-dom"

function ResultsPage () {
    const history = useHistory()

    const send = () => {
        history.pushState({pathname: "/results"})
    }

    const colors = []
    for (let r=0; r<6; r++) {
        let value = []
        for (let i=1; i<7; i++) {
            const val = Math.floor(Math.random() * 16);
            value.push(val)
        }
        let color = "#"
        for (let val of value){
            if (val == 10) val = "a"
            else if (val == 11) val = "b"
            else if (val == 12) val = "c"
            else if (val == 13) val = "d"
            else if (val == 14) val = "e"
            else if (val == 15) val = "f"
            else val = String(val)
            color = color.concat(val)
        }
        colors.push(color)
    }

    return(
        <>
            <h2>Here is your color scheme:</h2>
            <h4>Select a color to edit or discard it</h4>
            <table>
                <tbody>
                    <tr>
                        <td style={{"backgroundColor": colors[0]}}><div className='stats'>Color 1</div></td>
                        <td style={{"backgroundColor": colors[1]}}><div className='stats'>Color 2</div></td>
                        <td style={{"backgroundColor": colors[2]}}><div className='stats'>Color 3</div></td>
                    </tr>
                    <tr>
                        <td style={{"backgroundColor": colors[3]}}><div className='stats'>Color 4</div></td>
                        <td style={{"backgroundColor": colors[4]}}><div className='stats'>Color 5</div></td>
                        <td style={{"backgroundColor": colors[5]}}><div className='stats'>Color 6</div></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => send()}>Upload</button>
        </>
    )
}

export default ResultsPage
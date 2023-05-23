// The Results Page:
// Shown once the user has uploaded an image
// This page shows the user their generated color scheme
// Includes buttons to other pages for playing with the scheme
// Includes an upload button to generate a new scheme

import React from 'react';
import {useState} from "react"
import {useHistory, useLocation} from "react-router-dom"
import retrieve from '../helpers/requests';
import { convertHex } from '../helpers/converters';

function ResultsPage () {
    const history = useHistory()
    const location = useLocation()

    const current = location.state.current

    const rgbs = current.rgbs
    const hsvs = current.hsvs
    const hexvals = current.hexs

    // determines if color's stat text should be white or black
    const btext = []
    for (let hsv of hsvs){
        if (210 < hsv[0] && hsv[0] < 290 && hsv[1] > 65) btext.push("white")
        else if (hsv[2] > 65) btext.push("black")
        else btext.push("white")
    }

    // text is the list of colors the stat text should be (black, white, or invisible)
    const[text, setText] = useState(btext)
    // hs stands for hide/show; used for toggling text display
    const[hs, setHS] = useState("Hide")

    // function to toggle color stat text between invis and not
    const changeText = () => {
        if (hs == "Show") {
            setText(btext)
            setHS("Hide")
        } else if (hs == "Hide") {
            setText(hexvals)
            setHS("Show")
    }}

    // retrieves the original colors produced and resets all val types
    const restore = async () => {
        const originals = await retrieve(JSON.stringify(["originals"]), 1952)
        current.rgbs = originals

        const hexs = [], hsvs = []
        for (const color of originals){
            hexs.push(convertHex(color))

            let rgb = color.slice()
            rgb.push("r")
            // retrieves the hsv vals from microservice
            const hsv = await retrieve(JSON.stringify(rgb), 7170)
            hsvs.push(hsv)
        }
        current.hexs = hexs
        current.hsvs = hsvs
        current.idxs = [0, 1, 2, 3, 4, 5]

        history.push({pathname: "/results", state: {current: current}})
    }

    // When upload again button is pressed, sends back to select page
    const newUpload = () => {
        history.push({pathname: "/"})
    }

    return(
        <>
            <h1>Here is your color scheme:</h1>
            <h3>Select a color to move, edit, or discard it</h3>
            <table className="colors">
                <tbody>
                    <tr>
                        <td><button onClick={() => history.push({pathname: "/modify", state: {current: current}})}>
                            Modify Scheme <a className='small'>(i)</a></button></td>

                        {hexvals.slice(0, 3).map((color, i) => 
                        <td className="color" style={{"backgroundColor": color, "color": text[i]}} 
                            onClick={() => history.push({pathname: "/selected", state: {current: current, idx: i, border: btext[i]}})} key={i}>

                            <div className='stats'>{color}
                            <br/>rgb({rgbs[i][0]}, {rgbs[i][1]}, {rgbs[i][2]})
                            <br/>hsv({hsvs[i][0]}, {hsvs[i][1]}%, {hsvs[i][2]}%)</div>
                        </td>)}

                        <td><button onClick={() => changeText()}>{hs} Color Statistics</button></td>
                    </tr>
                    <tr>
                        <td><button onClick={() => restore()}>Restore Original Colors</button></td>

                        {hexvals.slice(3, 6).map((color, i) => 
                        <td className="color" style={{"backgroundColor": color, "color": text[i+3]}} 
                            onClick={() => history.push({pathname: "/selected", state: {current: current, idx: i+3, border: btext[i+3]}})} key={i}>

                            <div className='stats'>{color}
                            <br/>rgb({rgbs[i+3][0]}, {rgbs[i+3][1]}, {rgbs[i+3][2]})
                            <br/>hsv({hsvs[i+3][0]}, {hsvs[i+3][1]}%, {hsvs[i+3][2]}%)</div>
                        </td>)}

                        <td><button onClick={() => history.push({pathname: "/details", state: {current: current, text: text}})}>
                            See Image Details <a className='small'>(i)</a></button></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button>Download Results</button></td>
                        <td></td>
                        <td><button onClick={() => newUpload()}>Upload New Image</button></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default ResultsPage
// The Results Page:
// Shown once the user has uploaded an image
// This page shows the user their generated color scheme
// Includes buttons to other pages for playing with the scheme
// Includes an upload button to generate a new scheme

import React from 'react';
import {useState} from "react"
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
    const rgbs = location.state.rgbs
    const hsvs = location.state.hsvs

    // determines if color's stat text should be white or black
    const btext = []
    for (let hsv of hsvs){
        if (hsv[2] > .60) btext.push("black")
        else btext.push("white")
    }

    // text is the list of colors the stat text should be (black, white, or invisible)
    const[text, setText] = useState(btext)
    // hs stands for hide/show; used for toggling text display
    const[hs, setHS] = useState("Hide")


    // for each color creates hex vals
    const hexvals = []
    for (let color of rgbs){
        let hex = "#"
        // for each number in the color, calculates hex
        for (let i in color){
            // converts number to hex and adds to hex val
            const hex2 = color[i] % 16
            const hex1 = (color[i] - hex2) / 16
            hex = hex.concat(convertHex(hex1))
            hex = hex.concat(convertHex(hex2))
        }
        hexvals.push(hex)
    }

    // function to toggle color stat text between invis and not
    const changeText = () => {
        if (hs == "Show") {
            setText(btext)
            setHS("Hide")
        } else if (hs == "Hide") {
            setText(hexvals)
            setHS("Show")
    }}

    // When upload again button is pressed, sends back to select page
    const newUpload = () => {
        history.push({pathname: "/"})
    }

    return(
        <>
            <h1>Here is your color scheme:</h1>
            <h3>Select a color to edit or discard it</h3>
            <table className="colors">
                <tbody>
                    <tr>
                        <td><button onClick={() => history.push({pathname: "/modify", state: {colors: rgbs}})}>
                            Modify Scheme <a className='small'>(i)</a></button></td>

                        {hexvals.slice(0, 3).map((color, i) => 
                        <td className="color" style={{"backgroundColor": color, "color": text[i]}} 
                            onClick={() => history.push({pathname: "/edit", state: {colors: hexvals, rgbs: rgbs, hsvs: hsvs, i: i}})} key={i}>

                            <div className='stats'>{color}
                            <br/>rgb({rgbs[i][0]}, {rgbs[i][1]}, {rgbs[i][2]})
                            <br/>hsv({hsvs[i][0]}, {hsvs[i][1]}%, {hsvs[i][2]}%)</div>
                        </td>)}

                        <td><button onClick={() => changeText()}>{hs} Color Statistics</button></td>
                    </tr>
                    <tr>
                        <td><button>Restore Original Colors</button></td>

                        {hexvals.slice(3, 6).map((color, i) => 
                        <td className="color" style={{"backgroundColor": color, "color": text[i+3]}} 
                            onClick={() => history.push({pathname: "/edit", state: {colors: hexvals, rgbs: rgbs, hsvs: hsvs, i: i+3}})} key={i}>

                            <div className='stats'>{color}
                            <br/>rgb({rgbs[i+3][0]}, {rgbs[i+3][1]}, {rgbs[i+3][2]})
                            <br/>hsv({hsvs[i+3][0]}, {hsvs[i+3][1]}%, {hsvs[i+3][2]}%)</div>
                        </td>)}

                        <td><button onClick={() => history.push({pathname: "/details", state: {colors: hexvals, rgbs: rgbs, hsvs: hsvs, text: text}})}>
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
export {convertHex}
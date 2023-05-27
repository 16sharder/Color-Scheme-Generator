// The Modify Scheme Page:
// Shown after the user has pressed the modify scheme button on the results page
// This page allows the user to edit the entire scheme at once in hue, sat, and brightness
// Includes a cancel and save button, which both return to the results page

import React from 'react';
import {useState, useEffect} from "react"
import {useHistory, useLocation} from "react-router-dom"

import retrieve from '../helpers/requests';
import { toHex } from '../helpers/converters';
import Slider from '../components/EditPage/slider';



function getBases (colors) {
    // Sets initial vals for sliders based on the averages of the colors (and first color hue)
    let sat = 0
    let bri = 0
    for (let color of colors){
        sat += color[1]
        bri += color[2]
    }
    sat /= 6
    bri /= 6

    return [colors[0][0], Number(sat.toFixed(0)), Number(bri.toFixed(0))]
}

function ModifyScheme () {
    const history = useHistory()
    const location = useLocation()

    const current = location.state.current

    const hexs = current.hexs.slice()
    const [colors, setColors] = useState(hexs)

    const rgbs = current.rgbs
    const hsvs = current.hsvs

    const newHSVs = hsvs.slice()

    const baseVals = getBases(hsvs)


    // each element of edited color
    const [hue, setHue] = useState(baseVals[0])
    const [sat, setSat] = useState(baseVals[1])
    const [bri, setBri] = useState(baseVals[2])

    // slider values are used to determine the colors on the slider gradients
    const hueSlider = ["#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff00", "#00ff80", "#00ffff", "#0080ff", "#0000ff", "#8000ff", "#ff00ff", "#ff0080", "#ff0000"]

    const [satSlider, setSlider] = useState("#ff0000")

    const setSlider2 = async () => {
        setSlider(await toHex(hue, 100, bri))
    }


    // edits the scheme in real time
    const editColor = async () => {
        setSlider2()

        // determines by how much each value should change
        const hueDif = hue - baseVals[0]
        const satDif = sat - baseVals[1]
        const briDif = bri - baseVals[2]

        for (let idx in newHSVs){
            let h, s, b = newHSVs[idx]
            let orig = hsvs[idx]

            // adds the difference to each original value
            h = orig[0] + hueDif
            s = orig[1] + satDif
            b = orig[2] + briDif

            // if new value is out of bounds, move back into the limits
            if (h > 360) h -= 360
            else if (h < 0) h += 360

            if (s > 100) s = 100
            else if (s < 0) s = 0

            if (b > 100) b = 100
            else if (b < 0) b = 0

            // updates the hex and hsv values of the new colors
            hexs[idx] = await toHex(h, s, b)
            newHSVs[idx] = [h, s, b]
        }
        setColors(hexs)
        return newHSVs
    }

    // saves the edits and sends back to results page
    const saveColor = async () => {
        const setHSVs = await editColor()

        for (let idx in setHSVs){
            // retrieves the rgb vals from microservice
            let hsv = setHSVs[idx].slice()
            hsv.push("u")
            rgbs[idx] = await retrieve(JSON.stringify(hsv), 7170)
        }

        const curr = {hexs: colors, rgbs: rgbs, hsvs: setHSVs, idxs: current.idxs}
        history.push({pathname: "/results", state: {current: curr}})
    }


    // updates the colors anytime the hue, sat, or brightness changes
    useEffect(() => {
        editColor()
    }, [hue, sat, bri])




    return (
        <>
        <table>
            <tbody>
                <tr><td className='addon'></td></tr>
                <tr>
                    {colors.slice(0, 3).map((color, i) => 
                    <td className="color" style={{"backgroundColor": color, "minWidth": "250px"}} key={i}></td>)}
                    <td style={{"minWidth": "50px"}}></td>

                    <td className='slider' style={{"width": "500px"}}>
                        <h4>Hue</h4>
                        <Slider element={hue} func={setHue} gradient={hueSlider} max="360"/>
                        <br/><br/><br/><br/>
                    </td>
                </tr>

                <tr>
                    {colors.slice(3, 6).map((color, i) => 
                    <td className="color" style={{"backgroundColor": color}} key={i}></td>)}
                    <td></td>

                    <td className='slider'>
                        <br/><br/><br/>
                        <h4>Brightness</h4>
                        <Slider element={bri} func={setBri} gradient={["black", "white"]} max="100"/>
                    </td>
                </tr>

                <tr>
                    <td></td><td></td><td></td><td></td>
                    <td className='sat slider'>
                        <h4>Saturation</h4>
                        <Slider element={sat} func={setSat} gradient={["white", satSlider]} max="100"/>
                    </td>
                </tr>

                <tr><td className='addon'></td></tr>
                <tr>
                    <td><button onClick={() => history.push({pathname: "/results", state: location.state})}>Cancel</button></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><button onClick={() => saveColor()}>Save</button></td>
                </tr>
            </tbody>
        </table>
        </>
    )
}

export default ModifyScheme
// The Edit Color Page:
// Shown after the user has pressed the edit button on the selected page
// This page allows the user to edit the selected color in hue, sat, and brightness
// Includes a cancel and save button, which both return to the results page

import React from 'react';
import {useState, useEffect} from "react"
import {useHistory, useLocation} from "react-router-dom"

import retrieve from '../helpers/requests';
import { convertHex, toHex } from '../helpers/converters';
import Slider from '../components/EditPage/slider';
import ColorRow from '../components/EditPage/colorRow';


function EditColor () {
    const history = useHistory()
    const location = useLocation()

    const current = location.state.current

    const hexs = current.hexs.slice()
    const [colors, setColors] = useState(hexs)

    const rgbs = current.rgbs
    const hsvs = current.hsvs

    const idx = location.state.i

    
    // set color of addons to allow selected color to pop out
    const addons = new Array(6).fill("#5a5a5a")
    addons[idx] = colors[idx]

    // sets width of selected color to be larger if in middle
    const widths = new Array(3).fill("250px")
    if (idx == 1 || idx == 4) widths[1] = "300px"


    // each element of edited color
    const [hue, setHue] = useState(hsvs[idx][0])
    const [sat, setSat] = useState(hsvs[idx][1])
    const [bri, setBri] = useState(hsvs[idx][2])

    // slider values are used to determine the colors on the slider gradients
    const hueSlider = ["#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff00", "#00ff80", "#00ffff", "#0080ff", "#0000ff", "#8000ff", "#ff00ff", "#ff0080", "#ff0000"]

    const [satSlider, setSlider] = useState("#ff0000")

    const setSlider2 = async () => {
        setSlider(await toHex(hue, 100, bri))
    }


    // edits the color in real time
    const editColor = async () => {
        setSlider2()

        hexs[idx] = await toHex(hue, sat, bri)
        setColors(hexs)
    }

    // saves the edits and sends back to results page
    const saveColor = async () => {
        hsvs[idx] = [hue, sat, bri]

        const hsv = [hue, sat, bri, "u"]
        rgbs[idx] = await retrieve(JSON.stringify(hsv), 7170)

        hexs[idx] = convertHex(rgbs[idx])

        const curr = {hexs: hexs, rgbs: rgbs, hsvs: hsvs, idxs: current.idxs}
        history.push({pathname: "/results", state: {current: curr}})
    }

    // updates the color anytime the hue, sat, or brightness changes
    useEffect(() => {
        editColor()
    }, [hue, sat, bri])




    return (
        <>
        <table>
            <tbody>
                <tr>
                    <ColorRow addons={addons.slice(0, 3)} widths={widths}/>
                    <td style={{"width": "500px"}}></td>
                </tr>
                <tr>
                    <ColorRow addons={addons.slice(0, 3)} filler={colors.slice(0, 3)}/>

                    <td className='slider'>
                        <h4>Hue</h4>
                        <Slider element={hue} func={setHue} gradient={hueSlider} max="360"/>
                        <br/><br/><br/><br/>
                    </td>
                </tr>

                <tr>
                    <ColorRow addons={addons.slice(3, 6)} filler={colors.slice(3, 6)}/>
                    
                    <td className='slider'>
                        <br/><br/><br/>
                        <h4>Brightness</h4>
                        <Slider element={bri} func={setBri} gradient={["black", "white"]} max="100"/>
                    </td>
                </tr>
                <tr>
                    <ColorRow addons={addons.slice(3, 6)}/>
                </tr>

                

                <tr>
                    <td></td><td></td><td></td><td></td><td></td>
                    <td className='sat slider'>
                        <h4>Saturation</h4>
                        <Slider element={sat} func={setSat} gradient={["white", satSlider]} max="100"/>
                    </td>
                </tr>


                <tr>
                    <td></td>
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

export default EditColor
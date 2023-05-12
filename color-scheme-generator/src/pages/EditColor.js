import React from 'react';
import {useState} from "react"
import {useHistory, useLocation} from "react-router-dom"

import retrieve from '../helpers/requests';
import { convertHex } from '../helpers/converters';

function EditColor () {
    const history = useHistory()
    const location = useLocation()

    const current = location.state.current

    const origColors = current.hexs.slice()
    const [colors, setColors] = useState(origColors)

    const rgbs = current.rgbs
    const hsvs = current.hsvs

    const idx = location.state.i
    
    
    // set color of addons to allow selected color to pop out
    const background = "bisque"
    const addons = [background, background, background, background, background, background]
    addons[idx] = colors[idx]

    // sets width of selected color to be larger if in middle
    const bwidth = "250px"
    const widths = [bwidth, bwidth, bwidth]
    if (idx == 1 || idx == 4) widths[1] = "300px"


    // each element of edited color
    const [hue, setHue] = useState(hsvs[idx][0])
    const [sat, setSat] = useState(hsvs[idx][1])
    const [bri, setBri] = useState(hsvs[idx][2])


    // edits the color in real time
    const editColor = async () => {
        const hsv = [hue, sat, bri, "u"]
        const rgb = await retrieve(JSON.stringify(hsv), 7170)

        origColors[idx] = convertHex(rgb)
        setColors(origColors)
    }

    // saves the edits and sends back to results page
    const saveColor = async () => {
        hsvs[idx] = [hue, sat, bri]

        const hsv = [hue, sat, bri, "u"]
        rgbs[idx] = await retrieve(JSON.stringify(hsv), 7170)

        origColors[idx] = convertHex(rgbs[idx])

        const curr = {hexs: origColors, rgbs: rgbs, hsvs: hsvs}
        history.push({pathname: "/results", state: {current: curr}})
    }




    return (
        <>
        <table>
            <tbody>
                <tr>
                    <td className="addon" style={{"backgroundColor": addons[0]}}></td>
                    {addons.slice(0, 3).map((color, i) =>
                    <td className="addon" style={{"backgroundColor": color, "minWidth": widths[i]}} key={i}></td>)}
                    <td className="addon" style={{"backgroundColor": addons[2]}}></td>
                    <td style={{"width": "500px"}}></td>
                </tr>
                <tr>
                    <td className="addon" style={{"backgroundColor": addons[0]}}></td>
                    {colors.slice(0, 3).map((color, i) => 
                    <td className="color" style={{"backgroundColor": color}} key={i}></td>)}
                    <td className="addon" style={{"backgroundColor": addons[2]}}></td>

                    <td className='slider'>
                        <h4>Hue</h4>
                        <label>0</label>
                        <input 
                            type="range" 
                            min="0" max="360" 
                            value={hue} 
                            className='sld'
                            onChange={newN => {
                                setHue(Number(newN.target.value))
                                editColor()}}>
                        </input>
                        <label>360</label>
                        <br/>
                        <input 
                            type="number" 
                            min="0" max="360" 
                            value={hue} 
                            className='numinp'
                            onChange={newN => {
                                setHue(Number(newN.target.value))
                                editColor()}}>
                        </input>

                        <br/><br/>
                        <h4>Saturation</h4>
                    </td>
                </tr>
                <tr>
                    <td className="addon" style={{"backgroundColor": addons[3]}}></td>
                    {colors.slice(3, 6).map((color, i) => 
                    <td className="color" style={{"backgroundColor": color}} key={i}></td>)}
                    <td className="addon" style={{"backgroundColor": addons[5]}}></td>
                    
                    <td className='slider'>
                        <label>0</label>
                        <input 
                            type="range" 
                            min="0" max="100" 
                            value={sat} 
                            className='sld'
                            onChange={newN => {
                                setSat(Number(newN.target.value))
                                editColor()}}>
                        </input>
                        <label>100</label>
                        <br/>
                        <input 
                            type="number" 
                            min="0" max="100" 
                            value={sat} 
                            className='numinp'
                            onChange={newN => {
                                setSat(Number(newN.target.value))
                                editColor()}}>
                        </input>
                        <br/><br/>

                        <h4>Brightness</h4>
                        <label>0</label>
                        <input 
                            type="range" 
                            min="0" max="100" 
                            value={bri} 
                            className='sld'
                            onChange={newN => {
                                setBri(Number(newN.target.value))
                                editColor()}}>
                        </input>
                        <label>100</label>
                        <br/>
                        <input 
                            type="number" 
                            min="0" max="100" 
                            value={bri} 
                            className='numinp'
                            onChange={newN => {
                                setBri(Number(newN.target.value))
                                editColor()}}>
                        </input>
                    </td>
                </tr>
                <tr>
                    <td className="addon" style={{"backgroundColor": addons[3]}}></td>
                    {addons.slice(3, 6).map((color, i) =>
                    <td className="addon" style={{"backgroundColor": color}} key={i}></td>)}
                    <td className="addon" style={{"backgroundColor": addons[5]}}></td>
                </tr>
                <tr>
                    <td></td>
                    <td><button onClick={() => history.push({pathname: "/results", state: {current: location.state.current}})}>Cancel</button></td>
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
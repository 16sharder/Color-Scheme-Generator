import React from 'react';
import {useState} from "react"
import {useHistory, useLocation} from "react-router-dom"

import retrieve from '../helpers/requests';
import { convertHex } from './Results';

function EditColor () {
    const history = useHistory()
    const location = useLocation()

    const origColors = location.state.colors
    const [colors, setColors] = useState(origColors)

    const rgbs = location.state.rgbs
    const origRSB = rgbs.slice()
    const hsvs = location.state.hsvs
    const origHSV = hsvs.slice()

    const idx = location.state.i
    
    const background = "bisque"
    const addons = [background, background, background, background, background, background]
    addons[idx] = colors[idx]

    const bwidth = "250px"
    const widths = [bwidth, bwidth, bwidth]
    if (idx == 1 || idx == 4) widths[1] = "300px"

    const [hue, setHue] = useState(hsvs[idx][0])
    const [sat, setSat] = useState(hsvs[idx][1]*100)
    const [bri, setBri] = useState(hsvs[idx][2]*100)


    const editColor = async () => {
        const hsv = [hue, sat/100, bri/100, "u"]
        const rgb = await retrieve(JSON.stringify(hsv), 7170)

        let hex = "#"
        for (let val of rgb){
            const hex2 = val % 16
            const hex1 = (val - hex2) / 16
            hex = hex.concat(convertHex(hex1))
            hex = hex.concat(convertHex(hex2))
        }

        origColors[idx] = hex
        setColors(origColors)
    }

    const saveColor = async () => {
        hsvs[idx] = [hue, sat/100, bri/100]

        const hsv = [hue, sat/100, bri/100, "u"]
        rgbs[idx] = await retrieve(JSON.stringify(hsv), 7170)

        history.push({pathname: "/results", state: {rgbs: rgbs, hsvs: hsvs}})
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
                                setSat(newN.target.value)
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
                                setSat(newN.target.value)
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
                                setBri(newN.target.value)
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
                                setBri(newN.target.value)
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
            </tbody>
        </table>
        <table className='colors'>
            <tbody>
                <tr>
                    <td><button className="delete" onClick={() => history.push({pathname: "/results", state: {rgbs: rgbs, hsvs: hsvs}})}>Delete Color</button></td>
                    <td></td>
                    <td><button onClick={() => history.push({pathname: "/results", state: {rgbs: origRSB, hsvs: origHSV}})}>Cancel</button></td>
                    <td></td>
                    <td><button onClick={() => saveColor()}>Save</button></td>
                </tr>
            </tbody>
        </table>
        </>
    )
}

export default EditColor
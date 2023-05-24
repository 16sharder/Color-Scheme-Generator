import React from 'react';
import {useState, useEffect} from "react"
import {useHistory, useLocation} from "react-router-dom"

import retrieve from '../helpers/requests';
import { convertHex } from '../helpers/converters';

async function toHex (h, s, b) {
    const hsv = [h, s, b, "u"]
    const rgb = await retrieve(JSON.stringify(hsv), 7170)
    const hex = convertHex(rgb)
    return hex
}

function getBases (colors) {
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

    const origColors = current.hexs.slice()
    const [colors, setColors] = useState(origColors)

    const rgbs = current.rgbs
    const hsvs = current.hsvs

    const newHSVs = hsvs.slice()

    const baseVals = getBases(hsvs)


    // each element of edited color
    const [hue, setHue] = useState(baseVals[0])
    const [sat, setSat] = useState(baseVals[1])
    const [bri, setBri] = useState(baseVals[2])

    const hueSlider = ["#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff00", "#00ff80", "#00ffff", "#0080ff", "#0000ff", "#8000ff", "#ff00ff", "#ff0080", "#ff0000"]

    const [satSlider, setSSlider] = useState("#ff0000")

    const stSlider = async () => {
        setSSlider(await toHex(hue, 100, bri))
    }


    // edits the color in real time
    const editColor = async () => {
        stSlider()

        const hueDif = hue - baseVals[0]
        const satDif = sat - baseVals[1]
        const briDif = bri - baseVals[2]

        for (let idx in newHSVs){
            let h, s, b = newHSVs[idx]
            let orig = hsvs[idx]

            h = orig[0] + hueDif
            s = orig[1] + satDif
            b = orig[2] + briDif

            if (h > 360) h -= 360
            else if (h < 0) h += 360

            if (s > 100) s = 100
            else if (s < 0) s = 0

            if (b > 100) b = 100
            else if (b < 0) b = 0

            origColors[idx] = await toHex(h, s, b)
            newHSVs[idx] = [h, s, b]
        }
        setColors(origColors)
        return newHSVs
    }

    // saves the edits and sends back to results page
    const saveColor = async () => {
        const setHSVs = await editColor()

        for (let idx in setHSVs){
            let hsv = setHSVs[idx].slice()
            hsv.push("u")
            rgbs[idx] = await retrieve(JSON.stringify(hsv), 7170)
        }

        const curr = {hexs: colors, rgbs: rgbs, hsvs: setHSVs, idxs: current.idxs}
        history.push({pathname: "/results", state: {current: curr}})
    }


    // updates the colors seen anytime the hue, sat, or brightness changes
    useEffect(() => {
        editColor()
    }, [hue, sat, bri])




    return (
        <>
        <table>
            <tbody>
                <tr>
                    {colors.slice(0, 3).map((color, i) => 
                    <td className="color" style={{"backgroundColor": color, "minWidth": "250px"}} key={i}></td>)}
                    <td style={{"minWidth": "50px"}}></td>

                    <td className='slider' style={{"width": "500px"}}>
                        <h4>Hue</h4>
                        <label>0</label>
                        <input 
                            type="range" 
                            min="0" max="360" 
                            value={hue} 
                            className='sld'
                            style={{"backgroundImage": `linear-gradient(to right, ${hueSlider.map((color) => color)})`}}
                            onChange={newN => {
                                setHue(Number(newN.target.value))}}>
                        </input>
                        <label>360</label>
                        <br/>
                        <input 
                            type="number" 
                            min="0" max="360" 
                            value={hue} 
                            className='numinp'
                            onChange={newN => {
                                setHue(Number(newN.target.value))}}>
                        </input>

                        <br/><br/>
                        <h4>Saturation</h4>
                    </td>
                </tr>
                <tr>
                    {colors.slice(3, 6).map((color, i) => 
                    <td className="color" style={{"backgroundColor": color}} key={i}></td>)}
                    <td></td>

                    <td className='slider'>
                        <label>0</label>
                        <input 
                            type="range" 
                            min="0" max="100" 
                            value={sat} 
                            className='sld'
                            style={{"backgroundImage": `linear-gradient(to right, white, ${satSlider})`}}
                            onChange={newN => {
                                setSat(Number(newN.target.value))}}>
                        </input>
                        <label>100</label>
                        <br/>
                        <input 
                            type="number" 
                            min="0" max="100" 
                            value={sat} 
                            className='numinp'
                            onChange={newN => {
                                setSat(Number(newN.target.value))}}>
                        </input>
                        <br/><br/>

                        <h4>Brightness</h4>
                        <label>0</label>
                        <input 
                            type="range" 
                            min="0" max="100" 
                            value={bri} 
                            className='sld'
                            style={{"backgroundImage": `linear-gradient(to right, black, white)`}}
                            onChange={newN => {
                                setBri(Number(newN.target.value))}}>
                        </input>
                        <label>100</label>
                        <br/>
                        <input 
                            type="number" 
                            min="0" max="100" 
                            value={bri} 
                            className='numinp'
                            onChange={newN => {
                                setBri(Number(newN.target.value))}}>
                        </input>
                    </td>
                </tr>
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
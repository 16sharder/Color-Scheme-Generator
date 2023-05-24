// The Results Page:
// Shown once the user has uploaded an image
// This page shows the user their generated color scheme
// Includes buttons to other pages for playing with the scheme
// Includes an upload button to generate a new scheme

import React from 'react';
import {useHistory, useLocation} from "react-router-dom"

import { switchColors } from '../helpers/converters';

import DeleteButton from '../components/SelectedPage/deleteButton';

function SelectedPage () {
    const history = useHistory()
    const location = useLocation()

    let current = location.state.current
    const idx = location.state.idx
    const border = location.state.border

    const hexs = current.hexs

    // sets border for selected color
    const borders = new Array(6).fill(undefined)
    borders[idx] = `3px solid ${border}`

    // switches the selected with secondary selected and returns to results
    const swich = (num) => {
        current = switchColors(num, idx, current)

        history.push({pathname: "/results", state: {current: current, vis: location.state.vis}})
    }


    return(
        <>
            <h3>Click on another color to switch positions</h3>
            <table className="colors">
                <tbody>
                    <tr>

                        {hexs.slice(0, 3).map((color, i) => 
                        <td className="color pointer" style={{"backgroundColor": color, "border": borders[i]}} 
                            onClick={() => swich(i)} key={i}>
                        </td>)}

                    </tr>
                    <tr>
                        {hexs.slice(3, 6).map((color, i) => 
                        <td className="color pointer" style={{"backgroundColor": color, "border": borders[i+3]}} 
                            onClick={() => swich(i+3)} key={i}>
                        </td>)}
                    </tr>
                    <tr>
                        <td><button onClick={() => history.push({pathname: "/results", state: location.state})}>
                            Cancel</button></td>
                        <td></td>
                        <td><button onClick={() => history.push({pathname: "/edit", state: {current: current, i: idx}})}>
                            Edit Color</button></td>
                    </tr>
                    <tr>
                        <td></td>
                        <DeleteButton current={current} idx={idx}/>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default SelectedPage
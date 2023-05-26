// The Selected Color Page:
// Shown once the user has selected a color in their scheme
// This page allows the user to switch, edit, or delete the selected color
// Returns to the results page once cancel button, delete button, or second color to switch is selected
// Moves to the edit page if the edit button is pressed

import React from 'react';
import {useHistory, useLocation} from "react-router-dom"

import { switchColors } from '../helpers/converters';

import DeleteButton from '../components/SelectedPage/deleteButton';

function SelectedPage () {
    const history = useHistory()
    const location = useLocation()

    const current = location.state.current
    const idx = location.state.idx
    const hexs = current.hexs

    // border is used to surround/highlight the currently selected color
    const border = location.state.border
    const borders = new Array(6).fill(undefined)
    borders[idx] = `3px solid ${border}`

    // switches the selected color with second selected color and returns to results
    const swich = (num) => {
        const curr = switchColors(num, idx, current)

        history.push({pathname: "/results", state: {current: curr, visible: location.state.visible}})
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
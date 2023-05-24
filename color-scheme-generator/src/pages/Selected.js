// The Results Page:
// Shown once the user has uploaded an image
// This page shows the user their generated color scheme
// Includes buttons to other pages for playing with the scheme
// Includes an upload button to generate a new scheme

import React from 'react';
import {useHistory, useLocation} from "react-router-dom"

import DeleteButton from '../components/SelectedPage/deleteButton';

function SelectedPage () {
    const history = useHistory()
    const location = useLocation()

    const current = location.state.current
    const idx = location.state.idx
    const border = location.state.border

    const hexvals = current.hexs

    // sets border for selected color
    const borders = [undefined, undefined, undefined, undefined, undefined, undefined]
    borders[idx] = `3px solid ${border}`

    // switches the selected with secondary selected and returns to results
    const swich = (num) => {
        let temp = current.hexs[idx]
        current.hexs[idx] = current.hexs[num]
        current.hexs[num] = temp

        temp = current.rgbs[idx]
        current.rgbs[idx] = current.rgbs[num]
        current.rgbs[num] = temp

        temp = current.hsvs[idx]
        current.hsvs[idx] = current.hsvs[num]
        current.hsvs[num] = temp

        temp = current.idxs[idx]
        current.idxs[idx] = current.idxs[num]
        current.idxs[num] = temp

        history.push({pathname: "/results", state: {current: current, vis: location.state.vis}})
    }


    return(
        <>
            <h3>Click on another color to switch positions</h3>
            <table className="colors">
                <tbody>
                    <tr>

                        {hexvals.slice(0, 3).map((color, i) => 
                        <td className="color pointer" style={{"backgroundColor": color, "border": borders[i]}} 
                            onClick={() => swich(i)} key={i}>
                        </td>)}

                    </tr>
                    <tr>
                        {hexvals.slice(3, 6).map((color, i) => 
                        <td className="color pointer" style={{"backgroundColor": color, "border": borders[i+3]}} 
                            onClick={() => swich(i+3)} key={i}>
                        </td>)}
                    </tr>
                    <tr>
                        <td><button onClick={() => history.push({pathname: "/results", state: location.state})}>Cancel</button></td>
                        <td></td>
                        <td><button onClick={() => history.push({pathname: "/edit", state: {current: current, i: idx}})}>Edit Color</button></td>
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
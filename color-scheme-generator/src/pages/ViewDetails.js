// The View Details Page:
// Shown once the user clicks "See Image Details" from the Results page
// This page shows the user the presice percentage that each specific pixel has appeared 
// Includes a return button to go back to the results

import React from 'react';
// import {useState} from "react"
import {useHistory, useLocation} from "react-router-dom"

function ViewDetails () {

    const history = useHistory()
    const location = useLocation()

    const colors = location.state.colors
    const rgbs = location.state.rgbs
    const text = location.state.text

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>
                    Here is a list of all of the colors that appear in your <br />
                    image. The percentage represents the percent of <br />
                    pixels of that color in your image.
                    </th>
                    <th>
                        <button onClick={() => history.push({pathname: "/results", state: {colors: rgbs}})}>Return to Results</button>
                    </th>
                </tr>
            </thead>
        </table>
        <table className='details'>
            <tbody>
                <tr>
                    {colors.map((color, i) => 
                    <td className="color" style={{"backgroundColor": color, "color": text[i]}} key={i}>
                        <h4>{color}</h4>
                    </td>)}
                </tr>
            </tbody>
        </table>
        </>
    )
}


export default ViewDetails
// The Color Block Component:
// Used inside the Results Page
// Displays one of the colors in the color scheme
// Brings the user to the Selecteed page when clicked

import React from 'react';
import {useHistory} from "react-router-dom"

import StatText from '../../components/ResultsPage/statText';

function ColorBlock ({ i, current, txt }) {
    const history = useHistory()

    // text values determine the color of stat text
    const text = txt[0]
    const btext = txt[1]
    const hs = txt[2]

    return (
        <>
            <td className="color pointer" 
                style={{"backgroundColor": current.hexs[i]}} 
                onClick={() => history.push({pathname: "/selected", state: {current: current, idx: i, border: btext[i], vis: hs}})}>

                <StatText i={i} current={current} text={text}/>
            </td>
        </>
    )
}

export default ColorBlock
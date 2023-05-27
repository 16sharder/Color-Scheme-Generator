// The See Details Button Component:
// Used inside the Results Page
// Displays a see details button that brings user to View Details page
// When the user hovers over the button, displays information

import React, { useState } from 'react';
import {useHistory} from "react-router-dom"

function SeeDetails ({ current, text_arr }) {
    const history = useHistory()

    // Changes the informational message's coloring on mouse hover (from invisible to black)
    const base = "#5a5a5a"
    const [color, setColor] = useState(base)

    const displayMessage = () => {
        if (color == base) setColor("white")
        else setColor(base)
    }

    return (
        <>
            <td className='side-button'>
                <div className='message' style={{"color": color}}>Goes to a list of pixels in the image</div>

                <button 
                    onClick={() => history.push({pathname: "/details", state: {current: current, text_arr: text_arr}})}
                    onMouseOver={() => displayMessage()}
                    onMouseOut={() => displayMessage()}>
                            
                    See Image Details <a className='small'>(i)</a>
                
                </button>
            </td>
        </>
    )
}

export default SeeDetails
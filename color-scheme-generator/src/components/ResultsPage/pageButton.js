// The Page Button Component:
// Used inside the Results Page, for modify and see details buttons
// Displays a button that brings user to another page
// When the user hovers over the button, displays information

import React, { useState } from 'react';
import {useHistory} from "react-router-dom"

function PageButton ({ state, message, path, title }) {
    const history = useHistory()

    // Changes the informational message's coloring on mouse hover (from invisible to black)
    const base = "bisque"
    const [color, setColor] = useState(base)

    const displayMessage = () => {
        if (color == base) setColor("black")
        else setColor(base)
    }

    return (
        <>
            <td>
                <div className='message' style={{"color": color}}>{message}</div>

                <button 
                    onClick={() => history.push({pathname: path, state: state})}
                    onMouseOver={() => displayMessage()}
                    onMouseOut={() => displayMessage()}>
                            
                    {title} <a className='small'>(i)</a>
                
                </button>
            </td>
        </>
    )
}

export default PageButton
import React, { useState } from 'react';
import {useHistory} from "react-router-dom"

function Modify ({ current }) {
    const history = useHistory()

    const base = "bisque"
    const [color, setColor] = useState(base)

    const displayMessage = () => {
        if (color == base) setColor("black")
        else setColor(base)
    }

    return (
        <>
            <td>
                <div className='message' style={{"color": color}}>Adjust the entire scheme by hue, saturation, and/or brightness</div>

                <button 
                    onClick={() => history.push({pathname: "/modify", state: {current: current}})}
                    onMouseOver={() => displayMessage()}
                    onMouseOut={() => displayMessage()}>
                
                    Modify Scheme <a className='small' >(i)</a>
            
                </button>
            </td>
        </>
    )
}

export default Modify
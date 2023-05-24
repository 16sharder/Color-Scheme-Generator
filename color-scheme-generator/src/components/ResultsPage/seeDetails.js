import React, { useState } from 'react';
import {useHistory} from "react-router-dom"

function SeeDetails ({ current, text }) {
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
                <div className='message' style={{"color": color}}>Goes to a list of pixels in the image</div>

                <button 
                    onClick={() => history.push({pathname: "/details", state: {current: current, text: text}})}
                    onMouseOver={() => displayMessage()}
                    onMouseOut={() => displayMessage()}>
                            
                    See Image Details <a className='small'>(i)</a>
                
                </button>
            </td>
        </>
    )
}

export default SeeDetails
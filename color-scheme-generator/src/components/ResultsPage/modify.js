import React, { useState } from 'react';
import {useHistory} from "react-router-dom"

function Modify ({ current }) {
    const history = useHistory()

    const [color, setColor] = useState("bisque")

    const displayMessage = () => {
        if (color == "bisque") setColor("black")
        else setColor("bisque")
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

                <br/><br/><br/><br/>

            </td>
        </>
    )
}

export default Modify
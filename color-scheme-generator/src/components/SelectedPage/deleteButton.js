// The Delete Button Component:
// Used inside the Selected Page
// Displays a delete button to delete a color
// Button returns user to Results page
// When the user hovers over the button, displays information

import React, { useState } from 'react';
import {useHistory} from "react-router-dom"
import retrieve from '../../helpers/requests';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { convertHex } from '../../helpers/converters';

function DeleteButton ({ current, idx, visible }) {
    const history = useHistory()
    const location = useLocation()

    // Changes the informational message's coloring on mouse hover (from invisible to black)
    const base = "#5a5a5a"
    const [color, setColor] = useState(base)

    const displayMessage = () => {
        if (color == base) setColor("white")
        else setColor(base)
    }


    // deletes the selected color and replaces with next most common color in image
    const delet = async () => {
        const newColor = await retrieve(JSON.stringify(["delete", current.idxs[idx]]), 1952)
        if (newColor == "no more"){
            alert("Color could not be deleted - there are no more distinct colors in your image")
            return
        }
        // updates the rgbs, hexs, and hsvs to reflect new color
        current.rgbs[idx] = newColor
        current.hexs[idx] = convertHex(newColor)

        let rgb = newColor.slice()
        rgb.push("r")
        current.hsvs[idx] = await retrieve(JSON.stringify(rgb), 7170)


        history.push({pathname: "/results", state: {current: current, visible: visible}})
    }

    return (
        <>
            <td>
                <div className='message' style={{"color": color}}>This color will be replaced by the next color from your image</div>
            </td>

            <td>
                <button className='delete' 
                    onClick={() => delet()}
                    onMouseOver={() => displayMessage()}
                    onMouseOut={() => displayMessage()}>
                        
                    Delete Color <a className='small' >(i)</a>
                
                </button>

            </td>
        </>
    )
}

export default DeleteButton
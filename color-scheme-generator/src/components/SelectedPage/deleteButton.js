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

function DeleteButton ({ current, idx }) {
    const history = useHistory()
    const location = useLocation()

    // Changes the informational message's coloring on mouse hover (from invisible to black)
    const base = "bisque"
    const [color, setColor] = useState(base)

    const displayMessage = () => {
        if (color == base) setColor("black")
        else setColor(base)
    }


    // deletes the selected color and replaces with next most common color in image
    const delet = async () => {
        const updated = await retrieve(JSON.stringify(["delete", current.idxs[idx]]), 1952)
        if (updated == "no more"){
            alert("Color could not be deleted - there are no more distinct colors in your image")
            return
        }
        // updates the rgbs, hexs, and hsvs to reflect new color
        current.rgbs[idx] = updated
        current.hexs[idx] = convertHex(updated)

        let rgb = updated.slice()
        rgb.push("r")
        current.hsvs[idx] = await retrieve(JSON.stringify(rgb), 7170)


        history.push({pathname: "/results", state: {current: current, vis: location.state.vis}})
    }

    return (
        <>
            <td>

                <button className='delete' 
                    onClick={() => delet()}
                    onMouseOver={() => displayMessage()}
                    onMouseOut={() => displayMessage()}>
                        
                    Delete Color <a className='small' >(i)</a>
                
                </button>

                <br/><br/><br/><br/>

            </td>
            <td>
                <div className='message' style={{"color": color}}>This color will be replaced by the next color from your image</div>
            </td>
        </>
    )
}

export default DeleteButton
// The Restore Originals Button Component:
// Used inside the Results Page
// Displays a restore originals button to retrieve the originally generated colors
// Button refreshes the Results page

import React from 'react';
import {useHistory} from "react-router-dom"

import retrieve from '../../helpers/requests';
import { convertHex } from '../../helpers/converters';
import { determineText } from '../../helpers/text_colors';


function RestoreOriginals ({ setText, setVis }) {

    const history = useHistory()

    const restore = async () => {
        // retrieves the original colors produced
        const originals = await retrieve(JSON.stringify(["originals"]), 1952)

        // resets all val types: rgb, hex, hsb, and indexes
        const rgbs = originals

        const hexs = [], hsbs = []
        for (const color of originals){
            hexs.push(convertHex(color))

            // retrieves the hsb vals from microservice
            let rgb = color.slice()
            rgb.push("r")
            const hsb = await retrieve(JSON.stringify(rgb), 7170)
            hsbs.push(hsb)
        }
        const idxs = [0, 1, 2, 3, 4, 5]

        const curr = {rgbs: rgbs, hexs: hexs, hsbs: hsbs, idxs: idxs}

        // resets the text color to match new color values
        setText(determineText(hsbs))
        setVis("Hide")

        history.push({pathname: "/results", state: {current: curr}})
    }

    return (
        <>
            <button onClick={() => restore()}>Restore Original Colors</button>
        </>
    )
}

export default RestoreOriginals
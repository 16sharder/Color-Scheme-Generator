import React from 'react';
import {useHistory} from "react-router-dom"

import retrieve from '../../helpers/requests';
import { convertHex } from '../../helpers/converters';
import { determineText } from '../../helpers/text_colors';


function RestoreOriginals ({ setText, setHS }) {
    // retrieves the original colors produced and resets all val types

    const history = useHistory()

    const restore = async () => {
        const originals = await retrieve(JSON.stringify(["originals"]), 1952)
        const rgbs = originals

        const hexs = [], hsvs = []
        for (const color of originals){
            hexs.push(convertHex(color))

            // retrieves the hsv vals from microservice
            let rgb = color.slice()
            rgb.push("r")
            const hsv = await retrieve(JSON.stringify(rgb), 7170)
            hsvs.push(hsv)
        }
        const idxs = [0, 1, 2, 3, 4, 5]

        const curr = {rgbs: rgbs, hexs: hexs, hsvs: hsvs, idxs: idxs}

        setText(determineText(hsvs))
        setHS("Hide")

        history.push({pathname: "/results", state: {current: curr}})
    }

    return (
        <>
            <button onClick={() => restore()}>Restore Original Colors</button>
        </>
    )
}

export default RestoreOriginals
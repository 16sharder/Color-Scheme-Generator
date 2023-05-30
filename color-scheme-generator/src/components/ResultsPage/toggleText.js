// The Toggle Text Component:
// Used inside the Results Page
// Displays a Hide/Show Color Statistics button
// Button toggles whether Stat Text is invisible or visible

import React from 'react';

import { setTextType } from '../../helpers/text_colors';

function ToggleText ({ visibility, hexs, bw_text_arr, funcs }) {

    const setVis = funcs[0]
    const setText = funcs[1]

    // resets the text type as opposite to current text
    const changeText = () => {
        const res = setTextType(visibility, hexs, bw_text_arr, true)
        setVis(res[0])
        setText(res[1])
    }

    return (
        <>
            <td><button onClick={() => changeText()}>
                {visibility} Color Statistics</button></td>
        </>
    )
}

export default ToggleText
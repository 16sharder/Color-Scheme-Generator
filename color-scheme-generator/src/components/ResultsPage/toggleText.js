// The Toggle Text Component:
// Used inside the Results Page
// Displays a Hide/Show Color Statistics button
// Button toggles whether Stat Text is invisible or visible

import React from 'react';

import { setTextType } from '../../helpers/text_colors';

function ToggleText ({ hs, hexs, btext, funcs }) {

    const setHS = funcs[0]
    const setText = funcs[1]

    // resets the text type as opposite to current text
    const changeText = () => {
        const res = setTextType(hs, hexs, btext, true)
        setHS(res[0])
        setText(res[1])
    }

    return (
        <>
            <td><button onClick={() => changeText()}>
                {hs} Color Statistics</button></td>
        </>
    )
}

export default ToggleText
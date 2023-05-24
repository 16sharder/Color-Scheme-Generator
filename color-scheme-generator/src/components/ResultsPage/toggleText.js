import React from 'react';

import { setTextType } from '../../helpers/text_colors';

function ToggleText ({ hs, hexs, btext, funcs }) {

    const setHS = funcs[0]
    const setText = funcs[1]

    // function to toggle color stat text between invis and not
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
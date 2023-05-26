// The Stat Text Component:
// Used on the Results Page, within the Color Block Component
// Displays the info about the specified color

import React from 'react';

function StatText ({ i, current, text_arr }) {
    const rgbs = current.rgbs
    const hsvs = current.hsvs
    const hexs = current.hexs

    return (
        <>
            <div className='stats' style={{"color": text_arr[i]}} >
                {hexs[i]}<br/>
                rgb({rgbs[i][0]}, {rgbs[i][1]}, {rgbs[i][2]})<br/>
                hsv({hsvs[i][0]}, {hsvs[i][1]}%, {hsvs[i][2]}%)
            </div>
        </>
    )
}

export default StatText
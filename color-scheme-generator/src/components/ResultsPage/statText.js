import React from 'react';


function StatText ({ i, current, text }) {
    const rgbs = current.rgbs
    const hsvs = current.hsvs
    const hexs = current.hexs

    return (
        <>
            <div className='stats' style={{"color": text[i]}} >
                {hexs[i]}<br/>
                rgb({rgbs[i][0]}, {rgbs[i][1]}, {rgbs[i][2]})<br/>
                hsv({hsvs[i][0]}, {hsvs[i][1]}%, {hsvs[i][2]}%)
            </div>
        </>
    )
}

export default StatText
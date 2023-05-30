// The Color Block Component:
// Used inside the Edit Page
// Displays one row of colors in the color scheme

import React from 'react';

function ColorRow ({ addons, filler=addons, widths=[]}) {

    // determines the classname depending on if color block or add on
    let cname;
    if (filler == addons) cname = "addon"
    else cname = "color"

    return (
        <>
            <td className="addon" style={{"backgroundColor": addons[0]}}></td>
            {filler.map((color, i) =>
            <td className={cname} style={{"backgroundColor": color, "minWidth": widths[i]}} key={i}></td>)}
            <td className="addon" style={{"backgroundColor": addons[2]}}></td>
        </>
    )
}

export default ColorRow


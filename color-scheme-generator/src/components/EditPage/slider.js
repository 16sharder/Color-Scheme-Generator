// The Slider Component:
// Used inside the Edit Colors and Modify Scheme Pages
// Displays a slider that adjusts hue, saturation, or brightness

// Source for slider css: https://www.w3schools.com/howto/howto_js_rangeslider.asp

import React from 'react';

function Slider ({ element, func, gradient, max }) {


    return (
        <>
            <label>0</label>
            <input 
                type="range" 
                min="0" max={max} 
                value={element} 
                className='sld'
                style={{"backgroundImage": `linear-gradient(to right, ${gradient})`}}
                onChange={newN => {
                    func(Number(newN.target.value))}}>
            </input>
            <label>{max}</label>
            <br/>
            <input 
                type="number" 
                min="0" max={max}   
                value={element} 
                className='numinp'
                onChange={newN => {
                    func(Number(newN.target.value))}}>
            </input>
        </>
    )
}

export default Slider
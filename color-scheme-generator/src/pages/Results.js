// The Results Page:
// Shown once the user has uploaded an image
// This page shows the user their generated color scheme
// Includes buttons to other pages for playing with the scheme
// Includes an upload button to generate a new scheme

import React from 'react';
import {useState, useEffect} from "react"
import {useHistory, useLocation} from "react-router-dom"

import { determineText, setTextType } from '../helpers/text_colors';

import RestoreOriginals from '../components/ResultsPage/restoreOriginals';
import ColorBlock from '../components/ResultsPage/colorBlock';
import ToggleText from '../components/ResultsPage/toggleText';
import Modify from '../components/ResultsPage/modify';
import SeeDetails from '../components/ResultsPage/seeDetails';

function ResultsPage () {
    const history = useHistory()
    const location = useLocation()

    const current = location.state.current
    let vis = location.state.vis

    const hsvs = current.hsvs
    const hexs = current.hexs


    // text is the list of colors the stat text should be (black, white, or invisible)
    const[text, setText] = useState(hexs)
    let btext = determineText(hsvs)

    // hs stands for hide/show; used for toggling text display
    const[hs, setHS] = useState("Show")



    // sets appropriate text type when first loaded
    useEffect (() => {
        if (!vis) vis = "Hide"
        const res = setTextType(vis, hexs, btext)

        setHS(res[0])
        setText(res[1])
    }, [])



    return(
        <>
            <h1>Here is your color scheme:</h1>
            <h3>Select a color to move, edit, or discard it</h3>
            <table className="colors">
                <tbody>
                    <tr>
                        <Modify current={current}/>

                        {[0, 1, 2].map((i) => 
                        <ColorBlock i={i} current={current} txt={[text, btext, hs]} key={i}/> )}

                        <ToggleText hs={hs} hexs={hexs} btext={btext} funcs={[setHS, setText]}/>
                    </tr>



                    <tr>
                        <td><RestoreOriginals setText={setText} setHS={setHS} determineText={determineText}/></td>

                        {[3, 4, 5].map((i) => 
                        <ColorBlock i={i} current={current} txt={[text, btext, hs]} key={i+3}/> )}

                        <SeeDetails current={current} text={text}/>
                    </tr>



                    <tr>
                        <td></td>
                        <td><button>Download Results</button></td>
                        <td></td>
                        <td><button onClick={() => history.push({pathname: "/"})}>Upload New Image</button></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default ResultsPage
// The Results Page:
// Shown once the user has uploaded an image
// This page shows the user their generated color scheme
// Includes buttons to other pages for playing with the scheme
// Includes an upload button to generate a new scheme

import React from 'react';
import {useState, useEffect} from "react"
import {useHistory, useLocation} from "react-router-dom"

import { determineText, setTextType } from '../helpers/text_colors';

import Modify from '../components/ResultsPage/modify';
import ColorBlock from '../components/ResultsPage/colorBlock';
import ToggleText from '../components/ResultsPage/toggleText';
import RestoreOriginals from '../components/ResultsPage/restoreOriginals';
import SeeDetails from '../components/ResultsPage/seeDetails';
import createPDF from '../helpers/PDF';

function ResultsPage () {
    const history = useHistory()
    const location = useLocation()

    const current = location.state.current
    let visible = location.state.visible

    const hsvs = current.hsvs
    const hexs = current.hexs


    // text_arr is the list of colors the stat text should be (black, white, or invisible)
    const[text_arr, setText] = useState(hexs)
    let bw_text_arr = determineText(hsvs)
    const[visibility, setVis] = useState("Show")



    // sets appropriate text type when first loaded
    useEffect (() => {
        if (!visible) visible = "Hide"
        const res = setTextType(visible, hexs, bw_text_arr)

        setVis(res[0])
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
                        <ColorBlock i={i} current={current} txt={[text_arr, bw_text_arr, visibility]} key={i}/> )}

                        <ToggleText visibility={visibility} hexs={hexs} bw_text_arr={bw_text_arr} funcs={[setVis, setText]}/>
                    </tr>



                    <tr>
                        <td><RestoreOriginals setText={setText} setVis={setVis} determineText={determineText}/></td>

                        {[3, 4, 5].map((i) => 
                        <ColorBlock i={i} current={current} txt={[text_arr, bw_text_arr, visibility]} key={i+3}/> )}

                        <SeeDetails current={current} text_arr={text_arr}/>
                    </tr>



                    <tr>
                        <td></td>
                        <td><button onClick={() => createPDF(current)}>Download Results</button></td>
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
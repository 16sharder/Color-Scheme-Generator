import React from 'react';
// import {useState} from "react"
import {useHistory, useLocation} from "react-router-dom"

function EditColor () {
    const history = useHistory()
    const location = useLocation()

    const rgbs = location.state.rgbs
    const hsvs = location.state.hsvs

    return (
        <>
        <table className='colors'>
            <tbody>
                <tr>
                    <td><button className="delete" onClick={() => history.push({pathname: "/results", state: {rgbs: rgbs, hsvs: hsvs}})}>Delete Color</button></td>
                    <td></td>
                    <td><button onClick={() => history.push({pathname: "/results", state: {rgbs: rgbs, hsvs: hsvs}})}>Cancel</button></td>
                    <td></td>
                    <td><button onClick={() => history.push({pathname: "/results", state: {rgbs: rgbs, hsvs: hsvs}})}>Save</button></td>
                </tr>
            </tbody>
        </table>
        </>
    )
}

export default EditColor
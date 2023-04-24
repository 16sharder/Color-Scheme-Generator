import React from 'react';
// import {useState} from "react"
import {useHistory, useLocation} from "react-router-dom"

function EditColor () {
    const history = useHistory()
    const location = useLocation()

    const colors = location.state.colors

    return (
        <>
        <table className='colors'>
            <tbody>
                <tr>
                    <td><button className="delete" onClick={() => history.push({pathname: "/results", state: {colors: colors}})}>Delete Color</button></td>
                    <td></td>
                    <td><button onClick={() => history.push({pathname: "/results", state: {colors: colors}})}>Cancel</button></td>
                    <td></td>
                    <td><button onClick={() => history.push({pathname: "/results", state: {colors: colors}})}>Save</button></td>
                </tr>
            </tbody>
        </table>
        </>
    )
}

export default EditColor
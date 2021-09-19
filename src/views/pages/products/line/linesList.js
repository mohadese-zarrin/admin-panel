import React, { useState, useEffect } from 'react'
import api from '../../../../tools/API'

function LinesList() {
    const [lines, setLines] = useState([])
    
    const handleGetLines = () => {
        api.lineListAll().then(res => {
            console.log(res, 'lines res');
            setLines(res.data)
        }).catch(e => [
            console.log(e)
        ])
    }
    useEffect(() => {
        handleGetLines()
    }, [])
    return (
        <div>

        </div>
    )
}

export default LinesList

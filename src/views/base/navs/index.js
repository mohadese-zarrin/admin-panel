import React, { useState } from 'react'
import PIcon from '../icon'
import {Link}from 'react-router-dom'
export default function Dolphin(props) {
    console.log(props, 'props in navs');
    const { name, children,icon,to } = props.data;
    const [isOpen, setIsOpen] = useState(false)
    const toggleNav = () => {

        setIsOpen(!isOpen)
    }
    console.log(isOpen, 'inopen');
    return (
        <div  className={children  && isOpen?'nav-active':'nav'} >
            {/* <div className='nav-title' onClick={() => toggleNav()}>
                <PIcon className='nav-icon' name={icon} size={25} />
                <p className='nav-title-text'>{name}</p>
            </div> */}
            <Link to={to} className='nav-title' onClick={() => toggleNav()}>
                <PIcon className='nav-icon' name={icon} size={25} />
                <p className='nav-title-text'>{name}</p>
            </Link>
            {children  && children.map((data, index) =>
                <Link to={data.to} key={index} className={isOpen?'nav-children-active':'nav-children'}>
                    <p className='nav-children-text'>{data.name}</p>
                </Link>)}
        </div>
    )
}
// onMouseOver={toggleNav} onMouseOut={toggleNav}
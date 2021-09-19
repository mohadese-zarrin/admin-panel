import React, { Component } from 'react'
import glyMap from '../../../assets/icons/glymap.json'
export default function Dolphin(props) {
    const { name, size, color, className, onClick } = props;

    let glyph = name ? glyMap[name] || '?' : '';
    if (typeof glyph === 'number') {
        glyph = String.fromCodePoint(glyph);
    }

    return (
        <span onClick={onClick} className={`pika-icon ${className}`} style={{ fontFamily: 'Pika-Light', color: color, fontSize: size ? size : 25 }}>{glyph}</span>
    )
}
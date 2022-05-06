import React from 'react';
import Cookie from "./cookie";

const Li = (props) => {
    if (props.href === props.page) {
        return (
            <li className="current">
                <a href={props.href}>
                    {props.children}
                </a>

            </li>
        )
    } else {
        return (
            <li>
                <a href={props.href}>
                    {props.children}
                </a>
            </li>
        )
    }

}

const NavBar = (props) => {
    return (
        <div id="nav-wrap">
            <Cookie></Cookie>
            <ul id="nav" className="nav">
                <Li href="/" page={props.page}>
                    Présentation
                </Li>
                <Li href="/etape_0" page={props.page}>
                    Premier point
                </Li>
                <Li href="/QrCodeResult" page={props.page}>
                    QrCode Scannés
                </Li>
            </ul>
        </div>
    )
}

export default NavBar

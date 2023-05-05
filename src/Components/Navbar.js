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
                    Accueil
                </Li>
                <Li href="/etape_0" page={props.page}>
                    1er point
                </Li>
                <Li href="/QrCodeResult" page={props.page}>
                    Avancée
                </Li>
                {/*<Li href="/solution" page={props.page}>*/}
                {/*    Solution*/}
                {/*</Li>*/}
            </ul>
        </div>
    )
}

export default NavBar

import React, {FC, ReactNode} from 'react';
import Cookie from "../Components/Cookie";

interface LiProps {
    href: string;
    page: string;
    children: ReactNode;
}

const Li: FC<LiProps> = ({href, page, children}) => {
    if (href === page) {
        return (
            <li className="current">
                <a href={href}>
                    {children}
                </a>
            </li>
        );
    } else {
        return (
            <li>
                <a href={href}>
                    {children}
                </a>
            </li>
        );
    }
}

interface NavBarProps {
    page: string;
}

const NavBar: FC<NavBarProps> = ({page}) => {
    return (
        <div id="nav-wrap">
            <Cookie/>
            <ul id="nav" className="nav">
                <Li href="/" page={page}> Accueil </Li>
                <Li href="/etape_0" page={page}> 1er point </Li>
                <Li href="/QrCodeResult" page={page}> Avancée </Li>
                {/*<Li href="/solution" page={page}> Solution </Li>*/}
            </ul>
        </div>
    );
}

export default NavBar;

import React, {FC, ReactNode, useEffect, useState} from 'react';
import Cookie from "../Components/Cookie";
import {getLocalStorage, getLocalStorageStartWith, setLocalStorage} from "../Functions/LocalStorage";

interface LiProps {
    children: ReactNode;
    actionMenu: ActionMenu;
    listSousMenu: ActionMenu[];
}


const onClickNavbar = (href: string, type: string, id: string) => {
    switch (type) {
        case "defi":
            if (getLocalStorage("defiId") !== id) {
                setLocalStorage("defiId", id);
            }
            window.location.href = href;
            break;
        case "qrCode":
        case "avancee":
        case "equipe":
            window.location.href = href;
            break;
    }
};

interface ActionMenu {
    name: string;
    href: string;
    type: string;
    id: string;
}

const containHref = (href: string, hrefs: string[]): boolean => {
    for (let i = 0; i < hrefs.length; i++) {
        if (hrefs[i].replace(window.location.origin, "") === href) {
            return true;
        }
    }
    return false;
};

const Li: FC<LiProps> = ({children, actionMenu, listSousMenu}) => {
    return (
        <li className={(containHref(window.location.href.replace(window.location.origin, ""), typeof actionMenu.href === 'string' ? [actionMenu.href] : actionMenu.href) ? "current" : "") + " " + "navbarLi"}
            style={(listSousMenu.length === 0 ? {cursor: "pointer"} : null)}
            onClick={!listSousMenu || listSousMenu.length == 0 ? () => onClickNavbar(actionMenu.href, actionMenu.type, actionMenu.id) : null}>
            <a>
                {children}
            </a> {listSousMenu && <SousMenu listSousMenu={listSousMenu}/>}
        </li>
    );
};

const SousMenu: FC<{ listSousMenu: ActionMenu[] }> = ({listSousMenu}) => {
    if (listSousMenu.length === 0) return null;
    return (
        <ul className="sous-menu">
            {listSousMenu.map((sousMenu, index) => (
                <Li key={index} actionMenu={sousMenu} listSousMenu={[]}>{sousMenu.name}</Li>
            ))}
        </ul>
    );
};

const NavBar: FC = () => {
    const [listSousMenuDefi, setListSousMenuDefi] = useState([{
        name: '1',
        href: "/",
        type: "defi",
        id: "64b66ef1b45f50b48e23eef4"
    }]);
    const listSousMenuQrCode = getLocalStorageStartWith("QrCode").map((qrCode) => {
        const nbQrCode = qrCode.split("-")[1];
        return {
            name: "Qr Code " + nbQrCode,
            href: JSON.parse(getLocalStorage(qrCode)).url,
            type: "qrCode",
            id: nbQrCode
        };
    }).sort((a, b) => a.name.localeCompare(b.name));

    useEffect(() => {
        fetch(process.env.REACT_APP_URL_BACK + "/api/defi/navbar", {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {

                setListSousMenuDefi(result.map((defi: { name: string, _id: string }) => {
                    return {
                        name: defi.name,
                        href: "/",
                        type: "defi",
                        id: defi._id
                    };
                }));
            })
            .catch(error => console.log('error', error));
    }, []);

    return (
        <div id="nav-wrap">
            <Cookie/>
            <ul id="nav" className="nav">
                <Li href="/" actionMenu={{href: listSousMenuDefi.map(item => item.href)}}
                    listSousMenu={listSousMenuDefi}> Défi </Li> <Li href="/etape_0" actionMenu={{
                href: listSousMenuQrCode.map(item => item.href),
                type: "qrCode"
            }} listSousMenu={listSousMenuQrCode}> Qr Code </Li> <Li href="/avancee"
                                                                    actionMenu={{href: "/avancee", type: "avancee"}}
                                                                    listSousMenu={[]}> Avancée </Li> <Li href="/equipe"
                                                                                                         actionMenu={{
                                                                                                             href: "/equipe",
                                                                                                             type: "equipe"
                                                                                                         }}
                                                                                                         listSousMenu={[]}> Équipe </Li>
            </ul>
        </div>
    );
};


export default NavBar;

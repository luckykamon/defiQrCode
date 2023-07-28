import {FC, ReactNode, useEffect, useState} from 'react';
import Cookie from "../Components/Cookie";
import {getLocalStorage, getLocalStorageStartWith, setLocalStorage,} from "../Functions/LocalStorage";
import {changeDefiFromIdToId} from "../Functions/ChangeDefiId";

interface LiProps {
    children: ReactNode;
    actionMenu: ActionMenu;
    listSousMenu: ActionMenu[];
}


const onClickNavbar = (href: string | string[], type: string, id: string) => {
    if (typeof href === 'object') { // href est de type string[]
        return;
    }
    if (type === "defi") {
        const currentDefiId = getLocalStorage("defiId");
        if (currentDefiId !== id) {
            if (confirm("Êtes-vous sûr de vouloir changer de défi ?")) {
                changeDefiFromIdToId(currentDefiId, id);
            }
        }
        window.location.href = href;
    }
    if (type === "qrCode" || type === "avancee" || type === "equipe") {
        window.location.href = href;
    }
};

interface ActionMenu {
    name?: string;
    href: string | string[];
    type?: string;
    id?: string;
}

const containHref = (href: string, hrefs: string[]): boolean => {
    for (let i = 0; i < hrefs.length; i++) {
        if (hrefs[i].replace(window.location.origin, "") === href) {
            return true;
        }
    }
    return false;
};

const isCurrent = (actionMenu: ActionMenu, listSousMenu: ActionMenu[]): boolean => {
    if (listSousMenu.length > 0) {
        for (let i = 0; i < listSousMenu.length; i++) {
            if (isCurrent(listSousMenu[i], [])) {
                return true;
            }
        }
    }
    if (actionMenu.type === "defi" && getLocalStorage("defiId") !== actionMenu.id) {
        return false;
    }
    switch (actionMenu.type) {
        case "defi":
        case "qrCode":
        case "avancee":
        case "equipe":
            return containHref(window.location.href.replace(window.location.origin, ""), typeof actionMenu.href === 'string' ? [actionMenu.href] : actionMenu.href);
    }
};

const isDefiSelected = (actionMenu: ActionMenu): boolean => {
    return actionMenu.type === "defi" && getLocalStorage("defiId") === actionMenu.id;
};

const Li: FC<LiProps> = ({children, actionMenu, listSousMenu}) => {
    return (
        <li className={(isCurrent(actionMenu, listSousMenu) ? "current" : "") + " " + (isDefiSelected(actionMenu) ? "isDefiSelected" : "") + " " + "navbarLi"}
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
        name: 'CÀP 2023',
        href: "/",
        type: "defi",
        id: "64b66ef1b45f50b48e23eef4"
    }]);
    const [listSousMenuQrCode, setListSousMenuQrCode] = useState(getLocalStorageStartWith("QrCode").map((qrCode) => {
        const nbQrCode = qrCode.split("-")[1];
        return {
            name: "Qr Code " + nbQrCode,
            href: JSON.parse(getLocalStorage(qrCode)).url,
            type: "qrCode",
            id: nbQrCode
        };
    }).sort((a, b) => a.name.localeCompare(b.name)));

    useEffect(() => {
        fetch(process.env.REACT_APP_URL_BACK + "/api/defi/navbar", {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {

                setListSousMenuDefi(result.map((defi: {
                    name: string,
                    _id: string,
                    qrCode0: string,
                    nbQrCode: string
                }) => {
                    if (defi._id === getLocalStorage("defiId")) {
                        setLocalStorage("nbQrCode", defi.nbQrCode);
                        const filteredListSousMenuQrCode = listSousMenuQrCode.filter((item) => {
                            return item.name !== "Qr Code 0";
                        });
                        filteredListSousMenuQrCode.push({
                            name: "Qr Code 0",
                            href: window.location.origin + "/" + defi.qrCode0,
                            type: "qrCode",
                            id: defi.qrCode0
                        });
                        setListSousMenuQrCode(filteredListSousMenuQrCode.sort((a, b) => a.name.localeCompare(b.name)));

                    }
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
                <Li actionMenu={{href: listSousMenuDefi.map(item => item.href)}}
                    listSousMenu={listSousMenuDefi}> Défi </Li> <Li actionMenu={{
                href: listSousMenuQrCode.map(item => item.href),
                type: "qrCode"
            }} listSousMenu={listSousMenuQrCode}> Qr Code </Li> <Li actionMenu={{href: "/avancee", type: "avancee"}}
                                                                    listSousMenu={[]}> Avancée </Li> <Li actionMenu={{
                href: "/equipe",
                type: "equipe"
            }} listSousMenu={[]}> Équipe </Li>
            </ul>
        </div>
    );
};


export default NavBar;

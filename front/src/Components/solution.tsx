import React, {ReactNode} from 'react';
import NavBar from "./Navbar";
import Footer from "./Footer";

interface BaliseAIfHrefProps {
    href: string,
    children: ReactNode
}

const BaliseAIfHref: React.FC<BaliseAIfHrefProps> = ({href, children}) => {
    if (href !== "") {
        return <a href={href}>{children}</a>
    } else {
        return <>{children}</>
    }
}

interface ResultScanProps {
    nbQrCode: number,
    mot: string,
    url: string
}

const ResultScan: React.FC = () => {
    let resultScanTab: ResultScanProps[] = [
        {nbQrCode: 0, mot: "Les", url: "/etape_0"},
        {nbQrCode: 1, mot: "capains", url: "/LYUpKr6Jwp5J"},
        {nbQrCode: 2, mot: "font", url: "/MFCJd5deG2LZ"},
        {nbQrCode: 3, mot: "la", url: "/PLb8tfxH6Ngj"},
        {nbQrCode: 4, mot: "fete", url: "/4HIQ7L8B1Ppx"},
        {nbQrCode: 5, mot: "toute", url: "/DcB423kQ8MW2"},
        {nbQrCode: 6, mot: "la", url: "/Z2pkN69lkPTC"},
        {nbQrCode: 7, mot: "soiree", url: "/lB3JBiZ1Q8Pc"},
        {nbQrCode: 8, mot: "aux", url: "/p8KDBcYKZq1d"},
        {nbQrCode: 9, mot: "Gayeulles", url: "/Nl6z6sfAU4qW"},
        {nbQrCode: 10, mot: "en", url: "/Aztd2XY5Tx7C"},
        {nbQrCode: 11, mot: "chantant.", url: "/6M0xLTp5fp9q"}
    ]

    return (
        <tbody>
        {resultScanTab.map(resultScan =>
            <tr key={resultScan.nbQrCode}>
                <td><BaliseAIfHref href={resultScan.url}>{resultScan.nbQrCode}</BaliseAIfHref></td>
                <td><BaliseAIfHref href={resultScan.url}>{resultScan.mot}</BaliseAIfHref></td>
                <td><BaliseAIfHref href={resultScan.url}>{resultScan.url}</BaliseAIfHref></td>
            </tr>
        )}
        </tbody>
    )
}

const TableResult: React.FC = () => {
    return (
        <table style={{textAlign: "center", width: "100%"}} id="ex1-grid" role="grid" aria-labelledby="grid1Label"
               className="data">
            <thead>
            <tr>
                <th style={{width: "25%"}}>Numéro QrCode</th>
                <th style={{width: "25%"}}>Mot trouvé</th>
                <th style={{width: "25%"}}>URL</th>
                {/*<th style={{width: "25%"}}>Date</th>*/}
            </tr>
            </thead>
            <ResultScan></ResultScan>
        </table>
    )
}

interface QrCodeSoluceProps {
    children: ReactNode
}

const QrCodeSoluce: React.FC<QrCodeSoluceProps> = ({children}) => {
    return (
        <div>
            <NavBar page="/solution"/>
            <h3 style={{textAlign: "center", color: "white", marginTop: "40px"}}>Solution:</h3>
            <TableResult/> {children} <Footer/>
        </div>
    )
}

export default QrCodeSoluce

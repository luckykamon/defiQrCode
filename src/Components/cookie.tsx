import React, {FC} from "react";
import CookieConsent from "react-cookie-consent";

const Cookie: FC = () => {

    return (
        <CookieConsent location="bottom" buttonText="Accepter" cookieName="cookieConsent" style={{background: "black"}}
                       buttonStyle={{color: "#4e503b", fontSize: "13px"}} expires={365} onAccept={() => {
            window.location.reload();
        }}> Pour enregistrer vos QrCode, veuillez accepter les cookies 🍪 </CookieConsent>
    )
}

export default Cookie;

import CookieConsent from "react-cookie-consent";

export default function Cookie() {

    return (
        <CookieConsent
            location="bottom"
            buttonText="Accepter"
            cookieName="cookieConsent"
            style={{background: "black"}}
            buttonStyle={{color: "#4e503b", fontSize: "13px"}}
            expires={150}>
            Pour enregistrer vos QrCode, veuillez accepter les cookies 🍪
        </CookieConsent>
    )
}

import {FC} from "react";
import CookieConsent from "react-cookie-consent";

const Cookie: FC = () => {

    return (
        <CookieConsent location="bottom" buttonText="Accepter" ButtonComponent="button" cookieName="cookieConsent"
                       style={{background: "black"}} buttonStyle={{color: "#4e503b", fontSize: "13px"}} expires={365}
                       onAccept={() => {
                           window.location.reload();
                       }} acceptOnOverlayClick={false} acceptOnScroll={false} acceptOnScrollPercentage={25}
                       ariaAcceptLabel={"Accepter les cookies"}
                       ariaDeclineLabel={"Refuser les cookies"}
                       buttonClasses={""}
            buttonId={""}
                       buttonWrapperClasses={""}
                       containerClasses={""}
                       contentClasses={""}
                       // cookieValue customButtonProps customButtonWrapperAttributes customContainerAttributes
                       // customContentAttributes customDeclineButtonProps debug declineButtonClasses declineButtonId
                       // declineButtonStyle declineButtonText declineCookieValue disableButtonStyles disableStyles
                       // enableDeclineButton extraCookieOptions flipButtons hideOnAccept hideOnDecline onDecline
                       // onOverlayClick overlay overlayClasses overlayStyle sameSite setDeclineCookie visible
        > Pour
            enregistrer vos QrCode et accéder aux Équipes, veuillez accepter les cookies 🍪 </CookieConsent>
    )
}

export default Cookie;



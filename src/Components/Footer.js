import React from "react";
import Fade from "react-reveal";

const Footer = () => {
    return (
        <footer>
            <div className="row">
                <Fade bottom>
                    <div className="twelve columns">
                        <ul className="copyright">
                            <li>Copyright &copy; 2022 Lucas Bodin &bull; <a href="/confidentialite">Politique de confidentialité</a></li>
                        </ul>
                    </div>
                </Fade>
            </div>
        </footer>
    );
}

export default Footer;

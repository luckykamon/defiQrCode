import React, {FC} from "react";

const Footer: FC = () => {
    return (
        <footer className={"footer"} style={{position: 'relative', width: '100%', marginTop: 'auto'}}>
            <div className="row">
                <div className="twelve columns">
                    <ul className="copyright">
                        <li style={{
                            background: 'linear-gradient(to right, #fe6928, white, #fe6928)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Copyright &copy; 2022 - 2023 &bull; Lucas Bodin &bull; <a href="/confidentialite">Politique
                            de confidentialité</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

import {FC} from "react";

const Footer: FC = () => {
    return (
        <footer className={"footer"} style={{position: 'relative', width: '100%', marginTop: 'auto'}}>
            <div className="row">
                <div className="twelve columns">
                    <ul className="copyright">
                        <li style={{
                            background: 'transparent',
                            color: 'white'
                        }}>Copyright &copy; 2022 - 2024 &bull; <a href="https://www.linkedin.com/in/lucasbodin" target="_blank" rel="noreferrer" style={{color: "white"}}>Lucas Bodin</a> &bull; <a href="/confidentialite" style={{color: "white"}}>Politique
                            de confidentialité</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

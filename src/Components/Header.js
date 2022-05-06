import React, {Component} from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";

class Header extends Component {
    render() {
        if (!this.props.data) return null;

        // const project = this.props.data.project;
        const github = this.props.data.github;
        const linkedin = this.props.data.linkedin;
        const name = this.props.data.name;
        const description = this.props.data.description;

        return (
            <header id="home">
                <ParticlesBg type="lines" bg={true}/>
                <div id="nav-wrap">
                    <ul id="nav" className="nav">
                        <li className="current">
                            <a className="smoothscroll" href="#home">
                                Accueil
                            </a>
                        </li>

                        <li>
                            <a className="smoothscroll" href="#about">
                                À propos
                            </a>
                        </li>

                        <li>
                            <a className="smoothscroll" href="#resume">
                                Résumé
                            </a>
                        </li>

                        <li>
                            <a className="smoothscroll" href="#contact">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="row banner">
                    <div className="banner-text">
                        <Fade bottom>
                            <h1 className="responsive-headline">{name}</h1>
                        </Fade>
                        <Fade bottom duration={1200}>
                            <h3>{description}.</h3>
                        </Fade>
                        <hr/>
                        <Fade bottom duration={2000}>
                            <ul className="social">
                                <a href={github} target="_blank" rel="noreferrer" className="button btn github-btn">
                                    <i className="fa fa-github"/>Github
                                </a>
                                <a href={linkedin} target="_blank" rel="noreferrer" className="button btn github-btn">
                                    <i className="fa fa-linkedin"/>Linkedin
                                </a>
                            </ul>
                        </Fade>
                    </div>
                </div>

                <p className="scrolldown">
                    <a className="smoothscroll" href="#about">
                        <i className="icon-down-circle"/>
                    </a>
                </p>
            </header>
        );
    }
}

export default Header;

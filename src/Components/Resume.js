import React, {Component} from "react";
import Fade from "react-reveal";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faCoffee} from '@fortawesome/free-solid-svg-icons'
import {
    faCss3Alt,
    faDocker,
    faGithub,
    faGitlab,
    faHtml5,
    faJava,
    faJs,
    faPhp,
    faPython
} from '@fortawesome/free-brands-svg-icons'
import {ReactSVG} from "react-svg";

// const ShowText = (props) => {
//
//     const [hovering, setHovering] = useState(props.children)
//
//     const mouseEnter = () => {
//         setHovering(<span style={{width: "12%", height: "25%", margin: "5%"}}>
//           {props.name_stack}
//           </span>
//         )
//     }
//
//     const mouseLeave = () => {
//         setHovering(props.children)
//     }
//
//     return (
//         <span style={{display: "grid"}}>
//             {hovering}
//             <span>{props.name_stack}</span>
//         </span>
//     )
// }

class Resume extends Component {

    render() {
        if (!this.props.data) return null;

        const education = this.props.data.education.map(function (education) {
            return (<div key={education.graduated}>
                <h3>{education.school}</h3>
                <p className="info">
                    {education.degree} <span>&bull;</span>
                    <em className="date">{education.graduated}</em>
                </p>
                <p>{education.description}</p>
            </div>);
        });

        const work = this.props.data.work.map(function (work) {
            return (<div key={work.company}>
                <h3>{work.company}</h3>
                <p className="info">
                    {work.title}
                    <span>&bull;</span> <em className="date">{work.years}</em>
                </p>
                <p>{work.description}</p>
            </div>);
        });

        return (<section id="resume">
            <Fade bottom duration={1300}>
                <div className="row work">
                    <div className="three columns header-col">
                        <h1>
                            <span>Travail</span>
                        </h1>
                    </div>

                    <div className="nine columns main-col">{work}</div>
                </div>
            </Fade>

            <Fade bottom duration={1300}>
                <div className="row education">
                    <div className="three columns header-col">
                        <h1>
                            <span>Ecole</span>
                        </h1>
                    </div>

                    <div className="nine columns main-col">
                        <div className="row item">
                            <div className="twelve columns">{education}</div>
                        </div>
                    </div>
                </div>
            </Fade>

            <div className="row skill">
                <Fade bottom duration={1300}>
                    <div className="three columns header-col">
                        <h1>
                            <span>Stack Technique</span>
                        </h1>
                    </div>
                </Fade>

                <div>
                    <Fade bottom duration={1300}>
                        <div className="nine columns main-col">
                            <h3>IDE</h3>
                            <div className="info">
                                <ReactSVG src="/svg/jetBrains.svg" wrapper="span"/>
                                <ReactSVG src="/svg/visualStudioCode.svg" wrapper="span"/>
                                <ReactSVG src="/svg/eclipse.svg" wrapper="span"/>
                            </div>
                        </div>
                    </Fade>

                    <Fade bottom duration={1300}>
                        <div className="nine columns main-col" style={{float: "right"}}>
                            <h3>Language</h3>
                            <div className="info">
                                <FontAwesomeIcon icon={faPython}
                                                 style={{
                                                     color: "black", width: "12%", height: "25%", margin: "5%"
                                                 }}/>
                                <ReactSVG src="/svg/c.svg" wrapper="span"/>
                                <ReactSVG src="/svg/c++.svg" wrapper="span"/>
                                <FontAwesomeIcon icon={faJava}
                                                 style={{
                                                     color: "black", width: "12%", height: "25%", margin: "5%"
                                                 }}/>
                                <FontAwesomeIcon icon={faHtml5}
                                                 style={{
                                                     color: "black", width: "12%", height: "25%", margin: "5%"
                                                 }}/>
                                <FontAwesomeIcon icon={faCss3Alt}
                                                 style={{
                                                     color: "black", width: "12%", height: "25%", margin: "5%"
                                                 }}/>
                                <FontAwesomeIcon icon={faJs}
                                                 style={{
                                                     color: "black", width: "12%", height: "25%", margin: "5%"
                                                 }}/>
                                <FontAwesomeIcon icon={faPhp}
                                                 style={{
                                                     color: "black", width: "12%", height: "25%", margin: "5%"
                                                 }}/>
                                <ReactSVG src="/svg/ocaml.svg" wrapper="span"/>
                            </div>
                        </div>
                    </Fade>

                    <Fade bottom duration={1300}>
                        <div className="nine columns main-col" style={{float: "right"}}>
                            <h3>Git</h3>
                            <div className="info">
                                <FontAwesomeIcon icon={faGitlab}
                                                 style={{
                                                     color: "black", width: "12%", height: "25%", margin: "5%"
                                                 }}/>
                                <FontAwesomeIcon icon={faGithub}
                                                 style={{
                                                     color: "black", width: "12%", height: "25%", margin: "5%"
                                                 }}/>
                            </div>
                        </div>
                    </Fade>

                    <Fade bottom duration={1300}>
                        <div className="nine columns main-col" style={{float: "right"}}>
                            <h3>Base de données</h3>
                            <div className="info">
                                <ReactSVG src="/svg/mysql.svg" wrapper="span"/>
                                <ReactSVG src="svg/sql-server.svg" wrapper="span"/>
                            </div>
                        </div>
                    </Fade>

                    <Fade bottom duration={1300}>
                        <div className="nine columns main-col">
                            <h3>Autre</h3>
                            <div className="info">
                                <FontAwesomeIcon icon={faDocker}
                                                 style={{
                                                     color: "black", width: "12%", height: "25%", margin: "5%"
                                                 }}/>
                                <ReactSVG src="/svg/postman.svg" wrapper="span"/>
                                <ReactSVG src="/svg/tensorflow.svg" wrapper="span"/>
                                <ReactSVG src="/svg/genesys.svg" wrapper="span"/>
                            </div>
                        </div>
                    </Fade>

                </div>
            </div>
        </section>);
    }
}

export default Resume;

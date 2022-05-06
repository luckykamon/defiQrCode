import React, {Component} from "react";
import {Fade} from "react-reveal";
import ParticlesBg from "particles-bg";

class Contact extends Component {
    render() {
        if (!this.props.data) return null;

        const phone = this.props.data.phone;
        const message = this.props.data.contactmessage;

        const sendEmail = () => {
            let subject = document.getElementById('contactSubject').value
            let body = document.getElementById('contactMessage').value
            window.open('mailto:lucas.bodin.contacter@gmail.com?subject=' + subject + '&body=' + body)
        }

        return (
            <section id="contact">


                <div className="row section-head">
                    <Fade left duration={1000}>
                        <div className="two columns header-col">
                            <h1>
                                <span>Contact</span>
                            </h1>
                        </div>
                    </Fade>
                    <Fade right duration={1000}>
                        <div className="ten columns">
                            <p className="lead">{message}</p>
                        </div>
                    </Fade>
                </div>

                <div className="row">
                    {/*<Fade left duration={1000}>*/}
                    <div className="eight columns">
                        <fieldset>
                            <Fade left duration={1000}>
                                <div>
                                    <label htmlFor="contactSubject">
                                        Objet
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue=""
                                        size="35"
                                        id="contactSubject"
                                        name="contactSubject"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </Fade>

                            <Fade left duration={1000}>
                                <div>
                                    <label htmlFor="contactMessage">
                                        Message
                                    </label>
                                    <textarea
                                        cols="50"
                                        rows="15"
                                        id="contactMessage"
                                        name="contactMessage"
                                    />
                                </div>
                            </Fade>

                            <Fade left duration={1000}>
                                <div>
                                    <button
                                        className="submit"
                                        onClick={sendEmail}>Enoyer un mail
                                    </button>
                                    <span id="image-loader">
                                        <img alt="" src="images/loader.gif"/>
                                    </span>
                                </div>
                            </Fade>
                        </fieldset>
                    </div>
                    {/*</Fade>*/}

                    <Fade right duration={1000}>
                        <aside className="four columns footer-widgets">
                            <div className="widget widget_contact">
                                <h4>Numéro de téléphone</h4>
                                <p className="address">
                                    <a href={"tel:" + phone}><span>{phone}</span></a>
                                </p>
                            </div>


                        </aside>
                    </Fade>
                </div>
                <ParticlesBg type="lines" bg={true}/>
            </section>
        );
    }
}

export default Contact;

import React from 'react'
import './AboutView.scss'

export const AboutView = () => (
    <div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="header">
                            <h3 className="title">Getting Started</h3>
                        </div>
                        <div style={{padding: "30px", paddingTop:"15px"}}>
                            <h4 style={{marginTop:"0px"}}>How to use the tool</h4>
                            <p>
                                Just type in <code>w</code> + <code>space / tab</code> + <code>your keywords</code> into the address bar. <br />
                                For more search options you can visit our <a href="howto.html"> full guide</a>.
                            </p>

                            <h4>Importing your existing History & Bookmarks</h4>
                            <p>
                                By default, WorldBrain only makes the pages available you visit after installing the extension.<br />
                                BUT you can import your existing history & bookmarks <a href="analyse_urls.html">here</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-md-8">
            <div className="card">
                <div className="header">
                    <h3 className="title" style={{marginBottom:"-20px"}}>Available Features</h3>
                </div>
                <div style={{padding: "30px"}}>
                    <ul>
                        <li>full-text search your browsing history & bookmarks</li>
                        <li>filter by time & exclude words from search</li>
                        <li>blacklist URLs, domains and regex</li>
                        <li>search visited PDFs</li>
                        <li>import existing history & bookmarks</li>
                    </ul>
                    <h4>Recent Upgrades</h4>
                        <ul>
                            <li>Importing existing browser history and bookmarks</li>
                            <li>PDF Support</li>
                        </ul>
                    <h4>Upcoming Upgrades</h4>
                        <ul>
                            <li>Web interface to display all results and apply filters (i.e. time, author, domain) (<a href="https://github.com/WorldBrain/Research-Engine/issues/24" target="_blank">More about that</a>)</li>
                        </ul>
                </div>
            </div>
        </div>

        <div className="col-md-8">
            <div className="card">
                <div className="header">
                    <h3 className="title">Our Vision</h3>
                </div>
                <div style={{padding: "30px"}}>
                    <p>
                        <iframe style={{marginLeft: "14%"}} width="560" height="315" src="https://www.youtube.com/embed/_QJMp2ZIAIQ" frameBorder="0" allowFullScreen></iframe>
                    </p>
                    <p style={{paddingTop:"10px"}}>
                        <strong>
                        Welcome to the WorldBrain project. We work on the goal of an increased (scientific) literacy in our global society through a better overall information quality on the internet.
                        <br />

                        Doing so by developing open-source search tools for professional web-researchers like science communicators, (STEM-) students, journalists, librarians and online debaters to effortlessly find, rate and share qualitative and trustworthy web content/notes with their friends, followers and the public.
                        <br />
                        With our software we aim to gather a diverse community of people that loves working with fact-based and intellectually honest information. 

                        </strong>

                        <br />
                        <br /> 

                        Our first tool, The (Re)search engine, is a fully decentralised search engine for the places where you store and communicate your digital knowledge. <br />
                        It lets you full-text search all the pages you visited and bookmarked, as well as Evernote, Pocket, Google Drive/Docs, Asana, Mendeley and many more.
                        In later stages you can <strong>voluntarily share</strong> selected content recommendations and metadata about your browsing behaviour with your friends, the community and WorldBrain.<br />
                        <br />
                        This will lay the foundation for crowdsourced/collaborative web-research. <br />
                        Your network then can search through all of your recommmendations and see related content to articles (i.e. counter perspectives or unsourced studies) you found in your web-research - and vise versa. 
                        <br />
                        At the WorldBrain project, we analyse those recommendations to develop the quality/trust scores for websites and their content.
                        <br/><br/>
                    </p>
                </div>
            </div>
        </div>


         <div className="col-md-8">
            <div className="card">
                <div className="header">
                    <h3 className="title">What happens with my data?</h3>
                </div>
                <br />
                <div style={{padding: "30px", paddingTop:"15px"}}>
                    <p>
                        We have no access to any your data and won't ever have without your prior approval.
                        <strong>Your data truly stays yours.</strong>
                        <br /><br />
                        In later stages you can <strong>voluntarily share</strong> parts of your metadata & selected content-recommendations with your friends, the community and WorldBrain.
                        <br /><br />
                        For any questions you can visit <a href="FAQ.html" target="_blank">our FAQ</a>.
                    </p>
                </div>
            </div>
        </div>
    </div>
)









export default AboutView

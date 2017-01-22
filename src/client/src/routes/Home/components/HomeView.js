import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

export const HomeView = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-8">
                <div className="card">
                    <div className="header">
                        <h3 className="title">Thank you for your interest in making this tool become even better! </h3>
                    </div>
                     <div style={{padding:"30px"}}>
                        <h4>Bugs? Feature-Requests?</h4>
                        <p>
                            To report that, you can either open a <a href="https://www.github.com/WorldBrain/Research-Engine/issues/new">new GitHub issue</a> or by writing us a mail at <a href="mailto:info@worldbrain.io?subject=FEEDBACK"> info@worldbrain.io</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default HomeView

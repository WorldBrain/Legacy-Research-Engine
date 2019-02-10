import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = (props) => (
  <nav className="navbar navbar-default navbar-fixed">
      <div className="container-fluid">
          <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" >{props.title}</a>
          </div>
           <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                  <li>
                     <a href="http://worldbrain.io/patreon_feed">
                        Follow our progress on Patreon <img src="assets/img/patreon_logo_black.png" width="25px" style={{marginLeft:"10px"}} />
                      </a>
                  </li>
              </ul>
          </div>
      </div>
  </nav>
)

export default Header


// <div>
//   <h1>React Redux Starter Kit</h1>
//   <IndexLink to='/' activeClassName='route--active'>
//     Home
//   </IndexLink>
//   {' · '}
//   <Link to='/counter' activeClassName='route--active'>
//     Counter
//   </Link>
// </div>

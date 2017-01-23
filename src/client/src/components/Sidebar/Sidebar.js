import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Sidebar.scss'
import sidebarBackground from "./assets/background_sidebar.png"
import logoDashboard from "./assets/logo_dashboard.png"

export const Sidebar = () => (
    <div className="sidebar">
        <div className="sidebar-wrapper" style={{backgroundImage:`url("${sidebarBackground}")`, backgroundSize: "cover"}}>
          <div className="logo">
              <a href="http://worldbrain.io" className="simple-text">
                  <img src={logoDashboard} style={{width:"90%", padding:"3px"}} />
              </a>
          </div>

          <ul className="nav">
              <li>
                  <a href="about.html">
                      <i className="pe-7s-info"></i>
                      <p>About</p>
                  </a>
              </li>
                <li>
                  <a href="analyse_urls.html">
                      <i className="pe-7s-download"></i>
                      <p>Import History & Bookmarks</p>
                  </a>
              </li>
              <li>
                  <a href="preferences.html">
                      <i className="pe-7s-tools"></i>
                      <p>Preferences</p>
                  </a>
              </li>
              <li>
                  <a href="howto.html">
                      <i className="pe-7s-rocket"></i>
                      <p>How to use</p>
                  </a>
              </li>
              <li>
                  <a href="http://worldbrain.io/faq">
                      <i className="pe-7s-help1"></i>
                      <p>Frequently asked Questions</p>
                  </a>
              </li>
              <li className="active">
                  <a href="feedback.html">
                      <i className="pe-7s-loop"></i>
                      <p>Feedback</p>
                  </a>
              </li>
              <li className="active-pro">
                  <div>
                      <a href="contribute.html">
                      <button className="btn btn-success" style={{marginLeft:"50px"}}>Contribute to Development</button>
                          </a>
                  </div>
                  <br />
                  <div className="social" style={{whiteSpace:"nowrap", marginLeft:"42px", marginBottom:"30px"}}>
                    <a href="http://worldbrain.io/patreon_feed">
                      <img className="icon icons8-Message" src="assets/img/patreon_logo_white.png" width="30" height="30" />
                    </a>
                    <a href="http://www.github.com/WorldBrain" target="_blank">
                      <img className="icon icons8-GitHub" src="data:image/png;base64,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" width="30" height="30" />
                    </a>  
                    <a href="http://www.facebook.com/realworldbrain" target="_blank">
                      <img className="icon icons8-Facebook" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAC10lEQVRoQ+1ai3HTQBTc7QAqgFQQqADoAFcAHZBUAFRAUgGkApIKCBUkqYCkA6hgmVXuPGf7ZF0snyTP6GY8ceyT7+17+z7Se0TLkvQBwFsAr8KrbesQn98C8OuS5FXuQK5/KOk9gG8AXg4h4Q5n3AM4JXmZXrsCRJIBnIQNDwDOAFyTtDZGW5LMCrPDsr0IgpyRPI1CLYFIstCfwhdG7P8ntyQZjBXudU6yUXwDJNDpZ/jy9dgW6NJesNBN2LcwzSKQP8EnJmuJjC9Hy9yTPKKkjwC+A3ggOVUHzxpJkh3fPrMwkB8AHGoPxhoRVeIvFwZirjkqTN43MvSy3Jb/1kDUeD25kVO6nG4K3y/lHwNIqBqceK3R1C+vAZj3zlu/S6LnKEBC2HSYLw0qTUTaZvnBgQQQvwA8s7YBOMi4dvqbOK+zt0H6rwNQJ+XHABKDygVJh/ytq5TygwJJKofiXDVVIE/OVVMF4mj0BsA7kn6/XJLsM58BOIptBIGutDA0tVpzVVJZZH3mkIA0IHPW6goIoXJ/VFIpF0t+tG3PtjP6nj8lavUqkaoDiQekVsrxPbdvzbLP06SZKRzrUmtfQEZ39j7cl+QSxeWMC0e/b12DUatLozkJJX0JuaWznJk6kFgJfCVpUAdrkdZK4FCd/Yikb7TGt0iP8PuPpOuwrau6j6Snz5m9yxyPT0nrJsTZIgVWyCqpTwYuPXP2kQJNzT5SoKSNLTO1CrQ2U6tASTO1eilJkh/hH9ds9NRy9qQpejdI660ikNgQbVpvflTpnkVnL2IX0/uaikBiN3oR29OxO1qlIVoDSNIIbZ7wDzIwsG8grQMDwfzpCMcJyfNdqdR6X51puD61aJXkMZM4XrI6whEPXptHMd18QVFTsui+ekcgwQJuS9i5Y+thCcJnt405GUCcwtmXYfb1O55aMmPax5zWblgczWIL2XlmzHWXDJ6tAIhC/QfJdOM+5ZDCYAAAAABJRU5ErkJggg==" width="30" height="30" /></a>
                    <a href="http://www.twitter.com/realworldbrain" target="_blank">
                      <img className="icon icons8-Twitter" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEzklEQVRoQ+2Zj1EVQQzGkwrUCtQKxArUCtQKhAqUCtQK1AqUCsQK1ArECpQKxAri/M7kGfb+7d3tgMOwM294wN7ufsmXL9mcyhUZekVwyDWQ/82T1x5p4REzuyMi90Rkz9c7E5ETVf26dP1L8YiZPRORFwlAeW4AvRWRd6rK997wNfZ9zvE5IGb2UESei8jB2AJLLZXnmxmW/ygieILxW0S+4AX//aaIcAa8xADEoap+4Bcz4/+PReRVWuNIVfdLID98Ags/agnGzJ6IyHsR4TCneERVj0esDVAOi+cYAMEIQcH82H1VPdkB8Y2wVoxmYNwTnx1EZ8EazzpDAHsjzf8kIg98rU+qioH+5REzAzUWOHLkuLcJGDMLT1eDiIO7ETgsZ4GGb0QkDEEcQcWz7JHY7FF6KMAQM8HjGmPu5pgZFHkpIl9VlU1XDY8PGDO0xmkGYr7DLWLDH8RLBNe5oFtykuQNYg6LrhpmxrNQqhwIxsMeEFUtBQD3oWQMFsM7P2tO47T4RnCraihVzaO9OR7DQTEEAy8zOM+HDASrE1SdCuSVPOjwzm3/O99fzwFKtCIfkDc2DzPDqBh3B4IvGQjqAI2eDsmiUw2+h3d4HkDHqoqSDFkx4gPQfN80zCyzo/NELJiBYDEUYSdpI4crNZ5pUA1DQD2CusvGySOtgEQc9+ItA4F3HAh63a2gDYAAjxRmnQdDVzN5cmVeUyBlHJ+jVmFBCrf7tTzwGCIQc3mRH1+cP0bY0HlkEoiZRfnQZUr4r6oHtWDyPAeGh6OkII5W5aFi3Sogwb/8bJPMvsYY5TMuNr9qPBLyS4LJnB9UsRaHW7KGe5l6bbBCyMEemRM68R1aEKhQbPBOsOQgW+eaGaIC/QdVNQMJzZ+U360HWvt8Kmq5n0RC3C2XgWB9CkfGrPyuPdDa51LN1qs8huQ3SvkvqkoV/F+MVLP9VlXUsDfKApFJKBU11Wr5bY3ezKLqGM1HveaDoyfYUS48BCcvNdgTrUYVdLCLUoCJjgbWqCrfW3okXcEnrwJjQMjuFJDlHaJZOV4L1szIHZQ+g2oV64wBCU6W+zWpmRaAAABASNJ3pig+BiRL8aELAIXkhcaKmXG7JDHPVs+jncaUgIgLtPuiQUSCpge2N7f/FBCkGPWik8JPFONCwKS8AQurmhaTvd9Cvcgvq9tCC+ICAxIXUKo6Jmeb2N4x5xob/Vi8Q62DHG6+YwyU6/SuUM3vXZunkgWzQGIjv3+jZuW1tlmZ75c7qty/vaoFhqoGkgBFPRZ/agJkC4he0TjFYzOjVYRHomWJmuxv6R6yX9EKXeyJyYToG8TbJA4OZ/M7DWLkbS1/xwzkYsJlicBeDaLziJcALBSBy/ehUhkPQKsWAFifRl807QjsJ1tqOYAAIBQpG4/FSYaoFF2QJgWjvzLLb5zeAWirdwGCdeB+ViTklvvIYCu0NickgYCWvHtBkYKivPAEwOoOfT5H2Wkse7tk8twKrfaK8x+BIMbyOw0oCoBd33apYWZviElFCG48NEQ5LBgt0bwmls6fXuXsXm7igXLxuRKFg0UrFBGI1wo1RiTGOHT32RoDcxsuSohergTHw/qxB7Tjc7YkI88dsPb/i4DULnoZ866BXIbVp/b8A4aTMhceQ8y9AAAAAElFTkSuQmCC" width="30" height="30" />
                    </a>
                    <a href="mailto:info@worldbrain.io" target="_blank">
                      <img className="icon icons8-Message" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAC4ElEQVRoQ+2Z7XETMRCG360AOoAOgAoIFRAqgFRAUgF0gFMBSQVABUAFQAfQAVSwzHOz8pxl2fflO9s3t/8ysaR99uPVyjbNxGwmHFpATi2TS0aWjIwUAXN3H2nvSbedH4iZnWXjp4paZ2Q2IJKemdnPSQt74GHu/lTSD7ap98hfSS/OBSYgvkp6mIPwNzA3ZnY3MFijLnf3N5I+JIgc5F7S6/Dg6lRh3P2tpFX4ufZ5o9nd/TpI+dydmV2NGtqOm7v7R0lkA6NyVjtVK9LGggomFlByRzN3pw/w6VLSP0nXqWL2ym800jdJDyShZIjAUWACgqZGoYC4qAtS4z0SMGTkScDQN5PKc/jwSdJjSb8oq9yHRhDqKKJBZoCZVJ4zeQWCTGxVRSuQGgwqgaJNIs9Zn6JM9ESxtFuDpA53d8psdHnO5dXMkkoVxaYzSGSHTdeKdmh5zuS11V3WC6QGQ6mhaAeR54K80tSf2+h9b5CAQQoPIs9N8toEMwgkYC4koe8YstxZnvPBr88EPggkHKBXyEyyTvLs7gSCO6KaXvsGpDdINnlWlxTy2EXRCvJKz6XLt5PE9wJxd0ZnnMY29D2TZ3T/tlTfu+Q1eiXdVyxdmdnNQXskDqEMKAesmjzzQ7JIIwY48yV66mUEIe1RlNfCHq/2zXmtM5LNO1tDWwEGR5FO5Llk7HFpZoAWLRtaf0sCpjjntQLJorNz3inA0MCUIGM3cxrGegDJUuMkXZjzii/XRpDslr1vGhWaarnv/92dEuZViG099vY9rIhmff5fP2L6OjN0XVRGmiY23kdFkOyC+hO1POkbpKFvKM1H9SfFFkjUdFKi7wHRWMtDo91lffQNMM9jHX1Y+Vz67vfWzNJd0eWcyT7r7u8lvasfWAdBFltPnZN5vVuiUUSmgUrm6yDz+Mp0Nl9izwbk2DU/9Pz5/GI1NBKnsv4sf24rBW8BOZWSSn4sGVkyMlIE/gNVxynB/uEqKQAAAABJRU5ErkJggg==" width="30" height="30" />
                    </a>
                  </div>
              </li>
          </ul>
      </div>
    </div>
)

export default Sidebar

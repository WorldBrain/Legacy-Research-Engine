import React from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = (props) => (
  <div className='wrapper'>
    <Sidebar />
    <div className="main-panel">
      <Header title={"Feedback"} />
      <div className='content'>
        {props.children}
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout

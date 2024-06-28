import './index.css'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <div className="header-logo-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
      </div>
      <ul className="link-container">
        <Link to="/" className="link-element">
          <li className="header-li">Home</li>
        </Link>
        <Link to="/jobs" className="link-element">
          <li className="header-li">Jobs</li>
        </Link>
      </ul>
      <ul className="icon-and-logout-btn-container">
        <Link to="/" className="link-icon-element">
          <li className="icon-li">
            <AiFillHome />
          </li>
        </Link>
        <Link to="/jobs" className="link-icon-element">
          <li className="icon-li">
            <BsBriefcaseFill />
          </li>
        </Link>
        <li className="icon-li">
          <button onClick={onClickLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)

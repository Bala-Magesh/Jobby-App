import './index.css'

import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMessage: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmit = async event => {
    event.preventDefault()
    console.log('on submit')
    const {username, password} = this.state
    const creds = {username, password}

    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(creds),
    })
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 7})
      const {history} = this.props
      history.replace('/')
    } else {
      console.log(data)
      this.setState({showError: true, errorMessage: data.error_msg})
    }
  }

  render() {
    const {username, password, showError, errorMessage} = this.state

    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="jobby-app-bg-container">
        <form className="login-form" onSubmit={this.onSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="jobby-app-logo"
          />
          <label className="label-text" htmlFor="username">
            USERNAME
          </label>
          <input
            id="username"
            placeholder="Username"
            value={username}
            onChange={this.onChangeUsername}
            type="text"
            className="input-element"
          />
          <label className="label-text" htmlFor="password">
            PASSWORD
          </label>
          <input
            id="password"
            placeholder="Password"
            value={password}
            onChange={this.onChangePassword}
            type="password"
            className="input-element"
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {showError && <p className="error-message">*{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default Login

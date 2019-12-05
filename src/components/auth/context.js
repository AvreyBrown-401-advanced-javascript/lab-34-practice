import React from 'react'
import jwt from 'jsonwebtoken'
import cookie from 'react-cookies'

export const LoginContext = React.createContext()

class LoginWrapper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      token: null,
      user: {},
      login: this.login,
      logout: this.logout
    }
  }

  login = (username, password) => {
    console.log(`logging in as ${username}...`)
    fetch('https://api-js401.herokuapp.com/signin', {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`
      })
    })
      .then(res => res.text())
      .then(token => this.validateToken(token))
      .catch(console.error)
  }

  logout = () => {
    console.log(`logging out...`)
    cookie.save('auth', null)
    this.setState({
      loggedIn: false,
      token: null,
      user: {}
    })
  }

  validateToken = token => {
    try {
      const user = jwt.verify(token, process.env.REACT_APP_SECRET)
      cookie.save('auth', token)
      this.setState({
        loggedIn: true,
        token,
        user
      })
    } catch (e) {
      this.logout()
      console.error('Token Validation Error', e)
    }
  }

  render () {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    )
  }
}

export default LoginWrapper

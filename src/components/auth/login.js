import React from 'react'
import { LoginContext } from './context'


class Login extends React.Component {
  static contextType = LoginContext

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.context.login(this.state.username, this.state.password)
  }

  render () {
    return (
      <>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Username"
              name="username"
              onChange={this.handleChange}
            />
            <input
              placeholder="Password"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <input type="submit" value="Login" />
          </form>

      </>
    )
  }
}

export default Login

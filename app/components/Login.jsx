import React from 'react'

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'



export const Login = ({ login }) => {

return  (
  <form onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
  } }>
    <input name="username" />
    <input name="password" type="password" />
    <input type="submit" value="Login" />
  </form>
)}


export default connect (
  state => ({}),
  {login}
)(Login)

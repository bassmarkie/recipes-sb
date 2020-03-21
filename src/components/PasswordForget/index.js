import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import { Message, Button, Form, Card } from 'semantic-ui-react'

const PasswordForgetPage = () => (
  <div>
    <h1>Password Forget</h1>
    <PasswordForgetForm />
  </div>
)
const INITIAL_STATE = {
  email: '',
  error: null
}
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }
  onSubmit = event => {
    const { email } = this.state
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => {
        this.setState({ error })
      })
    event.preventDefault()
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    const { email, error } = this.state
    const isInvalid = email === ''
    return (
      <Card>
        <Card.Header content="Forget Password" />
        <Form onSubmit={this.onSubmit}>
          <Form.Input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <Button disabled={isInvalid} type="submit">
            Reset My Password
          </Button>
          {error && <p>{error.message}</p>}
        </Form>
      </Card>
    )
  }
}
const PasswordForgetLink = () => (
  <Message>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </Message>
)

export default PasswordForgetPage
const PasswordForgetForm = withFirebase(PasswordForgetFormBase)
export { PasswordForgetForm, PasswordForgetLink }

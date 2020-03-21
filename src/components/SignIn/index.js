import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'

const SignInPage = () => (
  <Grid textAlign="center" style={{ height: '100vh' }}>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="orange" textAlign="center">
        <Image src="/logo512.png" /> Sign In To Your Account
      </Header>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </Grid.Column>
  </Grid>
)
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}
class SignInFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }
  onSubmit = event => {
    const { email, password } = this.state
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.HOME)
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
    const { email, password, error } = this.state
    const isInvalid = password === '' || email === ''
    return (
      <Form size="large" onSubmit={this.onSubmit}>
        <Segment>
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            name="email"
            value={email}
            onChange={this.onChange}
            placeholder="Email Address"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            color="orange"
            fluid
            size="large"
            disabled={isInvalid}
          >
            Sign In
          </Button>
          {error && <p>{error.message}</p>}
        </Segment>
      </Form>
    )
  }
}
const SignInForm = compose(withRouter, withFirebase)(SignInFormBase)
export default SignInPage
export { SignInForm }

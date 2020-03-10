import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Checkbox,
  Message
} from 'semantic-ui-react'

const SignUpPage = () => (
  <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="orange" textAlign="center">
        <Image src="/logo512.png" /> Sign Up For An Account
      </Header>
      <SignUpForm />
    </Grid.Column>
  </Grid>
)

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null
}

class SignUpFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }
  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state
    const roles = {}

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN
    }
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles
        })
      })
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

  onChangeCheckbox = event => {
    this.setState({ isAdmin: true })
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error
    } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''

    return (
      <Form size="large" onSubmit={this.onSubmit}>
        <Segment>
          <Form.Input
            fluid
            icon="user outline"
            iconPosition="left"
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Name"
          />
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <Checkbox
            label="make admin"
            name="isAdmin"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
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
        </Segment>
        {error && <p>{error.message}</p>}
      </Form>
    )
  }
}
const SignUpLink = () => (
  <Message>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </Message>
)

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase)

export default SignUpPage
export { SignUpForm, SignUpLink }

import React from 'react'

import { PasswordForgetForm } from '../PasswordForget'
import PasswordChangeForm from '../PasswordChange'
import { withAuthorization, AuthUserContext } from '../Session'
import { Grid, Header, Card } from 'semantic-ui-react'

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Grid textAlign="center" style={{ height: '100vh' }} columns={1} padded>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="orange" textAlign="center">
            Account: {authUser.email}
          </Header>

          <PasswordForgetForm centered />

          <Card centered>
            <Card.Header content="Change Password" />
            <PasswordChangeForm />
          </Card>
        </Grid.Column>
      </Grid>
    )}
  </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser

export default withAuthorization(condition)(AccountPage)

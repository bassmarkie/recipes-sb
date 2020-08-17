import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from '../Navigation'

import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
import AccountPage from '../Account'
import AdminPage from '../Admin'
import RecipesPage from '../RecipesPage'
import RecipeFull from '../RecipeFull'
import RecipeAddPage from '../RecipeAdd'

import { Container } from 'semantic-ui-react'

import * as ROUTES from '../../constants/routes'
import { withAuthentication } from '../Session'

const App = () => (
  <Router>
    <Container text>
      <Navigation />
      <Route exact path={'/'} component={HomePage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.RECIPE_ADD} component={RecipeAddPage} />
      <Route exact path={ROUTES.RECIPES} component={RecipesPage} />
      <Route path={ROUTES.CATEGORY} component={RecipesPage} />
      <Route path={ROUTES.RECIPE} component={RecipeFull} />
    </Container>
  </Router>
)
export default withAuthentication(App)

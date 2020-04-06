import React from 'react'
// import { useForm } from 'react-hook-form'
// import { Link, withRouter } from 'react-router-dom'
// import { compose } from 'recompose'
// import { withFirebase } from '../Firebase'
// import * as ROUTES from '../../constants/routes'
// import * as ROLES from '../../constants/roles'
import RecipeAddForm from '../RecipeAddForm'
import { Grid, Header, Image } from 'semantic-ui-react'

export const RecipeAddPage = props => (
  <Grid textAlign="center" style={{ height: '100vh' }}>
    <Grid.Column>
      <Header as="h2" color="orange" textAlign="center">
        <Image src="/logo512.png" /> Add Recipe
      </Header>
      <RecipeAddForm props={props} />
    </Grid.Column>
  </Grid>
)
export default RecipeAddPage

import React from 'react'
import * as ROUTES from '../../constants/routes'

import { withAuthorization } from '../Session'

const HomePage = props => {
  return (
    <div>
      <h1>Home Page</h1>
      <a href={ROUTES.RECIPE_ADD}>Add Recipe</a>
    </div>
  )
}

const condition = authUser => !!authUser
export default withAuthorization(condition)(HomePage)

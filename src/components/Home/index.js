import React from 'react'

import { withAuthorization } from '../Session'
import RecipeAddPage from '../RecipeAdd'

const HomePage = props => (
  <div>
    <h1>Home Page</h1>
    <RecipeAddPage props={props} />
  </div>
)

const condition = authUser => !!authUser
export default withAuthorization(condition)(HomePage)

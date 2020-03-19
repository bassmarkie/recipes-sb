import React from 'react'

import { withAuthorization } from '../Session'
// import { withFirebase } from '../Firebase'
import { Recipes } from '../Recipe/RecipeBase'

const HomePage = () => (
  <div>
    <h1>Home Page</h1>

    <Recipes />
  </div>
)

const condition = authUser => !!authUser
export default withAuthorization(condition)(HomePage)

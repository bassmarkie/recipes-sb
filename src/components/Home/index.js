import React from 'react'

import { withAuthorization } from '../Session'
// import { withFirebase } from '../Firebase'

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
  </div>
)

const condition = authUser => !!authUser
export default withAuthorization(condition)(HomePage)

import React from 'react'
import { Link } from 'react-router-dom'
import { withFirebase } from '../Firebase'

import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'
import { AuthUserContext } from '../Session'
import { Menu, Image, Header, Button } from 'semantic-ui-react'

export const Fav = props => {
  if (props.fav && props.fav.hasOwnProperty(props.authUser)) {
    return <Button icon="heart" color="red" size="tiny" floated="right" />
  } else {
    return <Button icon="heart" size="tiny" floated="right" />
  }
}

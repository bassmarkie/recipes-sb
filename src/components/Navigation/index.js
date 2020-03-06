import React from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes'
import { AuthUserContext } from '../Session'
import { Menu, Image } from 'semantic-ui-react'

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
)

class NavigationAuth extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Item>
          <Image src="/logo16.png" />
        </Menu.Item>
        <Menu.Item header>Recipes-SB</Menu.Item>
        <Menu.Item
          name="Home"
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
          as={Link}
          to={ROUTES.HOME}
        />
        <Menu.Item
          name="Account"
          active={activeItem === 'Account'}
          onClick={this.handleItemClick}
          as={Link}
          to={ROUTES.ACCOUNT}
        />
        <Menu.Item
          name="Admin"
          active={activeItem === 'Admin'}
          onClick={this.handleItemClick}
          as={Link}
          to={ROUTES.ADMIN}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <SignOutButton />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

class NavigationNonAuth extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Menu secondary>
        <Menu.Item>
          <Image src="/logo16.png" />
        </Menu.Item>
        <Menu.Item header>Recipes-SB</Menu.Item>
        <Menu.Item
          name="Sign In"
          active={activeItem === 'Sign In'}
          onClick={this.handleItemClick}
          as={Link}
          to={ROUTES.SIGN_IN}
        />
      </Menu>
    )
  }
}

export default Navigation

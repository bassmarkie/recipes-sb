import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { RecipeCard } from './RecipeCard'
import { RecipeFull } from './RecipeFull'
import { withFirebase } from '../Firebase'
import { Card } from 'semantic-ui-react'

class RecipesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      recipes: []
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.props.firebase.recipes().on('value', snapshot => {
      const recipesObject = snapshot.val()

      if (recipesObject) {
        const recipesList = Object.keys(recipesObject).map(key => ({
          ...recipesObject[key],
          rid: key
        }))
        this.setState({
          recipes: recipesList,
          loading: false
        })
      } else {
        this.setState({ recipes: null, loading: false })
      }
    })
  }

  componentWillUnmount() {
    this.props.firebase.recipes().off()
  }

  render() {
    const { recipes, loading } = this.state

    return (
      <div>
        {loading && <div>Loading ...</div>}
        {recipes ? (
          <Card.Group>
            {recipes.map(recipe => (
              <RecipeFull key={recipe.rid} recipe={recipe} />
            ))}
          </Card.Group>
        ) : (
          <div>There are no recipes ...</div>
        )}
      </div>
    )
  }
}

export default compose(withRouter, withFirebase)(RecipesPage)

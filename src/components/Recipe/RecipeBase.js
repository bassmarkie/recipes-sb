import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
// import { withAuthorization } from '../Session'
import { withFirebase } from '../Firebase'
import { Card } from 'semantic-ui-react'

class RecipesBase extends Component {
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
              <RecipeCard key={recipe.rid} recipe={recipe} />
            ))}
          </Card.Group>
        ) : (
          <div>There are no recipes ...</div>
        )}
      </div>
    )
  }
}

export const RecipeCard = ({ recipe }) => (
  <Card>
    <Card.Content>
      <Card.Header content={recipe.name} />

      <RecipeItem key={recipe.rid} recipe={recipe} />
    </Card.Content>
  </Card>
)

const RecipeItem = ({ recipe }) => (
  <li>
    <strong>{recipe.rid}</strong> {recipe.instructions}
  </li>
)

const Recipes = compose(withRouter, withFirebase)(RecipesBase)
export { Recipes }

import React, { Component } from 'react'

import { withAuthorization } from '../Session'
import { withFirebase } from '../Firebase'

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>

    <Recipes />
  </div>
)

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
          <RecipeList recipes={recipes} />
        ) : (
          <div>There are no recipes ...</div>
        )}
      </div>
    )
  }
}

const RecipeList = ({ recipes }) => (
  <ul>
    {recipes.map(recipe => (
      <RecipeItem key={recipe.rid} recipe={recipe} />
    ))}
  </ul>
)
const RecipeItem = ({ recipe }) => (
  <li>
    <strong>{recipe.rid}</strong> {recipe.instructions}
  </li>
)
const Recipes = withFirebase(RecipesBase)

const condition = authUser => !!authUser
export default withAuthorization(condition)(HomePage)

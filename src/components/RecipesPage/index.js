import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../Firebase'
import { RecipeCard } from '../RecipeCard'
import { Card, Dimmer, Loader } from 'semantic-ui-react'

const RecipesPage = props => {
  const [loading, setLoading] = useState(true)
  const [recipes, setRecipes] = useState(null)

  useEffect(() => {
    props.firebase.recipes().on('value', snapshot => {
      const recipesObject = snapshot.val()

      if (recipesObject) {
        const recipesList = Object.keys(recipesObject).map(key => ({
          ...recipesObject[key],
          rid: key,
        }))
        setLoading(false)
        setRecipes(recipesList)
      }
    })
    if (recipes) props.firebase.recipes().off()
  })
  console.log(recipes)

  return (
    <div>
      {loading && (
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      )}
      {recipes ? (
        <Card.Group>
          {recipes.map(recipe => (
            <RecipeCard recipe={recipe} key={recipe.rid} />
          ))}
        </Card.Group>
      ) : (
        <div>There are no recipes ...</div>
      )}
    </div>
  )
}

export default compose(withRouter, withFirebase)(RecipesPage)

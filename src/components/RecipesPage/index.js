import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../Firebase'
import { RecipeCard } from '../RecipeCard'
import { Header, Card, Dimmer, Loader } from 'semantic-ui-react'

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

        if (props.match.params.category) {
          const filteredList = recipesList.filter(
            recipe => recipe.category === props.match.params.category
          )
          setLoading(false)
          setRecipes(filteredList)
        } else {
          setLoading(false)
          setRecipes(recipesList)
        }
      }
    })
    if (recipes) props.firebase.recipes().off()
  })

  return (
    <div>
      {loading && (
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      )}
      {props.match.params.category ? (
        <Header content={props.match.params.category} />
      ) : (
        <div />
      )}
      {recipes ? (
        <Card.Group>
          {recipes.map(recipe => (
            <RecipeCard
              recipe={recipe}
              fire
              key={recipe.rid}
              firebase={props.firebase}
            />
          ))}
        </Card.Group>
      ) : (
        <div>There are no recipes ...</div>
      )}
    </div>
  )
}

export default compose(withRouter, withFirebase)(RecipesPage)

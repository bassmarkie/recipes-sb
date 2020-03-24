import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../Firebase'
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
          rid: key
        }))
        setLoading(false)
        setRecipes(recipesList)
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
      {recipes ? (
        <Card.Group>
          {recipes.map(recipe => (
            <Card key={recipe.rid} href={`recipe/${recipe.rid}`}>
              <Card.Content>
                <Card.Header content={recipe.name} />
                <Card.Meta content={recipe.category} />
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      ) : (
        <div>There are no recipes ...</div>
      )}
    </div>
  )
}

export default compose(withRouter, withFirebase)(RecipesPage)

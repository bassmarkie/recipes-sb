import { Card, Image } from 'semantic-ui-react'
import React from 'react'
import { Status } from '../Status'

export const RecipeCard = ({ recipe, firebase }) => {
  console.log('card authUser', firebase.auth.W)
  return (
    <Card>
      <Image src={recipe.image} />
      <Card.Content>
        <Card.Header href={`/recipe/${recipe.rid}`} content={recipe.name} />
        <Card.Meta
          content={recipe.category}
          href={`/recipes/filter/${recipe.category}`}
        />
      </Card.Content>
      <Status
        fav={recipe.fav}
        todo={recipe.todo}
        firebase={firebase}
        rid={recipe.rid}
      />
    </Card>
  )
}

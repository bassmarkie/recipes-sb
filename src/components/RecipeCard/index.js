import { Card, Image } from 'semantic-ui-react'
import React from 'react'
import { Fav } from '../Buttons/fav.js'

export const RecipeCard = ({ recipe, authUser }) => {
  console.log('card authUser', authUser)
  return (
    <Card href={`recipe/${recipe.rid}`}>
      <Image src={recipe.image} />
      <Card.Content>
        <Card.Header content={recipe.name} />
        <Card.Meta content={recipe.category} />
        <Fav fav={recipe.fav} authUser={authUser} />
      </Card.Content>
    </Card>
  )
}

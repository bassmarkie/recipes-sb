import { Card } from 'semantic-ui-react'
import React from 'react'

export const RecipeCard = ({ recipe }) => (
  <Card href={`recipe/${recipe.rid}`}>
    <Card.Content>
      <Card.Header content={recipe.name} />
      <Card.Meta content={recipe.category} />
    </Card.Content>
  </Card>
)

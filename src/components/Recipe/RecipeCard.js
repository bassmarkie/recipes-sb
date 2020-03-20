import React from 'react'
import { Card } from 'semantic-ui-react'

export const RecipeCard = ({ recipe }) => (
  <Card>
    <Card.Content>
      <Card.Header content={recipe.name} />
      <Card.Meta content={recipe.category} />
    </Card.Content>
  </Card>
)

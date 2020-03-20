import React from 'react'
import { Card } from 'semantic-ui-react'

export const RecipeFull = ({ recipe }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header content={recipe.name} />
        <Card.Meta content={recipe.category} />
      </Card.Content>
      <Card.Content extra>
        <Card.Header>Ingredients</Card.Header>
        {Object.keys(recipe.ingredients).map((x, i) => (
          <Card.Description key={x} content={`${recipe.ingredients[x]} ${x}`} />
        ))}
      </Card.Content>
      <Card.Content extra>
        <Card.Header>Instructions</Card.Header>
        {recipe.instructions.map((x, i) => (
          <Card.Description key={x} content={`${i + 1}. ${x}`} />
        ))}
      </Card.Content>
    </Card>
  )
}

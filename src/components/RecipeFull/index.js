import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import {
  Grid,
  Header,
  Divider,
  Segment,
  Label,
  Container,
  Dimmer,
  Loader
} from 'semantic-ui-react'

const RecipeFull = props => {
  const rid = props.match.params.rid
  const [loading, setLoading] = useState(true)
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    props.firebase.recipe(rid).on('value', snapshot => {
      const recipe = snapshot.val()
      if (recipe) {
        setLoading(false)
        setRecipe(recipe)
      }
    })
    if (recipe) props.firebase.recipe(rid).off()
  })

  const spices = []
  const main = []
  const misc = []
  if (recipe) {
    for (let key in recipe.ingredients) {
      if (recipe.ingredients[key].type === 'spices')
        spices.push(`${recipe.ingredients[key].amount} ${key}`)
    }

    for (let key in recipe.ingredients) {
      if (recipe.ingredients[key].type === 'main')
        main.push(`${recipe.ingredients[key].amount} ${key}`)
    }

    for (let key in recipe.ingredients) {
      if (recipe.ingredients[key].type === 'misc')
        misc.push(`${recipe.ingredients[key].amount} ${key}`)
    }
  }

  return (
    <div>
      {loading && (
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      )}
      {recipe ? (
        <Segment.Group>
          <Segment>
            <Label attached="top left" content={recipe.category} />
            <Header as="h1" content={recipe.name} />
          </Segment>
          <Divider horizontal>Ingredients</Divider>
          <Grid columns="equal" padded>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Label attached="top left" content="spices" />
                  {spices.map(x => (
                    <Container key={x} content={x} />
                  ))}
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Label attached="top left" content="main" />
                  {main.map(x => (
                    <Container key={x} content={x} />
                  ))}
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Label attached="top left" content="misc" />
                  {misc.map(x => (
                    <Container key={x} content={x} />
                  ))}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider horizontal>Instructions</Divider>
          <Grid columns={1} padded>
            <Grid.Row>
              <Grid.Column>
                {recipe.instructions.map((x, i) => (
                  <Container key={x} content={`${i + 1}. ${x}`} />
                ))}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment.Group>
      ) : (
        <div>There are no recipes ...</div>
      )}
    </div>
  )
}

export default compose(withRouter, withFirebase)(RecipeFull)

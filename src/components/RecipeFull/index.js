import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import { Status } from '../Status'
import {
  Grid,
  Header,
  Divider,
  Segment,
  Label,
  Container,
  Dimmer,
  Loader,
  Image,
  List,
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

  return (
    <div>
      {loading && (
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      )}
      {recipe ? (
        <Segment.Group>
          <Status
            fav={recipe.fav}
            todo={recipe.todo}
            firebase={props.firebase}
            rid={rid}
          />
          <Segment>
            <Label
              ribbon
              color="orange"
              size="large"
              content={recipe.category}
            ></Label>
            <span>
              <Header textAlign="center" as="h1" content={recipe.name} />
            </span>
            <Image src={recipe.image} fluid />
          </Segment>
          <Divider horizontal>Ingredients</Divider>
          <Grid stackable padded columns={3}>
            {recipe.ingredients && (
              <Grid.Row>
                <Grid.Column>
                  <Segment basic textAlign="center">
                    <Label
                      attached="top"
                      size="large"
                      content="m a i n"
                      color="yellow"
                    />
                    {recipe.ingredients.main &&
                      Object.keys(recipe.ingredients.main).map(x => (
                        <List key={x}>
                          <List.Item>
                            <List.Header>{x}</List.Header>
                            {recipe.ingredients.main[x]}
                          </List.Item>
                        </List>
                      ))}
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment basic textAlign="center">
                    <Label
                      attached="top"
                      size="large"
                      content="s p i c e s"
                      color="olive"
                    />
                    {recipe.ingredients.spices &&
                      Object.keys(recipe.ingredients.spices).map(x => (
                        <List key={x}>
                          <List.Item>
                            <List.Header>{x}</List.Header>
                            {recipe.ingredients.spices[x]}
                          </List.Item>
                        </List>
                      ))}
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment basic textAlign="center">
                    <Label
                      attached="top"
                      size="large"
                      content="m i s c"
                      color="grey"
                    />
                    {recipe.ingredients.misc &&
                      Object.keys(recipe.ingredients.misc).map(x => (
                        <List key={x}>
                          <List.Item>
                            <List.Header>{x}</List.Header>
                            {recipe.ingredients.misc[x]}
                          </List.Item>
                        </List>
                      ))}
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
          <Divider horizontal>Instructions</Divider>
          <Grid columns={1} padded>
            <Grid.Row>
              <Grid.Column>
                {recipe.instructions &&
                  Object.keys(recipe.instructions).map((x, i) => (
                    <Container
                      key={x}
                      content={`${x} - ${recipe.instructions[x]}`}
                    />
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

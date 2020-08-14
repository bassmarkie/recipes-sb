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
        console.log(recipe.ingredients.type)
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
            <Status
              fav={recipe.fav}
              todo={recipe.todo}
              firebase={props.firebase}
              rid={rid}
            />
          </Segment>
          <Divider horizontal>Ingredients</Divider>
          <Grid stackable padded columns={3}>
            {
              <Grid.Row>
                <Grid.Column>
                  <Segment basic textAlign="center">
                    <Label
                      attached="top"
                      size="large"
                      content="m a i n"
                      color="yellow"
                    />
                    {Object.keys(recipe.ingredients.type.main).map(x => (
                      <List key={x}>
                        <List.Item>
                          <List.Header>{x}</List.Header>
                          {recipe.ingredients.type.main[x]}
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
                    {Object.keys(recipe.ingredients.type.spices).map(x => (
                      <List key={x}>
                        <List.Item>
                          <List.Header>{x}</List.Header>
                          {recipe.ingredients.type.spices[x]}
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
                    {Object.keys(recipe.ingredients.type.misc).map(x => (
                      <List key={x}>
                        <List.Item>
                          <List.Header>{x}</List.Header>
                          {recipe.ingredients.type.misc[x]}
                        </List.Item>
                      </List>
                    ))}
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            }
          </Grid>
          <Divider horizontal>Instructions</Divider>
          <Grid columns={1} padded>
            <Grid.Row>
              <Grid.Column>
                {Object.keys(recipe.instructions).map((x, i) => (
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

import React, { useEffect, useState } from 'react'
import { withAuthorization } from '../Session'
// import { useForm } from 'react-hook-form'
// import { Link, withRouter } from 'react-router-dom'
// import { compose } from 'recompose'
// import { withFirebase } from '../Firebase'
// import * as ROUTES from '../../constants/routes'
// import * as ROLES from '../../constants/roles'
// import RecipeAddForm from '../RecipeAddForm/index2.js'
import {
  Button,
  Form,
  Segment,
  Divider,
  Label,
  Grid,
  Header,
  Image,
} from 'semantic-ui-react'

export const RecipeAddPage = props => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [main, setMain] = useState({ '': '' })
  const [spices, setSpices] = useState({ '': '' })
  const [misc, setMisc] = useState({ '': '' })
  const [instructions, setInstructions] = useState({ 1: '' })
  const [current, setCurrent] = useState('')

  let instCount = [...Object.keys(instructions)]
  let recipe = {
    name,
    category,
    ingredients: { main, spices, misc },
    instructions,
  }

  const onSubmit = event => {
    const removeNull = data => {
      var str_data = JSON.stringify(data, function (k, obj) {
        for (var propName in obj) {
          if (obj[propName] === '' || obj[propName] === undefined) {
            delete obj[propName]
          }
        }
        return obj
      })
      return JSON.parse(str_data)
    }

    const cleanRecipe = removeNull(recipe)

    let newRecipe = props.firebase.recipeAddRef()

    let rid = newRecipe.key

    newRecipe.set(cleanRecipe).then(() => {
      console.log(cleanRecipe)
      props.history.push(`/recipe/${rid}`)
    })
  }

  const onInstChange = event => {
    let num = parseInt(event.target.name)
    let newNum = num + 1

    if (!instructions.hasOwnProperty(newNum)) {
      setInstructions({
        ...instructions,
        [num]: event.target.value,
        [newNum]: '',
      })
    } else {
      setInstructions({
        ...instructions,
        [num]: event.target.value,
      })
    }
  }

  useEffect(() => {}, [recipe])

  return (
    <Grid textAlign="center" style={{ height: '100vh' }}>
      <Grid.Column>
        <Header as="h2" color="orange" textAlign="center">
          <Image src="/logo512.png" /> Add Recipe
        </Header>
        <Form onSubmit={onSubmit}>
          <Segment basic>
            <Divider horizontal>Name of Recipe</Divider>
            <Form.Input
              fluid
              icon="pencil"
              iconPosition="left"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name of Recipe"
            />
            <Divider horizontal>Recipe Type</Divider>
            <Form.Input
              fluid
              icon="food"
              iconPosition="left"
              name="category"
              onChange={e => setCategory(e.target.value)}
              type="text"
              placeholder="Choose a Recipe Type"
            />
            <Divider horizontal>Ingredients</Divider>

            <Grid stackable padded columns={1}>
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
                      {Object.values(main).map((x, i) => (
                        <Segment vertical key={x}>
                          <Label
                            attached="top"
                            size="small"
                            content={`Ingredient ${i + 1}`}
                          />
                          <Form.Group widths="equal">
                            <Form.Input
                              name="main"
                              inline
                              label="name"
                              onChange={e => setCurrent(e.target.value)}
                              type="text"
                              placeholder="name"
                            />

                            <Form.Input
                              id="main"
                              inline
                              label="amount"
                              name={main[current]}
                              placeholder="amount"
                              onChange={e =>
                                setMain({
                                  ...main,
                                  [current]: e.target.value,
                                })
                              }
                            />
                          </Form.Group>
                        </Segment>
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
                      {Object.values(spices).map((x, i) => (
                        <Segment vertical key={x}>
                          <Label
                            attached="top"
                            size="small"
                            content={`Ingredient ${i + 1}`}
                          />
                          <Form.Group widths="equal">
                            <Form.Input
                              name="spices"
                              inline
                              label="name"
                              onChange={e => setCurrent(e.target.value)}
                              type="text"
                              placeholder="name"
                            />

                            <Form.Input
                              id="spices"
                              inline
                              label="amount"
                              name={spices[current]}
                              placeholder="amount"
                              onChange={e =>
                                setSpices({
                                  ...spices,
                                  [current]: e.target.value,
                                })
                              }
                            />
                          </Form.Group>
                        </Segment>
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
                      {Object.values(misc).map((x, i) => (
                        <Segment vertical key={x}>
                          <Label
                            attached="top"
                            size="small"
                            content={`Ingredient ${i + 1}`}
                          />
                          <Form.Group widths="equal">
                            <Form.Input
                              name="misc"
                              inline
                              label="name"
                              onChange={e => setCurrent(e.target.value)}
                              type="text"
                              placeholder="name"
                            />

                            <Form.Input
                              inline
                              label="amount"
                              name={misc[current]}
                              placeholder="amount"
                              onChange={e =>
                                setMisc({
                                  ...misc,
                                  [current]: e.target.value,
                                })
                              }
                            />
                          </Form.Group>
                        </Segment>
                      ))}
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              }
            </Grid>

            <Divider horizontal>Instructions</Divider>
            {instCount.map(x => (
              <Form.Input
                key={x}
                fluid
                icon="tasks"
                iconPosition="left"
                name={x}
                onChange={onInstChange}
                type="text"
                placeholder={x}
              />
            ))}
            <Button
              type="submit"
              color="orange"
              fluid
              size="large"
              // disabled={isInvalid}
            >
              Add Your Recipe
            </Button>
          </Segment>
          {/* {error && <p>{error.message}</p>} */}
        </Form>
      </Grid.Column>
    </Grid>
  )
}
const condition = authUser => !!authUser
export default withAuthorization(condition)(RecipeAddPage)

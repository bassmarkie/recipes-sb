import React from 'react'
import { Button, Form, Segment, Divider } from 'semantic-ui-react'

export default class RecipeAddForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '', ingredients: {}, instructions: { 1: '' } }
  }

  function
  onSubmit = event => {
    const removeNull = data => {
      var str_data = JSON.stringify(data, function(k, obj) {
        for (var propName in obj) {
          if (obj[propName] === '' || obj[propName] === undefined) {
            delete obj[propName]
          }
        }
        return obj
      })
      return JSON.parse(str_data)
    }

    const recipe = this.state
    const cleanRecipe = removeNull(recipe)

    this.props.props.props.firebase.recipeAddRef(cleanRecipe)
    console.log('recipe', cleanRecipe)
  }

  onNameChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  onIngChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: { [event.target.value]: { amount: 2, type: 'main' } }
    })
  }

  onInstChange = event => {
    let num = parseInt(event.target.name)
    let newNum = num + 1

    if (!this.state.instructions.hasOwnProperty(newNum)) {
      this.setState({
        instructions: {
          ...this.state.instructions,
          [num]: event.target.value,
          [newNum]: ''
        }
      })
    } else {
      this.setState({
        instructions: {
          ...this.state.instructions,
          [num]: event.target.value
        }
      })
    }
  }
  onIngTypeChange = event => {
    console.log('type', event.target)
  }

  render() {
    let instCount = [...Object.keys(this.state.instructions)]
    const options = [
      { key: {}, text: 'spices', value: 'spices' },
      { key: 'main', text: 'main', value: 'main' },
      { key: 'misc', text: 'misc', value: 'misc' }
    ]
    // const currentIngredient
    return (
      <Form size="large" onSubmit={this.onSubmit}>
        <Segment basic>
          <Divider horizontal>Name of Recipe</Divider>
          <Form.Input
            fluid
            icon="food"
            iconPosition="left"
            name="name"
            onChange={this.onNameChange}
            type="text"
            placeholder="Name of Recipe"
          />
          <Divider horizontal>Ingredients</Divider>
          <Segment.Group>
            <Form.Input
              action
              fluid
              // icon="food"
              iconPosition="left"
              name="ingredients"
              onChange={this.onIngChange}
              type="text"
              placeholder="Name of Ingredient"
            />
          </Segment.Group>
          {/* <input /> */}
          {/* <Form.Select
                compact
                options={options}
                defaultValue="type"
                onChange={this.onIngTypeChange}
              /> */}

          {instCount.map(x => (
            <Form.Input
              key={x}
              fluid
              icon="food"
              iconPosition="left"
              name={x}
              onChange={this.onInstChange}
              type="text"
              placeholder="Instruction"
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
    )
  }
}

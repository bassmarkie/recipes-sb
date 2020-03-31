import React from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

export default class RecipeAddForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '', ingredients: {}, instructions: { 1: '' } }
  }

  onSubmit = event => {
    this.props.props.props.firebase.recipeAddRef(this.state)
    console.log('recipe', this.state)
  }

  onNameChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  onIngChange = event => {
    this.setState({
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

  render() {
    let instCount = [...Object.keys(this.state.instructions)]
    return (
      <Form size="large" onSubmit={this.onSubmit}>
        <Segment basic>
          <Form.Input
            fluid
            icon="food"
            iconPosition="left"
            name="name"
            onChange={this.onNameChange}
            type="text"
            placeholder="Name of Recipe"
          />
          <Form.Input
            fluid
            icon="food"
            iconPosition="left"
            name="ingredients"
            onChange={this.onIngChange}
            type="text"
            placeholder="Name of Ingredient"
          />
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

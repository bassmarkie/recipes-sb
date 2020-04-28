import React from 'react'
import { Button, Form, Segment, Divider, Label } from 'semantic-ui-react'

export default class RecipeAddForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      ingredients: false,
      instructions: { 1: '' },
      category: '',
    }
  }

  onSubmit = event => {
    const removeNull = data => {
      var str_data = JSON.stringify(data, function (k, obj) {
        for (var propName in obj) {
          if (obj.currentIngredient) {
            delete obj.currentIngredient
          }
          if (obj.ingCount) {
            delete obj.ingCount
          }
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

    let newRecipe = this.props.props.props.firebase.recipeAddRef()

    let rid = newRecipe.key

    newRecipe.set(cleanRecipe).then(() => {
      this.props.props.props.history.push(`/recipe/${rid}`)
    })
  }

  onNameChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onInstChange = event => {
    let num = parseInt(event.target.name)
    let newNum = num + 1

    if (!this.state.instructions.hasOwnProperty(newNum)) {
      this.setState({
        instructions: {
          ...this.state.instructions,
          [num]: event.target.value,
          [newNum]: '',
        },
      })
    } else {
      this.setState({
        instructions: {
          ...this.state.instructions,
          [num]: event.target.value,
        },
      })
    }
  }

  onIngChange = event => {
    this.setState({
      currentIngredient: event.target.value,
    })
  }

  onIngAmountChange = event => {
    this.setState({
      ingredients: {
        ...this.state.ingredients,
        [this.state.currentIngredient]: {
          amount: event.target.value,
          type: 'spices',
        },
      },
    })
  }

  componentDidMount() {
    this.setState({ ...this.state, ingCount: false })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.ingredients !== this.state.ingredients) {
      let count = [...Object.keys(this.state.ingredients)]
      this.setState({ ingCount: count })
    }
  }

  render() {
    let instCount = [...Object.keys(this.state.instructions)]

    let currentIngredient = this.state.currentIngredient

    let ingCount = []

    if (this.state.ingCount) {
      ingCount = this.state.ingCount
    }

    return (
      <Form onSubmit={this.onSubmit}>
        <Segment basic>
          <Divider horizontal>Name of Recipe</Divider>
          <Form.Input
            fluid
            icon="pencil"
            iconPosition="left"
            name="name"
            onChange={this.onNameChange}
            type="text"
            placeholder="Name of Recipe"
          />
          <Divider horizontal>Recipe Type</Divider>
          <Form.Input
            fluid
            icon="food"
            iconPosition="left"
            name="category"
            onChange={this.onNameChange}
            type="text"
            placeholder="Choose a Recipe Type"
          />
          <Divider horizontal>Ingredients</Divider>

          <Segment basic>
            <Label attached="top" content="spices" />

            <Segment basic key="1">
              <Form.Input
                fluid
                icon="shopping basket"
                iconPosition="left"
                name="spices"
                onChange={this.onIngChange}
                type="text"
                placeholder="Name of Ingredient"
              />
              {currentIngredient && (
                <Form.Input
                  inline
                  label="Amount"
                  name={currentIngredient}
                  placeholder="amount"
                  onChange={this.onIngAmountChange}
                />
              )}
            </Segment>

            {ingCount.map(x => (
              <Segment basic key={x}>
                <Form.Input
                  fluid
                  icon="shopping basket"
                  iconPosition="left"
                  name="spices"
                  onChange={this.onIngChange}
                  type="text"
                  placeholder="Name of Ingredient"
                />
                {currentIngredient && (
                  <Form.Input
                    inline
                    label="Amount"
                    name={currentIngredient}
                    placeholder="amount"
                    onChange={this.onIngAmountChange}
                  />
                )}
              </Segment>
            ))}
          </Segment>

          <Divider horizontal>Instructions</Divider>
          {instCount.map(x => (
            <Form.Input
              key={x}
              fluid
              icon="tasks"
              iconPosition="left"
              name={x}
              onChange={this.onInstChange}
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
    )
  }
}

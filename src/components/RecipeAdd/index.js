import React, { useState, useEffect, setState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Checkbox,
  Message
} from 'semantic-ui-react'

export const RecipeAddPage = props => (
  <Grid textAlign="center" style={{ height: '100vh' }}>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="orange" textAlign="center">
        <Image src="/logo512.png" /> Add Recipe
      </Header>
      <RecipeAddForm props={props} />
    </Grid.Column>
  </Grid>
)

class RecipeAddForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '', ingredients: {}, instructions: {} }
  }

  onSubmit = event => {
    this.props.props.props.firebase.recipeAddRef(this.state)
    console.log('recipe', this.state)
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  onIngChange = event => {
    this.setState({
      [event.target.name]: { [event.target.value]: { amount: 2, type: 'main' } }
    })
  }
  onInstChange = event => {
    const num = Object.keys(this.state.instructions).length

    this.setState({
      [event.target.name]: {
        [Object.keys(this.state.instructions).length]: event.target.value
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      Object.keys(prevState.instructions).length !==
      Object.keys(this.state.instructions).length
    )
      console.log('rerender', Object.keys(this.state.instructions).length)
  }

  render() {
    return (
      <Form size="large" onSubmit={this.onSubmit}>
        <Segment basic>
          <Form.Input
            fluid
            icon="food"
            iconPosition="left"
            name="name"
            onChange={this.onChange}
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
          <Form.Input
            fluid
            icon="food"
            iconPosition="left"
            name="instructions"
            // key={Object.keys(this.state.instructions).length}
            onChange={this.onInstChange}
            type="text"
            placeholder="Instruction"
          />
          <Form.Input
            fluid
            icon="food"
            iconPosition="left"
            name="instructions"
            // key={Object.keys(this.state.instructions).length}
            onChange={this.onInstChange}
            type="text"
            placeholder="Instruction"
          />

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

// const RecipeAddForm2 = props => {
//   const onSubmit = data => {
//     console.log('recipe', data)
//     return props.props.props.firebase.recipeAddRef(data)
//   }
//   const { register, handleSubmit, setValue, setError } = useForm({
//     mode: 'onSubmit',
//     defaultValues: {}
//   })

//   useEffect(() => {
//     register({ name: 'name' }, { required: true })
//     register({ ingredients: {} })
//     register({ instructions: [] })
//   }, [])

//   return (
//     <Form size="large" onSubmit={handleSubmit(onSubmit)}>
//       <Segment basic>
//         <Form.Input
//           fluid
//           icon="food"
//           iconPosition="left"
//           name="name"
//           onChange={e => setValue('name', e.target.value)}
//           type="text"
//           placeholder="Name of Recipe"
//         />

//         <Form.Input
//           fluid
//           icon="food"
//           iconPosition="left"
//           name="ingredients"
//           onChange={e => setValue('ingredients', e.target.value)}
//           type="text"
//           placeholder="Name of Ingredient"
//         />
//         <Button
//           type="submit"
//           color="orange"
//           fluid
//           size="large"
//           // disabled={isInvalid}
//         >
//           Add Your Recipe
//         </Button>
//       </Segment>
//       {/* {error && <p>{error.message}</p>} */}
//     </Form>
//   )
// }

export default RecipeAddPage

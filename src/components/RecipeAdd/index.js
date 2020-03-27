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

const RecipeAddForm = props => {
  const onSubmit = data => {
    console.log('recipe', data)
    return props.props.props.firebase.recipeAddRef(data)
  }
  const { register, handleSubmit, setValue, setError } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      ingredients: {},
      instructions: []
    }
  })

  useEffect(() => {
    register({ name: 'name' }, { required: true })
    register({ ingredients: {} })
    register({ instructions: [] })
  }, [])

  return (
    <Form size="large" onSubmit={handleSubmit(onSubmit)}>
      <Segment>
        <Form.Input
          fluid
          icon="user outline"
          iconPosition="left"
          name="name"
          onChange={e => setValue('name', e.target.value)}
          type="text"
          placeholder="Name"
        />

        <Button
          type="submit"
          color="orange"
          fluid
          size="large"
          // disabled={isInvalid}
        >
          Sign In
        </Button>
      </Segment>
      {/* {error && <p>{error.message}</p>} */}
    </Form>
  )
}

export default RecipeAddPage

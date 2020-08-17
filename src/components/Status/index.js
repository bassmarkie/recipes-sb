import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import * as ROUTES from '../../constants/routes'

export const Status = props => {
  const authUser = props.firebase.auth.W
  const [fav, setFav] = useState(
    props.fav && props.fav.hasOwnProperty(authUser)
  )
  const [todo, setTodo] = useState(
    props.todo && props.todo.hasOwnProperty(authUser)
  )

  const handleFavClick = async () => {
    setFav(!fav)
    fav
      ? await props.firebase.recipeFavDelete(props.rid, authUser)
      : await props.firebase.recipeFavAdd(props.rid, authUser, {
          authUser: true,
        })
  }
  const handleTodoClick = async () => {
    setTodo(!todo)
    todo
      ? await props.firebase.recipeTodoDelete(props.rid, authUser)
      : await props.firebase.recipeTodoAdd(props.rid, authUser, {
          authUser: true,
        })
  }

  useEffect(() => {})

  return (
    <div>
      {authUser ? (
        <div>
          <Button.Group compact attached="bottom" fluid>
            <Button
              icon="heart"
              color={fav ? 'red' : 'grey'}
              onClick={handleFavClick}
            />
            <Button
              icon="pin"
              color={todo ? 'yellow' : 'grey'}
              onClick={handleTodoClick}
            />
          </Button.Group>
        </div>
      ) : (
        <div>
          <Button.Group compact attached="bottom" fluid>
            <Button
              icon="heart"
              color={fav ? 'red' : 'grey'}
              as="a"
              href={ROUTES.SIGN_IN}
            />
            <Button
              icon="pin"
              color={todo ? 'blue' : 'grey'}
              as="a"
              href={ROUTES.SIGN_IN}
            />
          </Button.Group>
        </div>
      )}
    </div>
  )
}

import React, { useState } from 'react'
import { actions, useAppDispatch } from '../redux/store'

const styles: { [key: string]: React.CSSProperties } = {
  addUserButton: {},
}

export const SearchUser = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState("")
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const id = parseInt(value)
        if (isNaN(id) /* allow an empty query to get all users */) {
          dispatch(actions.fetchAllUsers())
        }
        else {
          dispatch(actions.fetchUserByID(id))
        }
      }}
    >
      <input
        autoFocus
        value={value}
        type="text"
        placeholder="Buscar contacto"
        className="addUserButton"
        style={styles.addUserButton}
        onChange={(e) => {
          setValue(e.target.value.replace(/\D/g, ''))
        }}
      />
    </form>
  )
}

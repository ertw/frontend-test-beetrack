import React, { useState } from 'react'
import { fetchUserByID, useAppDispatch, useTypedSelector } from '../utilities/store'

const styles: { [key: string]: React.CSSProperties } = {
  addUserButton: {},
}

export const SearchUser = () => {
  const dispatch = useAppDispatch()
  const { users } = useTypedSelector(state => state.users)
  const [value, setValue] = useState("")
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const id = parseInt(value)
        dispatch(fetchUserByID(id))
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

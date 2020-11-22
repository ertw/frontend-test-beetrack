import React from 'react'
import { addUser, useAppDispatch } from '../utilities/store'

const styles: { [key: string]: React.CSSProperties } = {
  addUserButton: {},
}

export const AddUserButton = () => {
  const dispatch = useAppDispatch()
  return (
    <button
      onClick={() => dispatch(addUser())}
      className="addUserButton"
      style={styles.addUserButton}
    >
      + Nuevo Contacto
    </button>
  )
}

import styled from '@emotion/styled'
import React, { useState } from 'react'
import { actions, useAppDispatch } from '../redux/store'
import searchIcon from '../assets/searchIcon.gif'

const SearchInput = styled.input`
    border: unset;
    margin: 1rem 0;
    background: ${() => `white url(${searchIcon}) left no-repeat`};
    padding: 4px 4px 4px 24px;
    width: calc(100% + -28px);
`

export const SearchUser = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState("")
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (value === "" /* allow an empty query to get all users */) {
          dispatch(actions.searchUsers(value))
        }
        else {
          dispatch(actions.searchUsers(value))
        }
      }}
    >
      <SearchInput
        autoFocus
        value={value}
        type="text"
        placeholder="Buscar contacto"
        className="addUserButton"
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
    </form>
  )
}

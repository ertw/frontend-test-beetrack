import React, { useEffect, useState } from 'react'
import { addUser, useAppDispatch } from '../utilities/store'
import styled from 'styled-components'

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

const ModalTitle = styled.h2`
  color: #676A6C;
  padding: 1rem;
  margin: unset;
`

const ModalBackground = styled.div`
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 5;
  background-color: rgba(0,0,0,0.25);
  align-items: center;
  justify-content: center;
`

const ModalForeground = styled.section`
  background-color: #fff;
  border: 1px solid #dddddd;
`
const Input = styled.input.attrs((props) => ({
  type: "text",
}))`
  padding: 4px;
  border: 1px solid #ddd;
`
const TextArea = styled.textarea`
  padding: 4px;
  border: 1px solid #ddd;
`

const FieldSet = styled.fieldset`
  padding: 0.5rem 1rem;
  display: grid;
  border: unset;
  grid-gap: 0.5rem;
`

const FormLabel = styled.label`
  color: #676A6C;
  font-weight: bold;
  font-size: 12px;
`

const ButtonPrimary = styled.button`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  color: #fff;
  background-color: #FAB43D;
  border: unset;
  border-radius: 2px;
  padding: 4px;
  width: 150px;
`

export const AddUser: React.FC = () => {
  const dispatch = useAppDispatch()
  const [nameValue, setNameValue] = useState("")
  const [photoURLValue, setPhotoURLValue] = useState("")
  const [descriptionValue, setDescriptionValue] = useState("")
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setIsValid([nameValue, photoURLValue, descriptionValue].every(value => Boolean(value)))
  }, [nameValue, photoURLValue, descriptionValue])

  return (
    <ModalBackground>
      <ModalForeground>
        <ModalTitle>
          Agregar nuevo contacto
        </ModalTitle>
        <hr />
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (isValid) {
              dispatch(addUser({
                name: nameValue,
                photo: photoURLValue,
                description: descriptionValue,
              }))
            }
          }}
        >
          <FieldSet>
            <FormLabel>
              Nombre
          </FormLabel>
            <Input autoFocus onChange={(e) => setNameValue(e.target.value)} />
          </FieldSet>
          <FieldSet>
            <FormLabel>
              URL imagen de perfíl
          </FormLabel>
            <Input onChange={(e) => setPhotoURLValue(e.target.value)} />
          </FieldSet>
          <FieldSet>
            <FormLabel>
              Descripción
          </FormLabel>
            <TextArea onChange={(e) => setDescriptionValue(e.target.value)} />
          </FieldSet>
          <FieldSet>
            <ButtonPrimary disabled={!isValid}>
              Guardar
            </ButtonPrimary>
          </FieldSet>
        </form>
      </ModalForeground>
    </ModalBackground>
  )
}
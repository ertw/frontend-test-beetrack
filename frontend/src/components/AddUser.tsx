import { css } from '@emotion/css'
import React, { useEffect, useState } from 'react'
import { actions, useAppDispatch, useTypedSelector } from '../redux/store'
import { FieldSet, FormLabel, Input, TextArea, ButtonPrimary } from './BaseComponents'
import { Modal } from './Modal'

export const AddUserButton = () => {
  const dispatch = useAppDispatch()
  return (
    <ButtonPrimary
      onClick={() => dispatch(actions.toggleAddUserModal())}
      className={css`
      justify-self: end;
      margin: 1rem 0;
      `}
    >
      + Nuevo Contacto
    </ButtonPrimary>
  )
}

export const AddUser: React.FC = () => {
  const dispatch = useAppDispatch()
  const { addUserModal } = useTypedSelector(state => state.modals)
  const [nameValue, setNameValue] = useState("")
  const [photoURLValue, setPhotoURLValue] = useState("")
  const [descriptionValue, setDescriptionValue] = useState("")
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setIsValid([nameValue, photoURLValue, descriptionValue].every(value => Boolean(value)))
  }, [nameValue, photoURLValue, descriptionValue])

  return (
    <Modal title="Agregar nuevo contacto" show={addUserModal} toggle={() => dispatch(actions.toggleAddUserModal())}>
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (isValid) {
            setIsValid(false)
            dispatch(actions.addUser({
              name: nameValue,
              photo: photoURLValue,
              description: descriptionValue,
            })).then(() => {
              dispatch(actions.toggleAddUserModal())
            }).catch((error) => { console.error(error) })
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
    </Modal>
  )
}
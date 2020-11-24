import React, { useEffect, useState } from 'react'
import { actions, useAppDispatch, useTypedSelector } from '../utilities/store'
import styled from '@emotion/styled'
import { FieldSet, FormLabel, Input, TextArea, ButtonPrimary } from './BaseComponents'

const styles: { [key: string]: React.CSSProperties } = {
  addUserButton: {},
}

export const AddUserButton = () => {
  const dispatch = useAppDispatch()
  return (
    <ButtonPrimary
      onClick={() => dispatch(actions.toggleAddUserModal())}
      className="addUserButton"
      style={styles.addUserButton}
    >
      + Nuevo Contacto
    </ButtonPrimary>
  )
}

const ModalTitle = styled.h2`
  color: #676A6C;
  padding: 1rem;
  margin: unset;
`

const ModalBackground = styled.div<{ show?: boolean; }>`
  display: ${props =>
    props.show ? 'flex' : 'none'};
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

interface ModalProps {
  show: boolean;
  toggle: () => void
}

const Modal: React.FC<ModalProps> = ({ show, toggle, children }) => {
  return (
    <ModalBackground show={show} onClick={toggle}>
      <ModalForeground>
        {children}
      </ModalForeground>
    </ModalBackground>
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
    <Modal show={addUserModal} toggle={() => dispatch(actions.toggleAddUserModal())}>
      <ModalTitle>
        Agregar nuevo contacto
        </ModalTitle>
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (isValid) {
            dispatch(actions.addUser({
              name: nameValue,
              photo: photoURLValue,
              description: descriptionValue,
            })).then(() => {
              dispatch(actions.toggleAddUserModal())
            }).then(() => {
              dispatch(actions.fetchAllUsers())
            })
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
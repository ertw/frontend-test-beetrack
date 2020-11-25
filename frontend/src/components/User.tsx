import styled from '@emotion/styled'
import React from 'react'
import { useDispatch } from 'react-redux'
import missingAvatar from '../assets/missingAvatar.gif'
import { actions } from '../redux/usersSlice'

interface Props {
  name: string
  description: string
  photo: string
  id: number
}

const Avatar = styled.img`
    border-radius: 50%;
    height: 50;
    width: 50;
    object-fit: cover;
`

const UserNameContainer = styled.div`
  border-right: 1px solid #dddddd;
  padding: 0.5rem 1rem;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: min-content auto;
  width: 12rem;
  align-items: center;
  background-color: #fff;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  width: 100%;
`

const UserDescriptionContainer = styled.div`
  background-color: #fff;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
`

export const User: React.FC<Props> = ({ name, description, photo, id }) => {
  const [avatarSrc, setAvatarSrc] = React.useState(photo)
  const dispatch = useDispatch()
  return (
    <React.Fragment>
      <UserNameContainer>
        <Avatar
          src={avatarSrc}
          alt={`${name} avatar`}
          onError={() => { setAvatarSrc(missingAvatar) }}
        />
        <p>
          {name}
        </p>
        <button onClick={() => dispatch(actions.deleteUserByID(id))}>Eliminar</button>
      </UserNameContainer>
      <UserDescriptionContainer>
        {description}
      </UserDescriptionContainer>
    </React.Fragment>
  );
}

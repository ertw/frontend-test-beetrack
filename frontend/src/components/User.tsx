import { css } from '@emotion/css'
import styled from '@emotion/styled'
import React from 'react'
import missingAvatar from '../assets/missingAvatar.gif'

interface Props {
  name: string
  description: string
  photo: string
}

const styles: { [key: string]: React.CSSProperties } = {
  avatar: {
    borderRadius: '50%',
    height: 50,
    width: 50,
    objectFit: 'cover',
  },
  user: {
    backgroundColor: '#fff',
  },
  userName: {
  },
}

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

export const User: React.FC<Props> = ({ name, description, photo }) => {
  const [avatarSrc, setAvatarSrc] = React.useState(photo)
  return (
    <React.Fragment>
      <UserNameContainer>
        <img
          className="avatar"
          style={styles.avatar}
          src={avatarSrc}
          alt={`${name} avatar`}
          onError={() => { setAvatarSrc(missingAvatar) }}
        />
        <p>
          {name}
        </p>
      </UserNameContainer>
      <UserDescriptionContainer>
        {description}
      </UserDescriptionContainer>
    </React.Fragment>
  );
}

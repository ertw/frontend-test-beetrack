import React from 'react'

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
    borderRight: '1px solid #dddddd',
    padding: '0.5rem 1rem',
    display: 'grid',
    gridGap: '0.5rem',
    gridTemplateColumns: 'min-content auto',
    width: '12rem',
    alignItems: 'center',
  },
}

export const User: React.FC<Props> = ({ name, description, photo }) => {
  return (
    <tr className="user" style={styles.user}>
      <td className="userName" style={styles.userName}>
        <img className="avatar" style={styles.avatar} src={photo} alt={`${name} avatar`} />
        <p>
          {name}
        </p>
      </td>
      <td className="userDescription">{description}</td>
    </tr>
  );
}

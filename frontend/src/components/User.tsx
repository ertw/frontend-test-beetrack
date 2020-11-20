import React from 'react'

interface Props {
  name: string
  description: string
  photo: string
}

const styles: React.CSSProperties = {
  borderRadius: '50%',
  height: 50,
  width: 50,
  objectFit: 'cover',
}

export const User: React.FC<Props> = ({ name, description, photo }) => {
  return (
    <tr className="user">
      <td className="userName">
        <img style={styles} src={photo} alt={`${name} avatar`} />
        <p>
          {name}
        </p>
      </td>
      <td className="userDescription">{description}</td>
    </tr>
  );
}

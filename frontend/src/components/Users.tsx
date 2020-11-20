import React from 'react'
import { User } from './User';

interface Props {
}

const styles: { [key: string]: React.CSSProperties } = {
  users: {
    borderCollapse: 'collapse',
  },
}

export const Users: React.FC<Props> = () => {
  return (
    <table className="users" style={styles.users}>
      <thead>
        <tr>
          <th scope="col" className="userNameHeader">Nombre</th>
          <th scope="col" className="userDescriptionHeader">Descripción</th>
        </tr>
      </thead>
      <tbody>
        {[
          {
            "id": 1,
            "name": "Francisco",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "photo": "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?h=350&auto=compress&cs=tinysrgb"
          },
        ].map(user => (<User key={user.id} {...user} />))}
      </tbody>
    </table>
  );
}

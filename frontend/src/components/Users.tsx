import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector, fetchUsers } from '../utilities/store';
import { User } from './User';

interface Props {
}

const styles: { [key: string]: React.CSSProperties } = {
  users: {
    minWidth: '100%',
  },
  footer: {
  },
  previousPageContainer: {
    paddingLeft: 'unset',
  },
  nextPageContainer: {
    paddingRight: 'unset',
  },
  nextButton: {
    float: 'right',
  },
}

const PageNavigationButton: React.FC<{ text: string, style?: React.CSSProperties }> = ({ text, style }) => (
  <button style={style} className="previousPage">{text}</button>
)


export const Users: React.FC<Props> = () => {
  const { users, loading } = useTypedSelector(state => state.users)
  const dispatch = useAppDispatch()
  const fetchAllUsers = async () => {
    try {
      const resultAction = await dispatch(fetchUsers())
      const fetchedUsers = unwrapResult(resultAction)
      console.log('success', `Fetched`)
    } catch (err) {
      console.log('error', `Fetch failed: ${err.message}`)
    }
  }
  useEffect(() => {
    fetchAllUsers()
  }, [])
  return (
    <table className="users" style={styles.users}>
      <thead>
        <tr>
          <th scope="col" className="userNameHeader">Nombre</th>
          <th scope="col" className="userDescriptionHeader">Descripción</th>
        </tr>
      </thead>
      <tbody>
        {users?.map(user => (<User key={user.id} {...user} />))}
      </tbody>
      <tfoot className="footer" style={styles.footer}>
        <tr>
          <td className="previousPageContainer" style={styles.previousPageContainer}>
            <PageNavigationButton text="Página Anterior" />
          </td>
          <td className="nextPageContainer" style={styles.nextPageContainer}>
            <PageNavigationButton style={styles.nextButton} text="Siguiente Página" />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

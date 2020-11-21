import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector, fetchUsers } from '../App';
import { User } from './User';

interface Props {
}

const styles: { [key: string]: React.CSSProperties } = {
}

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
    </table>
  );
}

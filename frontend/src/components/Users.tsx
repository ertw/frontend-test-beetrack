import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector, fetchAllUsers } from '../utilities/store';
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

interface PageNavigationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const PageNavigationButton: React.FC<PageNavigationButtonProps> = ({ text, ...props }) => (
  <button {...props} className="previousPage">{text}</button>
)

export const Users: React.FC<Props> = () => {
  const { users, loading } = useTypedSelector(state => state.users)
  const [page, setPage] = React.useState(1)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchAllUsers(page))
  }, [dispatch, page])

  if (loading === 'failed') {
    return (
      <div>
        <p>
          Error loading users
        </p>
        <button onClick={() => dispatch(fetchAllUsers())}>Reload Users</button>
      </div>
    )
  }

  return (
    <table className="users" style={styles.users}>
      <thead>
        <tr>
          <th scope="col" className="userNameHeader">Nombre</th>
          <th scope="col" className="userDescriptionHeader">Descripción</th>
        </tr>
      </thead>
      <tbody>
        {(users?.length > 0 && users.map(user => (<User key={user.id} {...user} />))) || "No more users"}
      </tbody>
      <tfoot className="footer" style={styles.footer}>
        <tr>
          <td className="previousPageContainer" style={styles.previousPageContainer}>
            <PageNavigationButton
              onClick={() => setPage((prev) => prev > 1 ? prev - 1 : prev)}
              disabled={page === 1 || loading !== 'idle'}
              text="Página Anterior"
            />
          </td>
          <td className="nextPageContainer" style={styles.nextPageContainer}>
            <PageNavigationButton
              onClick={() => setPage((prev) => prev + 1)}
              disabled={users?.length < 2 || loading !== 'idle'}
              style={styles.nextButton}
              text="Siguiente Página"
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

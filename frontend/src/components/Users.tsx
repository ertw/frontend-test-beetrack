import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector, actions } from '../redux/store';
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

interface PageNavigationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const PageNavigationButton: React.FC<PageNavigationButtonProps> = ({ children, ...props }) => (
  <button {...props} className="previousPage">{children}</button>
)

export const Users: React.FC<Props> = () => {
  const { users, loading } = useTypedSelector(state => state.users)
  const [page, setPage] = React.useState(1)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(actions.fetchAllUsers(page))
  }, [dispatch, page])

  if (loading === 'failed') {
    return (
      <div>
        <p>
          Error loading users
        </p>
        <button onClick={() => dispatch(actions.fetchAllUsers())}>Reload Users</button>
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
        {(users?.length > 0 && users.map(user => (<User key={user.id} {...user} />))) || "Usuario no encontrado"}
      </tbody>
      <tfoot className="footer" style={styles.footer}>
        <tr>
          <td className="previousPageContainer" style={styles.previousPageContainer}>
            <PageNavigationButton
              onClick={() => setPage((prev) => prev > 1 ? prev - 1 : prev)}
              disabled={page === 1 || loading !== 'idle'}
            >
              Página Anterior
            </PageNavigationButton>
          </td>
          <td className="nextPageContainer" style={styles.nextPageContainer}>
            <PageNavigationButton
              onClick={() => setPage((prev) => prev + 1)}
              disabled={users?.length < 2 || loading !== 'idle'}
              style={styles.nextButton}
            >
              Siguiente Página
            </PageNavigationButton>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

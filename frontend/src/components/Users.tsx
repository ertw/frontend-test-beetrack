import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector, actions } from '../redux/store';
import { User } from './User';
import { css } from '@emotion/css'
import { SearchUser } from './GetUser';
import { AddUserButton } from './AddUser';
import styled from '@emotion/styled';

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

const TableHeader = styled.div`
background-color: #fff;
box-shadow: 0px 2px 2px 0px #ddd;
z-index: 1;
padding: 0.5rem;
`

const ButtonSecondary = styled.button`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background: transparent;
  border: unset;
  padding: 0.5rem;
  font-weight: bold;
  color: #616161;
`

interface PageNavigationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const PageNavigationButton: React.FC<PageNavigationButtonProps> = ({ children, ...props }) => (
  <ButtonSecondary {...props}>
  {children}
  </ButtonSecondary>
)

export const Users: React.FC<Props> = () => {
  const { users, loading } = useTypedSelector(state => state.users)
  const [page, setPage] = React.useState(1)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(actions.fetchAllUsers(page))
  }, [dispatch, page])

  return (
    <section className={css`
    display: grid;
    grid-template-columns: 250px auto;
    `}>
      <SearchUser />
      <AddUserButton />
      <TableHeader>Nombre</TableHeader>
      <TableHeader>Descripción</TableHeader>
      {loading === 'failed' &&
      <div>
        <p>
          Error loading users
        </p>
        <button onClick={() => dispatch(actions.fetchAllUsers())}>Reload Users</button>
      </div>
      }
      {loading === 'idle' && users?.length > 0 ? users.map(user => (<User key={user.id} {...user} />)) : "Usuario no encontrado"}
      <div className="previousPageContainer">
        <PageNavigationButton
          onClick={() => setPage((prev) => prev > 1 ? prev - 1 : prev)}
          disabled={page === 1 || loading !== 'idle'}
        >
          Página Anterior
            </PageNavigationButton>
      </div>
      <div className="nextPageContainer">
        <PageNavigationButton
          onClick={() => setPage((prev) => prev + 1)}
          disabled={users?.length < 2 || loading !== 'idle'}
          style={styles.nextButton}
        >
          Siguiente Página
            </PageNavigationButton>
      </div>
    </section>
  );
}

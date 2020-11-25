import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector, actions } from '../redux/store';
import { User } from './User';
import { css } from '@emotion/css'
import { SearchUser } from './GetUser';
import { AddUserButton } from './AddUser';
import styled from '@emotion/styled';
import nextArrow from '../assets/nextArrow.gif'
import { ButtonSecondary } from './BaseComponents';

interface Props {
}

const UserNotFound = styled.p`
grid-column: span 2;
padding: 0.5rem;
`

const TableHeader = styled.div`
background-color: #fff;
box-shadow: 0px 2px 2px 0px #ddd;
z-index: 1;
padding: 0.5rem;
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
      {loading === 'idle' && users?.length > 0
      ? users.map(user => (<User key={user.id} {...user} />))
      : <UserNotFound>Usuario no encontrado</UserNotFound>}
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
          className={css`
          float: right;
          background: transparent url(${nextArrow}) right no-repeat !important;
          padding-right: 1.5rem !important;
          `}
        >
          Siguiente Página
            </PageNavigationButton>
      </div>
    </section>
  );
}

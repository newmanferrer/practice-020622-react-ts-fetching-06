import { useState, useEffect } from 'react';
import { useUsers } from './hooks';
import { AxiosError } from 'axios';
import { GlobalStyles, Title, UserForm, SearchForm, Loader, Message, UsersList } from './components';

export const App = () => {
  const [successMessage, setSuccessMessage] = useState(false);
  let { data: users, isLoading, isFetching, isFetched, isError, error, isSuccess } = useUsers();
  let errorMessage = '';

  if (isFetching) isLoading = true;
  else isLoading = false;

  if (isError && error instanceof AxiosError) errorMessage = error.message;

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    }
  }, [users, isFetching]);

  return (
    <>
      <GlobalStyles />
      <Title text='React with TS - Fetching 06 - REACT QUERY' size='2.5rem' />
      <UserForm />
      <SearchForm />
      {isLoading && <Loader />}
      {!isLoading && isError && <Message type='error' text={errorMessage} />}
      {!isLoading && isSuccess && successMessage && <Message type='success' text='action executed successfully' />}
      {isFetched && !isError && isSuccess ? (
        users?.length ? (
          <UsersList />
        ) : (
          <Message type='error' text='No users yet...' />
        )
      ) : null}
    </>
  );
};

# PRACTICE: REACT WHIT TYPESCRIPT FETCHING OF DATA 06 - REACT QUERY

## Project description

Practice react with typescript using react query (RQ) for requests to the JSON Placeholder and JSON Server.
It is a simple project where we will implement a CRUD, the most important thing is to practice the tools and options available when using RQ for asynchronous requests.

## Used technology

- Html 5
- CSS
- JavaScript
- TypeScript
- React
- React Query (RQ)
- Redux Tool Kit (RTK)
- React Redux
- Axios
- Styled Components
- ESLint
- Prettier
- Vite

## Resources used

JSON Server: https://github.com/typicode/json-server

API JSON Placeholder: https://jsonplaceholder.typicode.com/

## Developers: Requirements

- Nodejs
- Web Browser
- Code editor

## Developers: Installtion

1. Clone the repository: https://github.com/newmanferrer/practice-020622-react-ts-fetching-06.git
2. Another option is to download the repository using ZIP format.
3. Install the dependencies using the command "yarn", from the terminal console.
4. From the terminal console, execute the “yarn dev” command, to run the development server.
5. From the terminal console, execute the “yarn run fake-api” command, to run the json server.

# REACT QUERY (RQ)

React Query is often described as the missing data-fetching library for React, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your React applications a breeze.

React Query is hands down one of the best libraries for managing server state. It works amazingly well out-of-the-box, with zero-config, and can be customized to your liking as your application grows.

React Query allows you to defeat and overcome the tricky challenges and hurdles of server state and control your app data before it starts to control you.

On a more technical note, React Query will likely:

- Help you remove many lines of complicated and misunderstood code from your application and replace with just a handful of lines of React Query logic.
- Make your application more maintainable and easier to build new features without worrying about wiring up new server state data sources
- Have a direct impact on your end-users by making your application feel faster and more responsive than ever before.
- Potentially help you save on bandwidth and increase memory performance

The 3 core concepts of React Query:

- Queries
- Mutations
- Query Invalidation

Link: https://react-query.tanstack.com/overview

# Important Notes, Suggestions and Recommendations

## 1.- Basic steps for implementation

1. Import QueryClient and QueryClientProvider (a good place could be in the main file)
2. Create an instance of QueryClient
3. Wrap the application with QueryClientProvider and pass the queryClient instance in the client property

Note: It would also be a good idea to add the ReactQueryDevtools

```js
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>
);
```

4. Use the useQuery hook to have the data and methods that this hook offers us

Note: useQuery needs as arguments the key that will be used to identify the data from the cache and the asynchronous function that will return the data from the api

```js
import { useQuery } from 'react-query';
import { getUsers } from '../../services/fake-api/usersApi';

const { data, isLoading, isError, isSuccess } = useQuery(['USERS'], getUsers);
```

5. Use the useQueryClient hook to have methods like getQueryData, setQueryData and invalidateQueries for example
6. We use the useMutation hook when we need to mutate server data usually via post, put, patch and delete.

```js
import { useQueryClient, useMutation } from 'react-query';
import { createUser } from '../../services/fake-api/usersApi';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(createUser, {
    onSuccess: user => {
      queryClient.setQueryData(['USERS'], prevUsers => prevUsers.concat(user));
      queryClient.invalidateQueries(['USERS']);
    }
  });
};
```

## 2.- We can create a hook to simplify our work

### In the hooks folder

```js
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../../services/fake-api/usersApi';

const key = 'USERS';

export const useUsers = () => {
  return useQuery([key], getUsers);
};

export const useUser = (userId: string) => {
  return useQuery([key, userId], () => getUserById(userId));
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([key]);
    }
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([key]);
    }
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([key]);
    }
  });
};
```

### In some component

```js
import { useUsers } from './hooks';

export const App = () => {
  const { data: users, isLoading, isError, error, isSuccess } = useUsers();

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && isError && <Message type='error' text={errorMessage} />}
      {!isLoading && isSuccess && <Message type='success' text='action executed successfully' />}
      {!isLoading && users?.length && users.map(user => console.log(user.name))}
    </>
  );
};
```

### in some other component

```js
import { useDeleteUser } from '../../hooks';
import { user } from '../../models';

interface UserItemProps {
  user: user;
}

export const UserItem = ({ user }: UserItemProps) => {
  const { id, name, username, email } = user;
  const deleteUserMutation = useDeleteUser();

  const handleDelete = (userId: string) => {
    const isConfirm = confirm(`The user with id: "${user.id}" and name: "${user.name}", will be deleted`);

    if (isConfirm) deleteUserMutation.mutate(userId);
    else return;
  };

  return (
    <LiStyled>
      <H3Styled>{name}</H3Styled>
      <H4Styled>ID: {id}</H4Styled>
      <H4Styled>{username}</H4Styled>
      <H4Styled>{email}</H4Styled>

      <ButtonsWrapper>
        <ButtonStyled colorHover={COLORS.white} bgHover={COLORS.error} onClick={() => handleDelete(id)}>
          Delete
        </ButtonStyled>
      </ButtonsWrapper>
    </LiStyled>
  );
};
```

# Examples

## Basic Example

### In main file

```js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { App } from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>
);
```

### In App file

```js
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { GlobalStyles, Title } from './components';

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <Title text='React with TS - Fetching 06 - REACT QUERY' size='2.5rem' />
      <Users />
    </>
  );
};

async function getUsers() {
  const response = await axios.get('http://localhost:5000/users');
  return response.data;
}

async function addUser() {
  axios
    .post('http://localhost:5000/users', {
      name: 'Prince Namor',
      username: 'namorp',
      email: 'namorp@avengers.com'
    })
    .then(response => response.data)
    .catch(error => console.error(error));
}

function Users() {
  const queryClient = useQueryClient();
  const query = useQuery('USERS', getUsers);
  const mutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('USERS');
    }
  });

  return (
    <div>
      <ul>{query && query.data && query.data.map((user: user) => <li key={user.id}>{user.name}</li>)}</ul>

      <button
        onClick={() => {
          mutation.mutate();
        }}
      >
        Add User
      </button>
    </div>
  );
}
```

---

## Author: Newman Ferrer

newmanferrer@gmail.com

:sun_with_face: Maracaibo - Venezuela :venezuela:

Practice date: 02/06/2022

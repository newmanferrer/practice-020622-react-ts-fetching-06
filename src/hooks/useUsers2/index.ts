import { useQuery } from 'react-query';
import { user } from '../../models';

const URL = 'http://localhost:5000/users';

const fetchUsers = async (): Promise<user[]> => {
  const response = await fetch(URL);
  if (!response.ok) throw new Error('Error getting users');
  const users = await response.json();
  return users;
};

export const useUsers2 = async () => {
  return useQuery('USERS', fetchUsers);
};

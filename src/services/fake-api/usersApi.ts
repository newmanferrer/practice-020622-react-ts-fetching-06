import axios, { AxiosResponse } from 'axios';
import { user, userPartial } from '../../models';

export const usersApi = axios.create({
  baseURL: 'http://localhost:5000'
});

export const getUsers = async (): Promise<user[]> => {
  const { data } = await usersApi.get('users');
  return data;
};

export const getUserById = async (userId: string): Promise<user> => {
  const { data } = await usersApi.get(`users/${userId}`);
  return data;
};

export const createUser = async (user: user): Promise<AxiosResponse<user, user>> => {
  return await usersApi.post('users', user);
};

export const updateUser = async (user: userPartial): Promise<AxiosResponse<user, user>> => {
  return await usersApi.patch(`users/${user.id}`, user);
};

export const deleteUser = async (userId: string): Promise<AxiosResponse<user, user>> => {
  return await usersApi.delete(`users/${userId}`);
};

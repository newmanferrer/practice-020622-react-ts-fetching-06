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

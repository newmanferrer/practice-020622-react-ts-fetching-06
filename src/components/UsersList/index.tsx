import { useAppSelector } from '../../hooks';
import { useUsers } from '../../hooks';
import { UserItem } from '../';
import { user } from '../../models';
import { UlStyled } from './StyledComponents';

export const UsersList = () => {
  const { data: users } = useUsers();
  const { search } = useAppSelector(state => state.search);

  return (
    <UlStyled>
      {users &&
        users
          .filter(
            user =>
              user.id.toLowerCase().includes(search.toLowerCase()) ||
              user.name.toLowerCase().includes(search.toLowerCase()) ||
              user.username.toLowerCase().includes(search.toLowerCase()) ||
              user.email.toLowerCase().includes(search.toLowerCase())
          )
          .map((user: user) => <UserItem key={user.id} user={user} />)}
    </UlStyled>
  );
};

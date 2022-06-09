import { useUserToEditContext } from '../../contexts';
import { useDeleteUser } from '../../hooks';
import { user } from '../../models';
import { LiStyled, H3Styled, H4Styled, ButtonsWrapper, ButtonStyled } from './StyledComponents';
import { COLORS } from '../../colors';

interface UserItemProps {
  user: user;
}

export const UserItem = ({ user }: UserItemProps) => {
  const { id, name, username, email } = user;
  const { setUserToEdit } = useUserToEditContext();
  const deleteUserMutation = useDeleteUser();

  const handleDelete = (userId: string) => {
    const isConfirm = confirm(`The user with id: "${user.id}" and name: "${user.name}", will be deleted`);

    if (isConfirm) {
      deleteUserMutation.mutate(userId);
    } else {
      return;
    }
  };

  return (
    <LiStyled>
      <H3Styled>{name}</H3Styled>
      <H4Styled>ID: {id}</H4Styled>
      <H4Styled>{username}</H4Styled>
      <H4Styled>{email}</H4Styled>

      <ButtonsWrapper>
        <ButtonStyled onClick={() => setUserToEdit(user)}>Update</ButtonStyled>
        <ButtonStyled colorHover={COLORS.white} bgHover={COLORS.error} onClick={() => handleDelete(id)}>
          Delete
        </ButtonStyled>
      </ButtonsWrapper>
    </LiStyled>
  );
};

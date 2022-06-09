import { useState, useEffect } from 'react';
import { useUserToEditContext } from '../../contexts';
import { useForm, useCreateUser, useUpdateUser } from '../../hooks';
import { user } from '../../models';
import { FormStyled, TitleStyled, InputsWrapper, InputStyled, ButtonsWrapper, ButtonStyled } from './StyledComponents';
import { COLORS } from '../../colors';

const initialState: user = {
  id: '',
  name: '',
  username: '',
  email: ''
};

export const UserForm = () => {
  const { form, setForm, clearForm, handleChange } = useForm(initialState);
  const [isDisabled, setIsDisabled] = useState(true);
  const { userToEdit, setUserToEdit } = useUserToEditContext();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (userToEdit) setForm(userToEdit);
    else clearForm();
  }, [userToEdit, setForm, clearForm]);

  useEffect(() => {
    if (!form.name || !form.username || !form.email) setIsDisabled(true);
    else setIsDisabled(false);
  }, [form, clearForm]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.username || !form.email) {
      alert('incomplete data...');
      return;
    }

    if (form.id === '') {
      createUser.mutate(form);
    } else {
      updateUser.mutate(form);
    }

    handleClearForm();
  };

  const handleClearForm = () => {
    clearForm();
    setUserToEdit(null);
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <TitleStyled>{userToEdit ? 'Edit User' : 'Create User'}</TitleStyled>

      <InputsWrapper>
        <InputStyled type='text' name='name' value={form.name} placeholder='name' onChange={handleChange} />
        <InputStyled type='text' name='username' value={form.username} placeholder='username' onChange={handleChange} />
        <InputStyled type='email' name='email' value={form.email} placeholder='email' onChange={handleChange} />
      </InputsWrapper>

      <ButtonsWrapper>
        <ButtonStyled type='reset' colorHover={COLORS.error} bgHover={COLORS.warning} onClick={handleClearForm}>
          CLEAR
        </ButtonStyled>
        <ButtonStyled disabled={isDisabled} type='submit' colorHover={COLORS.white} bgHover={COLORS.success}>
          SEND
        </ButtonStyled>
      </ButtonsWrapper>
    </FormStyled>
  );
};

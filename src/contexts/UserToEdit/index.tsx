//* ///////////////////////////////////////////////////////////////////////////
//* UserToEdit
//* ///////////////////////////////////////////////////////////////////////////
//* ===========================================================================
//* 1.- Imports
//* ===========================================================================
import { createContext, useContext, useState, ReactNode } from 'react';
import { user, userPartial } from '../../models';
//* ===========================================================================

//* ===========================================================================
//* 2.- Models / Interfaces
//* ===========================================================================
//* ---------------------------------------------------------------------------
//* 2.1.- IUserToEditContextValues
//* ---------------------------------------------------------------------------
interface IUserToEditContextValues {
  userToEdit: user | userPartial | null;
  setUserToEdit: (value: React.SetStateAction<user | userPartial | null>) => void;
}
//* ---------------------------------------------------------------------------

//* ---------------------------------------------------------------------------
//* 2.2.- ITodoSearchProviderProps
//* ---------------------------------------------------------------------------
interface IUserToEditProviderProps {
  children: ReactNode;
}
//* ---------------------------------------------------------------------------
//* ===========================================================================

//* ===========================================================================
//* 3.- Create the context
//* ===========================================================================
const UserToEditContext = createContext<IUserToEditContextValues | undefined>(undefined);
//* ===========================================================================

//* ===========================================================================
//* 4.- Create the Provider
//* ===========================================================================
const UserToEditProvider = ({ children }: IUserToEditProviderProps) => {
  const [userToEdit, setUserToEdit] = useState<user | userPartial | null>(null);

  const data: IUserToEditContextValues = {
    userToEdit,
    setUserToEdit
  };

  return <UserToEditContext.Provider value={data}>{children}</UserToEditContext.Provider>;
};
//* ===========================================================================

//* ===========================================================================
//* 5.- Create useUserToEditContext
//* ===========================================================================
const useUserToEditContext = () => {
  const context = useContext(UserToEditContext);

  if (context === undefined) {
    throw Error(
      '"useUserToEditContext", must be used within a "UserToEditProvider" - "useUserToEditContext", debe usarse dentro de un "UserToEditProvider"'
    );
  }

  return context;
};
//* ===========================================================================

//* ===========================================================================
//* 6.- Export
//* ===========================================================================
export { UserToEditProvider, useUserToEditContext };
//* ===========================================================================
//* ///////////////////////////////////////////////////////////////////////////

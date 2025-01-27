export interface User {
  firstName: string;
  lastName: string;
  bio: string;
  username: string;
  password: string;
}

export interface EditModeProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

import { Dispatch, SetStateAction } from 'react';

export type FormModalType = {
  handleFormModal: Dispatch<SetStateAction<boolean>>;
  openFormModal: boolean;
  children: React.ReactChild;
};

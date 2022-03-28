import {
  Dispatch,
  SetStateAction,
  FormEvent,
  ChangeEvent,
  FocusEvent,
} from 'react';
import { FormikState, FormikErrors } from 'formik';
import { Types } from '../../common';

export type HandleTaskSubmitType = (
  values: Types.Task,
  resetForm: (nextState?: Partial<FormikState<Types.Task>> | undefined) => void
) => void;

export type HandleTaskSpecificSubmit = (values: Types.Task) => void;

export type FormStatusValuesType = {
  add: FormValuesType;
  edit: FormValuesType;
  [x: string]: any;
};

export type FormValuesType = {
  formTitle: string;
  buttonText: JSX.Element;
};

type SelectStatusValueType = {
  value: Types.TaskStatusType;
  name: Types.TaskStatusType;
};

export type FormTaskType = {
  initialValues: Types.Task;
  formValues: {
    formTitle: string;
    buttonText: JSX.Element;
  };
  selectStatusValues: SelectStatusValueType[];
  handleFormModal: Dispatch<SetStateAction<boolean>>;
  formikHandleBlur: (e: FocusEvent) => void;
  formikSubmitHandle: (e?: FormEvent<HTMLFormElement>) => void;
  formikHandleChange: (e: ChangeEvent<any>) => void;
  formikSetFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<any>>;
  handleStatusForm: Dispatch<SetStateAction<Types.StatusFormType>>;
};

export type FormTaskContainerType = {
  initialValues: Types.Task;
  handleFormModal: Dispatch<SetStateAction<boolean>>;
  handleStatusForm: Dispatch<SetStateAction<Types.StatusFormType>>;
  statusForm: Types.StatusFormType;
};

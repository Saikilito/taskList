import { FormikErrors } from 'formik';

export type DateAndTimePickerType = {
  label: string;
  initValue: any;
  onChangeFunction: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<any>>;
};

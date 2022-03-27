import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  task: yup.string().min(5).required(),
  expiration: yup.string().required(),
});

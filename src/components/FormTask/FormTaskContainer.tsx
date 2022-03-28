import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import moment from 'moment';

// Helpers
import { Types, CONSTANT } from '../../common';
import { tasksSlices } from '../../redux/slices';
import { formValues, selectStatusValues } from './FormTask.helper';
import { validationSchema } from '../../components/FormTask/validations';

// My Types
import {
  HandleTaskSubmitType,
  HandleTaskSpecificSubmit,
  FormTaskContainerType,
} from './FormTask.type';

// My Components
import { FormTask } from './FormTask';

// To Code
const { formStatus } = CONSTANT.app.task;
const { dateFormatComplete } = CONSTANT.general.dates;

const { createTask, updateTask } = tasksSlices;

function FormTaskContainer({
  handleFormModal,
  handleStatusForm,
  statusForm,
  initialValues,
}: FormTaskContainerType) {
  // Redux State
  const dispatch = useDispatch();

  // Formik Config
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => handleTaskSubmit(values, resetForm),
    validationSchema,
  });

  const { values, handleSubmit, handleChange, setFieldValue, handleBlur } =
    formik;

  // Use for validate form errors
  useEffect(() => {
    if (formik.touched.taskDescription && formik.errors.taskDescription) {
      toast.error(formik.errors.taskDescription);
    }
  }, [formik.touched, formik.errors]);

  // Handlers
  const handleTaskSubmitForCreate: HandleTaskSpecificSubmit = (value) => {
    const { taskDescription, status } = value;
    if (value.expiration === null || value.expiration === '') {
      toast.error('Expiration field is required');
    }

    let expiration = value.expiration;
    if (typeof value.expiration !== 'string') {
      expiration = moment(value.expiration)?.format(dateFormatComplete);
    }

    const now = moment();
    if (now.isAfter(moment(expiration, dateFormatComplete))) {
      const errorMessage =
        ' No es una fecha valida, por favor, intente nuevamente';

      return toast.error(expiration + errorMessage);
    }

    const newTask: Types.Task = {
      id: uuidv4(),
      status,
      taskDescription,
      expiration: expiration?.toString(),
      createdAt: value.createdAt,
    };

    dispatch(createTask(newTask));
  };

  const handleTaskSubmitForUpdate: HandleTaskSpecificSubmit = (value) => {
    const val = value as Types.Task;
    dispatch(updateTask(val));
    handleStatusForm(formStatus.add);
  };

  const handleTaskSubmit: HandleTaskSubmitType = (value, resetForm) => {
    if (statusForm === formStatus.add) {
      handleTaskSubmitForCreate(value);
    } else {
      handleTaskSubmitForUpdate(value);
    }

    resetForm({ values: initialValues });
  };

  const initialValuesForm = {
    ...values,
    expiration: values.expiration as Date | string | Object,
  };

  return (
    <>
      <FormTask
        formValues={formValues[statusForm]}
        initialValues={initialValuesForm}
        selectStatusValues={selectStatusValues}
        formikSubmitHandle={handleSubmit}
        formikHandleChange={handleChange}
        formikSetFieldValue={setFieldValue}
        formikHandleBlur={handleBlur}
        handleFormModal={handleFormModal}
      />
    </>
  );
}

export { FormTaskContainer };

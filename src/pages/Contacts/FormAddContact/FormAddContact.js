import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormAddContact = ({createContact}) => {
  const initialValues = {
    newName: '',
    newPhone: '',
  };

  const validationSchema = Yup.object({
    newName: Yup.string().required('Введите имя'),
    newPhone: Yup.string().required('Введите телефон'),
  });

  const onSubmit = (values) => {
    createContact(values)
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <div className='form-group'>
            <label className='form-label'>Name</label>
            <Field
              className='form-control'
              id='newName'
              type='text'
              name='newName'
              placeholder='Name'
            />

            <ErrorMessage
              name='newName'
              component='span'
              className='form-text text-danger'
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>Name</label>
            <Field
              className='form-control'
              id='newPhone'
              type='text'
              name='newPhone'
              placeholder='Phone'
            />

            <ErrorMessage
              name='newPhone'
              component='span'
              className='form-text text-danger'
            />
          </div>

          <button
              className='btn btn-primary mb-4'
              type='submit'
              disabled={!(formik.dirty & formik.isValid)}
            >
              Добавить
            </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormAddContact;

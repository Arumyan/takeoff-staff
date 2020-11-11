import React from 'react';
import classes from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../redux/reducers/authReducer';
import { useHistory } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const { isAuth, isLoading } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    login: '',
    password: '',
  };

  const validationSchema = Yup.object({
    login: Yup.string().required('Введите логин'),
    password: Yup.string()
      .min(5, 'Пароль должен быть не меньше 5 символов')
      .required('Введите пароль'),
  });

  const onSubmit = (values) => {
    dispatch(loginThunk(values.login, values.password));
  };

  if (isAuth) {
    history.push('/');
  }

  return (
    <div className={classes.Login}>
      <div className='p-3 mb-5 bg-info text-white'>
        Тестовый логин и пароль - admin/admin
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <div className='form-group'>
              <label className='form-label' htmlFor='login'>
                Логин
              </label>
              <Field
                className='form-control'
                id='login'
                type='text'
                name='login'
                placeholder='Логин'
              />

              <ErrorMessage
                name='login'
                component='span'
                className='form-text text-danger'
              />
            </div>

            <div className='form-group'>
              <label className='form-label' htmlFor='password'>
                Пароль
              </label>
              <Field
                className='form-control'
                id='password'
                type='password'
                name='password'
                placeholder='Пароль'
              />

              <ErrorMessage
                name='password'
                component='span'
                className='form-text text-danger'
              />
            </div>

            <button
              className='btn btn-primary'
              type='submit'
              disabled={!(formik.dirty & formik.isValid) || isLoading}
            >
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;

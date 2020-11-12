import React from 'react';
import classes from './ContactActions.module.scss';

import { Button } from 'react-bootstrap';

const ContactActions = ({ isEditMode, onDelete, onSave, onChangeMode }) => {
  return (
    <>
      {!isEditMode ? (
        <div className={classes.BtnGroup}>
          <Button variant='primary' size='sm' onClick={onChangeMode}>
            Редактировать
          </Button>
          <Button variant='danger' size='sm' onClick={onDelete}>
            Удалить
          </Button>
        </div>
      ) : (
        <div className={classes.BtnGroup}>
          <Button variant='success' size='sm' onClick={onSave}>
            Сохранить
          </Button>
          <Button variant='secondary' size='sm' onClick={onChangeMode}>
            Отменить
          </Button>
        </div>
      )}
    </>
  );
};

export default ContactActions;

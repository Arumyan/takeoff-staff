import React, { useState, useEffect } from 'react';
import classes from './Contact.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Table, Container, Button } from 'react-bootstrap';

import {
  deleteContact,
  changeMode,
  changeContact
} from '../../redux/reducers/contactsReducer';

const Contacts = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.authReducer);
  const { contacts } = useSelector((state) => state.contactsReducer);

  const [form, setForm] = useState({
    name: '',
    phone: '',
  });

  const formChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (!isAuth) {
    history.push('/login');
  }

  const deleteContactHandler = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const editContactHandler = (contactId) => {
    dispatch(changeMode(contactId));
    const contact = contacts.find((item) => item.id === contactId);

    setForm({
      name: contact.name,
      phone: contact.phone
    })
  };

  const changeContactHandler = (contactId) => {
    dispatch(changeContact(contactId, form));
    dispatch(changeMode(contactId));
  }

  return (
    <Container>
      <div className={classes.ContactsHeader}>
        <h1>Контакты</h1>

        <div className={classes.ContactsHeaderAction}>
          <Button variant='success'>Добавить</Button>
        </div>
      </div>

      <Table striped hover className={classes.TableContacts}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!contacts.length ? (
            <tr>
              <td className='text-center' colspan='4'>
                Контактов нет
              </td>
            </tr>
          ) : null}

          {contacts.map((contact, index) => {
            return (
              <tr key={contact.id}>
                <td>{index + 1}</td>
                <td>
                  {contact.editMode ? (
                    <input
                      type='text'
                      name='name'
                      value={form.name}
                      onChange={(e) => {
                        formChangeHandler(e);
                      }}
                    />
                  ) : (
                    contact.name
                  )}
                </td>
                <td>
                {contact.editMode ? (
                    <input
                      type='text'
                      name='phone'
                      value={form.phone}
                      onChange={(e) => {
                        formChangeHandler(e);
                      }}
                    />
                  ) : (
                    contact.phone
                  )}
                </td>
                <td className='text-right'>
                  {!contact.editMode && (
                    <div className={classes.BtnGroup}>
                      <Button
                        variant='primary'
                        size='sm'
                        onClick={() => editContactHandler(contact.id)}
                      >
                        Редактировать
                      </Button>
                      <Button
                        className='ml-2'
                        variant='danger'
                        size='sm'
                        onClick={() => deleteContactHandler(contact.id)}
                      >
                        Удалить
                      </Button>
                    </div>
                  )}

                  {contact.editMode && (
                    <div className={classes.BtnGroup}>
                      <Button variant='success' size='sm' onClick={() => changeContactHandler(contact.id)}>
                        Сохранить
                      </Button>
                      <Button
                        className='ml-2'
                        variant='secondary'
                        size='sm'
                        onClick={() => editContactHandler(contact.id)}
                      >
                        Отменить
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Contacts;

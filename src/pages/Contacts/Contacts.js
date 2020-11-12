import React, { useState, useEffect } from 'react';
import classes from './Contact.module.scss';

import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Container, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import ContactActions from './ContactActions/ContactActions';
import ContactField from './ContactField/ContactField';
import ContactTableHeader from './ContactTableHeader/ContactTableHeader';
import FormAddContact from './FormAddContact/FormAddContact';

import {
  deleteContact,
  changeMode,
  changeContact,
  addContact,
} from '../../redux/reducers/contactsReducer';

const Contacts = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.authReducer);
  const { contacts } = useSelector((state) => state.contactsReducer);
  const [formAddContact, setFormAddContact] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredContacts, setfilteredContacts] = useState([]);

  useEffect(() => {
    setfilteredContacts(contacts);
  }, [query, contacts])

  useEffect(() => {
    const filteredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(query.toLowerCase())
    })

    setfilteredContacts(filteredContacts)
  }, [query])

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const [form, setForm] = useState({
    name: '',
    phone: '',
  });

  const formChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const deleteContactHandler = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const changeModeHandler = (contactId) => {
    dispatch(changeMode(contactId));
    const contact = contacts.find((item) => item.id === contactId);

    setForm({
      name: contact.name,
      phone: contact.phone,
    });
  };

  const changeContactHandler = (contactId) => {
    dispatch(changeContact(contactId, form));
    dispatch(changeMode(contactId));
  };

  const addContactHandler = () => {
    setFormAddContact(true);
  };

  const createContactHandler = (values) => {
    const newContact = {
      id: uuidv4(),
      name: values.newName,
      phone: values.newPhone,
      editMode: false,
    };
    setFormAddContact(false);

    dispatch(addContact(newContact));
  };

  if (!isAuth) {
    return <Redirect to='/login' />;
  }

  return (
    <Container>
      <div className={classes.ContactsHeader}>
        <h1>Контакты</h1>

        <div className={classes.ContactsHeaderAction}>
          <Button variant='success' onClick={addContactHandler}>
            Новый контакт
          </Button>
        </div>
      </div>

      {formAddContact && (
        <FormAddContact createContact={createContactHandler} />
      )}

      <div className={classes.ContactSearch}>
        <input
          className={classes.InputSearch}
          value={query}
          onChange={handleInputChange}
          type='text'
          placeholder='Введите имя контакта'
        />
      </div>

      <Table striped hover className={classes.TableContacts}>
        <ContactTableHeader />

        <tbody>
          {!filteredContacts.length ? (
            <tr>
              <td className='text-center' colSpan='4'>
                Контактов не найдено
              </td>
            </tr>
          ) : null}

          {filteredContacts.map((contact, index) => {
            return (
              <tr key={contact.id}>
                <td>{index + 1}</td>
                <td>
                  <ContactField
                    isEditMode={contact.editMode}
                    name='name'
                    valueInput={form.name}
                    value={contact.name}
                    onChangeHandler={(e) => formChangeHandler(e)}
                  />
                </td>
                <td>
                  <ContactField
                    isEditMode={contact.editMode}
                    name='phone'
                    valueInput={form.phone}
                    value={contact.phone}
                    onChangeHandler={(e) => formChangeHandler(e)}
                  />
                </td>
                <td className='text-right'>
                  <ContactActions
                    isEditMode={contact.editMode}
                    onChangeMode={() => changeModeHandler(contact.id)}
                    onDelete={() => deleteContactHandler(contact.id)}
                    onSave={() => changeContactHandler(contact.id)}
                  />
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

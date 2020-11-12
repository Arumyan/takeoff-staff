import {
  CHANGE_CONTACT,
  DELETE_CONTACT,
  CHANGE_MODE,
  ADD_CONTACT
} from '../actions/actionType';

const initialState = {
  contacts: [
    {
      id: 0,
      name: 'Lorem ipsum dolor sit amet.',
      phone: '8-800-123-456',
      editMode: false,
    },
    {
      id: 1,
      name: 'Nikolay Morozov',
      phone: '8-800-123-456',
      editMode: false,
    },
    {
      id: 2,
      name: 'Alexey Petrov',
      phone: '8-800-123-456',
      editMode: false,
    },
    {
      id: 3,
      name: 'Ivan Ivanov',
      phone: '8-800-123-456',
      editMode: false,
    },
    {
      id: 4,
      name: 'John Snuk',
      phone: '8-800-123-456',
      editMode: false,
    },
    {
      id: 5,
      name: 'Ivan Ivanov 4',
      phone: '8-800-123-456',
      editMode: false,
    },
    {
      id: 6,
      name: 'Ivan Ivanov 2',
      phone: '8-800-123-456',
      editMode: false,
    },
    {
      id: 7,
      name: '77 John Snuk 44',
      phone: '8-800-123-456',
      editMode: false,
    }
  ],
};

export default function contactsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact.id === action.payload.contactId) {
            return { ...contact, ...action.payload.newContactData };
          }
          return contact;
        }),
      };

    case ADD_CONTACT:
      const updatedContacts = [...state.contacts];
      updatedContacts.unshift(action.newContact);
      return {
        ...state,
        contacts: updatedContacts,
      };

    case DELETE_CONTACT:
      const newContacts = [...state.contacts];
      const index = newContacts.findIndex((item) => item.id === action.contactId);

      newContacts.splice(index, 1);

      return {
        ...state,
        contacts: newContacts,
      };

    case CHANGE_MODE:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact.id === action.contactId) {
            return { ...contact, editMode: !contact.editMode };
          }

          return contact;
        }),
      };

    default:
      return state;
  }
}

export const addContact = (newContact) => {
  return {
    type: ADD_CONTACT,
    newContact,
  };
};

export const deleteContact = (contactId) => {
  return {
    type: DELETE_CONTACT,
    contactId,
  };
};

export const changeMode = (contactId) => {
  return {
    type: CHANGE_MODE,
    contactId,
  };
};

export const changeContact = (contactId, newContactData) => {
  return {
    type: CHANGE_CONTACT,
    payload: { contactId, newContactData },
  };
};

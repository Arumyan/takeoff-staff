import {
  CHANGE_CONTACT,
  DELETE_CONTACT,
  CHANGE_MODE
} from '../actions/actionType';

const initialState = {
  contacts: [
    {
      id: 0,
      name: 'User 1',
      phone: '8-800-123-456',
      editMode: false,
    },
    {
      id: 1,
      name: 'User 2',
      phone: '8-800-123-456',
      editMode: false,
    },
    {
      id: 2,
      name: 'User 3',
      phone: '8-800-123-456',
      editMode: false,
    },
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

    case DELETE_CONTACT:
      const newContacts = [...state.contacts];
      const index = newContacts.find((item) => item.id === action.payload);
      newContacts.splice(index, 1);

      return {
        ...state,
        contacts: newContacts,
      };

    case CHANGE_MODE:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact.id === action.payload) {
            return { ...contact, editMode: !contact.editMode };
          }

          return contact;
        }),
      };

    default:
      return state;
  }
}

export const deleteContact = (contactId) => {
  return {
    type: DELETE_CONTACT,
    payload: contactId,
  };
};

export const changeMode = (contactId) => {
  return {
    type: CHANGE_MODE,
    payload: contactId,
  };
};

export const changeContact = (contactId, newContactData) => {
  return {
    type: CHANGE_CONTACT,
    payload: { contactId, newContactData },
  };
};

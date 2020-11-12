import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import contactsReducer from './reducers/contactsReducer';

export const rootReducer = combineReducers({
  authReducer,
  contactsReducer
});
import { authAPI } from '../../api/api';
import {SET_AUTH, AUTH_IS_LOADING, AUTH_ERROR } from '../actions/actionType'

const initialState = {
  isAuth: false,
  isLoading: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        ...action.isAuth,
      };

    case AUTH_IS_LOADING:
      return {
        ...state,
        ...action.isLoading,
      };

    case AUTH_ERROR:
      return {
        ...state,
        ...action.error,
      };

    default:
      return state;
  }
}

export const setAuthActionCreator = (isAuth) => {
  return { type: SET_AUTH, isAuth };
};

export const isLoadingActionCreator = (isLoading) => {
  return { type: AUTH_IS_LOADING, isLoading };
};

export const errorActionCreator = (error) => {
  return { type: AUTH_ERROR, error };
};

export const loginThunk = (login, password) => async (dispatch) => {
  dispatch(isLoadingActionCreator({ isLoading: true }));
  dispatch(errorActionCreator({ error: null }));

  const data = await authAPI.login(login, password);

  // Check Auth Data
  if (data.length) {
    // NOTE!
    // Emulation verification of the user
    // of course, it must occur on a real server
    const isAuth = data.some((user) => (user.name === login && user.password === password))

      if(isAuth) {
        dispatch(errorActionCreator({ error: null }));
        dispatch(setAuthActionCreator({ isAuth: true }));
        dispatch(isLoadingActionCreator({ isLoading: false }));

        document.cookie = "userIsAuth=true";
      }
      else {
        dispatch(errorActionCreator({ error: 'Не верные учетные данные' }));
        dispatch(setAuthActionCreator({ isAuth: false }));
        dispatch(isLoadingActionCreator({ isLoading: false }));
      }
    }
  else {
    dispatch(errorActionCreator({ error: 'Что то пошло не так...' }));
    dispatch(setAuthActionCreator({ isAuth: false }));
    dispatch(isLoadingActionCreator({ isLoading: false }));
  }
};

export const logoutThunk = () => async (dispatch) => {
  dispatch(isLoadingActionCreator({ isLoading: true }));
  const data = await authAPI.logout();

  if(data) {
    dispatch(isLoadingActionCreator({ isLoading: false }));
    dispatch(setAuthActionCreator({ isAuth: false }));

    document.cookie = "userIsAuth=; Max-Age=-1";
  }
};

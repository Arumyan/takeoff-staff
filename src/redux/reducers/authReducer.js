import { authAPI } from '../../api/api';

const initialState = {
  isAuth: false,
  isLoading: false,
  error: null,
};

export const SET_AUTH = 'auth/SET_AUTH';

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        ...action.authData,
      };

    default:
      return state;
  }
}

export const setAuthActionCreator = (authData) => {
  return { type: SET_AUTH, authData };
};

export const loginThunk = (login, password) => async (dispatch) => {

  const data = await authAPI.login(login, password);

  console.log(data)
  // Check Auth Data
  if(data.length) {
    data.foreEach((user) => {                                 // Emulation verification of the user
      if(user.name === login && user.password === password) { // of course, it must occur on a real server
        dispatch(setAuthActionCreator({ isAuth: true, isLoading: false, error: null }));
      }
    })
  }
  else {
    dispatch(setAuthActionCreator({ isAuth: false, isLoading: false, error: 'Something wrong' }));
  }
};
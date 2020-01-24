import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from '../actions/actions';

export const initialState = {
  user: null,
  loading: false
}

export default (state = initialState, action) => {
  console.log('action', action)
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };

    case LOGIN_SUCCESS:
      console.log('LOGIN_SUCCESS', action)
      return {
        ...state,
        user: action.user,
        loading: false
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};
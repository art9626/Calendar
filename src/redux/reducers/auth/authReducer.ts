import { AuthActionsType, SET_AUTH, SET_ERROR, SET_IS_LOADING, SET_USER } from "./authActions";

export type UserType = {
  username: string;
  password: string;
}

const initialState = {
  isAuth: false,
  user: null as null | UserType,
  isLoading: false,
  error: null as null | string,
}

export const authReducer = (state = initialState, action: AuthActionsType) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      }

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }


    default:
      return state;
  }
}
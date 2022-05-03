import { ThunkAction } from 'redux-thunk';
import { api } from '../../../api/rootApi';
import { DispatchType, InferActionsType, RootStateType } from './../../store';
import { UserType } from './authReducer';


export type AuthActionsType = InferActionsType<typeof authActions>;
type ThunkActionType = ThunkAction<void, RootStateType, unknown, AuthActionsType>;

export const SET_AUTH = 'auth/SET_AUTH';
export const SET_USER = 'auth/SET_USER';
export const SET_IS_LOADING = 'auth/SET_IS_LOADING';
export const SET_ERROR = 'auth/SET_ERROR';

export const authActions = {
  setAuth: (payload: boolean) => ({ type: SET_AUTH, payload }) as const,
  setUser: (payload: UserType | null) => ({ type: SET_USER, payload }) as const,
  setIsLoading: (payload: boolean) => ({ type: SET_IS_LOADING, payload }) as const,
  setError: (payload: string | null) => ({ type: SET_ERROR, payload }) as const,
}


export const login = (username: string, password: string): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    dispatch(authActions.setIsLoading(true));

    const response = await api.fetchUsers();
    const user = response.data.find((item) => item.password === password && item.username === username);
    if (user) {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('username', user.username);
      localStorage.setItem('password', user.password);
      dispatch(authActions.setUser(user));
      dispatch(authActions.setAuth(true));
    } else {
      dispatch(authActions.setError('User not found'));
    }
  } catch (error) {
    if (error instanceof Error) {
      dispatch(authActions.setError(error.message));
    }
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
}

export const logout = (): ThunkActionType => (dispatch: DispatchType) => {
  localStorage.removeItem('auth');
  localStorage.removeItem('username');
  localStorage.removeItem('password');
  dispatch(authActions.setUser(null));
  dispatch(authActions.setAuth(false));
}
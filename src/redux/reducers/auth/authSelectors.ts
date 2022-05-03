import { RootStateType } from "../../store";

export const getIsAuth = (state: RootStateType) => state.auth.isAuth;
export const getError = (state: RootStateType) => state.auth.error;
export const getIsLoading = (state: RootStateType) => state.auth.isLoading;
export const getUser = (state: RootStateType) => state.auth.user;
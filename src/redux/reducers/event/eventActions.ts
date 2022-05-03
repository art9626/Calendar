import { ThunkAction } from "redux-thunk";
import { api } from "../../../api/rootApi";
import { DispatchType, InferActionsType, RootStateType } from "../../store";
import { UserType } from "../auth/authReducer";
import { EventType } from "./eventReducer";

export type EventActionsType = InferActionsType<typeof eventActions>;
type ThunkActionType = ThunkAction<void, RootStateType, unknown, EventActionsType>;

export const ADD_EVENT = 'event/ADD_EVENT';
export const SET_EVENTS = 'event/SET_EVENTS';
export const SET_GUESTS = 'event/SET_GUESTS';

export const eventActions = {
  addEvent: (payload: EventType) => ({ type: ADD_EVENT, payload }) as const,
  setEvents: (payload: EventType[]) => ({ type: SET_EVENTS, payload }) as const,
  setGuests: (payload: UserType[]) => ({ type: SET_GUESTS, payload }) as const,
}

export const loadGuests = (): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    const response = await api.fetchUsers();
    dispatch(eventActions.setGuests(response.data));
  } catch (error) {
    console.log(error);
  }
}



export const loadEvents = (username: string): ThunkActionType => async (dispatch: DispatchType) => {
  try {
    const events = await api.fetchEvents(username);
    dispatch(eventActions.setEvents(events));
  } catch (error) {
    console.log(error);
  }
}


export const saveEvents = (event: EventType): ThunkActionType => async (dispatch, getState) => {
  try {
    await api.saveEvents(event);
    dispatch(loadEvents(getState().auth.user?.username || ''));
  } catch (error) {
    console.log(error);
  }
}
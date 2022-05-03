import { UserType } from "../auth/authReducer";
import { ADD_EVENT, EventActionsType, SET_EVENTS, SET_GUESTS } from "./eventActions";

export type EventType = {
  author: string;
  description: string;
  guest: string;
  date: string;
}

const initialState = {
  guests: [] as UserType[],
  events: [] as EventType[],
}

export const eventReducer = (state = initialState, action: EventActionsType) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      }

    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      }

    case SET_GUESTS:
      return {
        ...state,
        guests: action.payload,
      }

    default:
      return state;
  }
}
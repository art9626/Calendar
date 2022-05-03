import { RootStateType } from "../../store";

export const getGuests = (state: RootStateType) => state.event.guests;
export const getEvents = (state: RootStateType) => state.event.events;
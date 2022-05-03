import axios, { AxiosResponse } from "axios";
import { UserType } from "../redux/reducers/auth/authReducer";
import { EventType } from "../redux/reducers/event/eventReducer";


export const instance = axios.create({
  baseURL: './users.json',
});


export const api = {
  fetchUsers: async (): Promise<AxiosResponse<UserType[]>> => {
    const response = await instance.get<UserType[]>('');
    return response;
  },
  saveEvents: async (event: EventType) => {
    const json = localStorage.getItem('events');
    let events = [] as EventType[];
    if (json) {
      events = JSON.parse(json);
    }
    events.push(event)
    localStorage.setItem('events', JSON.stringify(events));
  },
  fetchEvents: async (username: string) => {
    const json = localStorage.getItem('events');
    let events = [] as EventType[];
    if (json) {
      events = JSON.parse(json);
    }

    return events.filter((item) => username === item.author || username === item.guest);
  },
}
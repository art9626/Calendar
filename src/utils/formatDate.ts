import { Moment } from 'moment';

export const formatDate = (value: Moment) => {
  return `${value.year()}-${value.month().toString().length > 1 ? (value.month() + 1).toString() : `0${(value.month() + 1).toString()}`}-${value.date().toString().length > 1 ? value.date().toString() : `0${value.date().toString()}`}`;
}
import { FETCH_FILTERS, REMOVE_FILTER } from './constants';

export const fetchFiltersAction = (params) => ({
  type: FETCH_FILTERS,
  payload: params,
});

export const deleteFilterAction = (params) => ({
  type: REMOVE_FILTER,
  payload: params,
});

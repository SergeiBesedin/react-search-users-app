import {
  SET_USERS,
  GET_REPOS,
  GET_USER,
  SET_LOADING,
  CLEAR_USERS,
  SET_USERNAME,
  SET_CURRENT_PAGE,
} from "../types";

const handlers = {
  [SET_USERNAME]: (state, { username }) => ({
    ...state,
    username,
  }),
  [SET_USERS]: (state, { users, totalCountUsers }) => ({
    ...state,
    users,
    totalCountUsers,
    loading: false,
  }),
  [GET_REPOS]: (state, { repos }) => ({
    ...state,
    repos,
    loading: false,
  }),
  [GET_USER]: (state, { user }) => ({
    ...state,
    user,
    loading: false,
  }),
  [SET_LOADING]: (state) => ({ ...state, loading: true }),
  [SET_CURRENT_PAGE]: (state, { currentPage }) => ({ ...state, currentPage }),
  [CLEAR_USERS]: (state) => ({ ...state, users: [] }),

  DEFAULT: (state) => state,
};

export const githubReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

import React, { useReducer } from 'react';
import axios from 'axios';
import {
  GET_USER,
  GET_REPOS,
  SET_USERS,
  CLEAR_USERS,
  SET_LOADING,
  SET_USERNAME,
  SET_CURRENT_PAGE,
} from '../types';
import { GithubContext } from './github-context';
import { githubReducer } from './github-reducer';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const GithubState = ({ children }) => {
  const initialState = {
    username: '',
    user: {},
    users: [],
    totalCountUsers: 0,
    loading: false,
    repos: [],
    usersPerPage: 20,
    currentPage: 1,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const fetchUsers = async () => {
    setLoading();

    const response = await axios.get(`https://api.github.com/search/users`, {
      params: {
        q: `${username}`,
        page: `${currentPage}`,
        per_page: `${usersPerPage}`,
        client_id: `${CLIENT_ID}`,
        client_secret: `${CLIENT_SECRET}`,
      },
    });

    dispatch({
      type: SET_USERS,
      users: response.data.items,
      totalCountUsers: response.data.total_count,
    });
  };

  const getUser = async (name) => {
    setLoading();

    const response = await axios.get(`https://api.github.com/users/${name}?`);

    dispatch({
      type: GET_USER,
      user: response.data,
      client_id: `${CLIENT_ID}`,
      client_secret: `${CLIENT_SECRET}`,
    });
  };

  const getRepos = async (name) => {
    setLoading();

    const response = await axios.get(
      `https://api.github.com/users/${name}/repos`,
      {
        params: {
          per_page: 5,
          client_id: `${CLIENT_ID}`,
          client_secret: `${CLIENT_SECRET}`,
        },
      }
    );

    dispatch({
      type: GET_REPOS,
      repos: response.data,
    });
  };

  const setUsername = (username) => dispatch({ type: SET_USERNAME, username });

  const setCurrentPage = (currentPage) =>
    dispatch({ type: SET_CURRENT_PAGE, currentPage });

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const setLoading = () => dispatch({ type: SET_LOADING });

  const { username, usersPerPage, currentPage } = state;

  return (
    <GithubContext.Provider
      value={{
        ...state,
        setLoading,
        fetchUsers,
        setUsername,
        setCurrentPage,
        getUser,
        getRepos,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

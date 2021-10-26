import React, { useContext, useEffect, useRef } from "react";
import { AlertContext } from "../../context/alert/alert-context";
import { GithubContext } from "../../context/github/github-context";
import classes from "./search.module.css";
import search from "../../assets/searchIcon.png";

export const Search = () => {
  const { show } = useContext(AlertContext);
  const { username, setUsername, fetchUsers, users, setCurrentPage } =
    useContext(GithubContext);

  const inputValidation = () => {
    if (username.trim()) {
      setCurrentPage(1);
      fetchUsers(username.trim());
    } else {
      show("Поле не должно быть пустым");
    }
  };

  const clickHandler = () => {
    inputValidation();
  };

  const keyHandler = (event) => {
    if (event.key !== "Enter") {
      return;
    }
    inputValidation();
  };

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      users.length === 0 && show("Такого пользователя не существует");
    }
    // eslint-disable-next-line
  }, [users]);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={`${classes.search} input-group`}>
      <input
        ref={inputRef}
        value={username}
        className="form-control shadow-none"
        style={{ borderRadius: "40px 0px 0px 40px", padding: "0 30px" }}
        placeholder="Введите имя пользователя"
        onChange={(event) => setUsername(event.target.value)}
        onKeyPress={keyHandler}
      ></input>
      <button onClick={clickHandler}>
        <img src={search} alt="searchIcon" />
      </button>
    </div>
  );
};

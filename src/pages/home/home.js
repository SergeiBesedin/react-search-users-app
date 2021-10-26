import React, { useContext, useRef, useEffect } from "react";
import { Search } from "../../components/search/search";
import { Alert } from "../../components/alert/alert";
import { Card } from "../../components/card/card";
import { Loader } from "../../components/loader/loader";
import { Pagination } from "../../components/pagination/pagination";
import { Scrollspy } from "../../components/scrollspy/scrollspy";
import { GithubContext } from "../../context/github/github-context";
import classes from "./home.module.css";
import logo from "../../assets/logo.png";

export const Home = () => {
  const { loading, users, totalCountUsers } = useContext(GithubContext);

  const usersRef = useRef();

  useEffect(() => {
    const scrollToRef = () => {
      usersRef.current.scrollIntoView();
    };
    setTimeout(scrollToRef, 500);
    // eslint-disable-next-line
  }, [users]);

  return (
    <div className={`${classes.home} container-fluid`}>
      <div className="vh-100 d-flex flex-column align-items-center">
        <img src={logo} alt="githubLogo" className={classes.logo} />
        <h1>GitHub Search</h1>
        <Search />
        <Alert />
      </div>

      <div className="row px-3" ref={usersRef}>
        {users.length !== 0 && (
          <h2>По вашему запросу найдено: {totalCountUsers} пользователей</h2>
        )}
        {loading ? (
          <Loader />
        ) : (
          users.map((user) => {
            return (
              <div key={user.id} className="col-md-3 col-sm-4 gy-4">
                <Card user={user} />
              </div>
            );
          })
        )}
        {users.length !== 0 && <Pagination />}
      </div>
      <Scrollspy />
    </div>
  );
};

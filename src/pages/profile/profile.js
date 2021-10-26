import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Repos } from "../../components/repos/repos";
import { Loader } from "../../components/loader/loader";
import { GithubContext } from "../../context/github/github-context";
import classes from "./profile.module.css";
import work from "../../assets/workIcon.png";
import locationIcon from "../../assets/locationIcon.png";
import web from "../../assets/webIcon.png";
import account from "../../assets/accountIcon.png";
import arrow from "../../assets/whiteArrow.png";

export const Profile = ({ match }) => {
  const { loading, getUser, getRepos, user, repos } = useContext(GithubContext);
  const userName = match.params.name;

  useEffect(() => {
    getUser(userName);
    getRepos(userName);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
  } = user;

  return (
    <div className={`${classes.profile} container vh-100`}>
      <div className={classes.toMainLink}>
        <img src={arrow} alt="arrowIcon" />
        <Link to="/">Вернуться на главную</Link>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="row justify-content-around mt-5">
          <div
            className={`${classes.cardItem} col-md-4 col-sm-4 card align-items-center`}
          >
            <img src={avatar_url} alt={name} />
            <a href={html_url} target="_blank" rel="noreferrer">
              Перейти в профиль GitHub
            </a>
            <div>
              <span>{followers} подписчиков</span>
              <span> {following} подписок</span>
            </div>
          </div>

          <div className="col-md-8 col-sm-8">
            <div className="d-flex justify-content-between mt-4">
              <h1>{name}</h1>
              <div className={classes.location}>
                <img src={locationIcon} alt="locationIcon" />
                <span>{location ? `${location}` : `Не указано`}</span>
              </div>
            </div>
            <div className="mb-5">{bio && <p>{bio}</p>}</div>

            <div className={`${classes.items} d-flex justify-content-between`}>
              <div>
                <img src={account} alt="accountIcon" />
                <span>{login ? `${login}` : `Не указано`}</span>
              </div>
              <div>
                <img src={web} alt="webIcon" />
                <span>{blog ? `${blog}` : `Не указано`}</span>
              </div>
              <div>
                <img src={work} alt="workIcon" />
                <span>{company ? `${company}` : `Не указано`}</span>
              </div>
            </div>

            <div>
              <h5 className="mb-3">Репозиториев: {public_repos}</h5>
              <Repos repos={repos} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

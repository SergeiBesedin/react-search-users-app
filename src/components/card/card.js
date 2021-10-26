import React from "react";
import { Link } from "react-router-dom";
import classes from "./card.module.css";

export const Card = ({ user }) => {
  return (
    <div className={`card align-items-center ${classes.card}`}>
      <img src={user.avatar_url} alt={user.login} className="card-img-top" />
      <div className="card-body">
        <h4 className="card-title text-center mb-4">{user.login}</h4>
        <Link to={"/profile/" + user.login} className="btn btn-warning mb-2">
          <strong>Открыть профиль</strong>
        </Link>
      </div>
    </div>
  );
};

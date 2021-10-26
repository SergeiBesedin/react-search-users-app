import React from "react";
import classes from "./repos.module.css";

export const Repos = ({ repos }) => {
  return (
    <ul className={classes.repos}>
      {repos.map((repo) => (
        <li key={repo.id}>
          <a href={repo.html_url}>{repo.name}</a>
        </li>
      ))}
    </ul>
  );
};

import React from "react";
import classes from "./loader.module.css";

export const Loader = () => {
  return (
    <div className={classes.loader}>
      <div className="spinner-border text-light" role="status"></div>
    </div>
  );
};

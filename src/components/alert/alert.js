import React, { useContext } from "react";
import { AlertContext } from "../../context/alert/alert-context";
import attention from "../../assets/attentionLogo.png";
import classes from "./alert.module.css";

export const Alert = () => {
  const { alert, hide } = useContext(AlertContext);

  if (!alert) return null;
  return (
    <div className={classes.alert}>
      <img src={attention} alt="attentionIcon" />
      <span>{alert.text}</span>
      <button
        type="button"
        className="btn-close shadow-none"
        aria-label="Close"
        onClick={hide}
      ></button>
    </div>
  );
};

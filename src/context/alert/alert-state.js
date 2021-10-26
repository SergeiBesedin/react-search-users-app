import React, { useReducer } from "react";
import { HIDE_ALERT, SHOW_ALERT } from "../types";
import { AlertContext } from "./alert-context";
import { alertReducer } from "./alert-reducer";

export const AlertState = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, null);

  const hide = () => dispatch({ type: HIDE_ALERT });
  const show = (text) => dispatch({ type: SHOW_ALERT, payload: { text } });

  return (
    <AlertContext.Provider value={{ hide, show, alert: state }}>
      {children}
    </AlertContext.Provider>
  );
};

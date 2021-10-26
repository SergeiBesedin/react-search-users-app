import React, { useState, useEffect } from "react";
import classes from "./scrollspy.module.css";
import arrow from "../../assets/whiteArrow.png";

export const Scrollspy = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollVisible = { display: "none" };

  if (scrollPosition > 900) {
    scrollVisible.display = "block";
  }

  const scrollUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      onClick={scrollUp}
      className={classes.scrollUp}
      style={scrollVisible}
    >
      <img src={arrow} alt="arrowIcon" />
      <span>Наверх к поиску</span>
    </button>
  );
};

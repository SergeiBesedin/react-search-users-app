import React, { useContext, useState, useEffect } from "react";
import { GithubContext } from "../../context/github/github-context";
import classes from "./pagination.module.css";
import arrow from "../../assets/blueArrow.png";

export const Pagination = () => {
  const {
    username,
    totalCountUsers,
    usersPerPage,
    currentPage,
    setCurrentPage,
    fetchUsers,
  } = useContext(GithubContext);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const [index, setIndex] = useState({ startIndex: 0, endIndex: 5 });

  useEffect(() => {
    setIndex({ startIndex: 0, endIndex: 5 });
  }, [username]);

  const totalPages = Math.ceil(totalCountUsers / usersPerPage);

  const pageСalculation = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.slice(index.startIndex, index.endIndex);
  };

  const paginate = (number) => {
    setCurrentPage(number);
    if (index.endIndex === number) {
      setIndex({
        ...index,
        startIndex: index.startIndex + 4,
        endIndex: index.endIndex + 4,
      });
    } else if (index.startIndex >= 4 && index.startIndex === number) {
      setIndex({
        ...index,
        startIndex: index.startIndex - 4,
        endIndex: index.endIndex - 4,
      });
    }
  };

  const clsPrevPage = [classes.pageNav, classes.prevPage];
  if (currentPage === 1) {
    clsPrevPage.push(classes.hide);
  }

  const clsNextPage = [classes.pageNav, classes.nextPage];
  if (currentPage === totalPages) {
    clsNextPage.push(classes.hide);
  }

  return (
    <nav>
      <ul className={classes.pagination}>
        <li className={clsPrevPage.join(" ")}>
          <span onClick={() => paginate(currentPage - 1)}>
            <img src={arrow} alt="arrowIcon" />
          </span>
        </li>
        <div>
          {pageСalculation().map((number) => {
            return (
              <li key={number}>
                <span
                  onClick={() => paginate(number)}
                  className={currentPage === number ? classes.activePage : null}
                >
                  {number}
                </span>
              </li>
            );
          })}
        </div>
        <li className={clsNextPage.join(" ")}>
          <span onClick={() => paginate(currentPage + 1)}>
            <img src={arrow} alt="arrowIcon" />
          </span>
        </li>
      </ul>
    </nav>
  );
};

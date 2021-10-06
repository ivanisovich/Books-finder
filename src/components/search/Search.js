import React, { useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../main.css";
import { getBooks } from "../../api/index";
import Sorting from "../sorting/Sorting";
import { Link } from "react-router-dom";
import { bookPageSearch, changeInput } from "./searchReducer";

const Search = () => {
  const input = useRef(null);

  const { value, start, step, category, sort } = useSelector(
    (state) => state.search
  );

  const dispatch = useDispatch();

  const focus = useCallback(() => input.current?.focus(), []);

  const handleChange = (e) => {
    dispatch(changeInput(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value !== "") {
      dispatch(getBooks(value, start, step, category, sort));
      dispatch(bookPageSearch(true));
      e.target[0].value = "";
    }
  };

  return (
    <div className="search">
      <Link id="link" to={{ pathname: "/" }}>
        {" "}
        <h1>Books filter</h1>
      </Link>
      <form onSubmit={handleSubmit} autoComplete="off" className="search__form">
        <div className="search__form">
          <input
            placeholder="harry potter philosopher's stone"
            className="search__input"
            label="Search"
            ref={input}
            onChange={handleChange}
          />
        </div>
        <button onClick={focus} id="search__button">
          Search
        </button>
      </form>

      <Sorting />
    </div>
  );
};

export default Search;

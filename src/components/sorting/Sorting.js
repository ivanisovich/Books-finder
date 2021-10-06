import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../main.css";
import { changeCategory, changeSort } from "../search/searchReducer";
import { getSortedBooks } from "../../api";
const Sorting = () => {
  const { value, start, step, category, sort } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(changeCategory(event.target.value));
  };

  const handleChangeSort = (event) => {
    dispatch(changeSort(event.target.value));
  };

  useEffect(() => {
    if (document.querySelectorAll(".book").length !== 0) {
      dispatch(getSortedBooks(value, start, step, category, sort));
    }
  }, [category, sort]);

  return (
    <div className="sorting">
      <select name="Category" onChange={handleChange} value={category}>
        <option value="all">all</option>
        <option value="art">art</option>
        <option value="biography">biography</option>
        <option value="computers">computers</option>
        <option value="history">history</option>
        <option value="medical">medical</option>
        <option value="poetry">poetry</option>
      </select>
      <select name="Sort by" onChange={handleChangeSort} value={sort}>
        <option value="relevance">relevance</option>
        <option value="newest">newest</option>
      </select>
    </div>
  );
};

export default Sorting;

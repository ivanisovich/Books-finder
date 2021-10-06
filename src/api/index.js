import axios from "axios";
import {
  startLoading,
  Error,
  Success,
  addMore,
  changeCategory,
  changeSort,
  getSort,
} from "../components/search/searchReducer";

const APIKEY = "AIzaSyAAtptyepjRcQnnn_hOpI2_jHOKoILlQtU";

export const getBooks =
  (value, start, step, category, sort) => async (dispatch) => {
    dispatch(startLoading());
    try {
      await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${value}+subject:${category}&orderBy=${sort}&key=${APIKEY}&startIndex=${start}&maxResults=${step}`
        )
        .then((response) => {
          dispatch(Success(response.data));
        });
    } catch (e) {}
  };

export const getMoreBooks = (value, start, step) => async (dispatch) => {
  dispatch(startLoading());
  try {
    await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${value}&key=${APIKEY}&startIndex=${start}&maxResults=${step}`
      )
      .then((response) => {
        dispatch(addMore(response.data));
      });
  } catch (e) {
    console.error(e.message);
    dispatch(Error(e.message));
  }
};

export const getSortedBooks =
  (value, start, step, category, sort) => async (dispatch) => {
    dispatch(startLoading());
    try {
      await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${value}+subject:${category}&orderBy=${sort}&key=${APIKEY}&startIndex=${start}&maxResults=${step}`
        )
        .then((response) => {
          dispatch(changeCategory(category));
          dispatch(changeSort(sort));
          dispatch(getSort(response.data));
        });
    } catch (e) {
      console.error(e.message);
      dispatch(Error(e.message));
    }
  };

import { createSlice } from "@reduxjs/toolkit";

const searchReducer = createSlice({
  name: "search",
  initialState: {
    value: "",
    books: [],
    loading: false,
    error: false,
    total: 0,
    start: 1,
    step: 30,
    category: "",
    sort: "relevance",
    visible: false,
    bookPageVisible: false,
  },
  reducers: {
    changeInput: (state, action) => {
      state.value = action.payload;
    },
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
    changeSort: (state, action) => {
      state.sort = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    Error: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    Success: (state, action) => {
      state.books = action.payload.items;
      state.total = action.payload.totalItems;
      state.loading = false;
      state.visible = true;
    },
    addMore: (state, action) => {
      state.start += 30;
      state.books = state.books.concat(action.payload.items);
      state.loading = false;
    },
    getSort: (state, action) => {
      state.books = action.payload.items;
      state.total = action.payload.totalItems;
      state.loading = false;
    },
    bookPageSearch: (state, action) => {
      state.bookPageVisible = action.payload;
    },
  },
});

export const {
  startLoading,
  Error,
  Success,
  changeInput,
  addMore,
  changeCategory,
  changeSort,
  getSort,
  bookPageSearch,
} = searchReducer.actions;
export default searchReducer.reducer;

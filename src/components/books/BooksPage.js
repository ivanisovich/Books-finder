import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../main.css";
import Spinner from "../spinner/Spinner";
import { getMoreBooks } from "../../api/index";
import { Link } from "react-router-dom";

const BooksPage = () => {
  const { value, start, step, books, total, loading, visible } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getMoreBooks();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {visible && !loading && <p className="total">Found: {total}</p>}

      {visible && (
        <>
          <div className="books">
            {books.map((book, key) => {
              let category = "";
              if (book.volumeInfo.categories) {
                category = book.volumeInfo.categories;
              }

              let authors = "";
              if (book.volumeInfo.authors) {
                authors = book.volumeInfo.authors;
              }

              let img = "";
              if (book.volumeInfo.imageLinks?.thumbnail) {
                img = book.volumeInfo.imageLinks?.thumbnail;
              }

              let description = "";
              if (book.volumeInfo.description) {
                description = book.volumeInfo.description;
              }
              return (
                <div className="book" key={book.id}>
                  <Link
                    className="book__link"
                    to={{
                      pathname: `/${book.id}`,
                      state: {
                        id: `${book.id}`,
                        img: `${img}`,
                        title: `${book.volumeInfo.title}`,
                        categories: `${category}`,
                        authors: `${authors}`,
                        desc: `${description}`,
                      },
                    }}
                  >
                    <img
                      src={
                        img !== ""
                          ? img
                          : "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
                      }
                      alt={book.volumeInfo.title}
                      className="book__img"
                    />
                    <div className="book__desc">
                      <p className="book__category">{category}</p>
                      <h3 className="book__title">{book.volumeInfo.title}</h3>
                      <p className="book__authors">{authors}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          {loading && <Spinner />}
        </>
      )}

      {!loading && visible && (
        <button
          onClick={() => dispatch(getMoreBooks(value, start, step))}
          id="load__button"
        >
          Load more
        </button>
      )}
    </>
  );
};

export default BooksPage;

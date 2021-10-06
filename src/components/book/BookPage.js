import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import "../main.css";
import { getMoreBooks } from "../../api/index";
import { Link } from "react-router-dom";
import { bookPageSearch } from "../search/searchReducer";

const BookPage = () => {
  const location = useLocation();
  const { value, start, step, books, total, loading, bookPageVisible } =
    useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    getMoreBooks();
  }, []);

  function handleClick() {
    var executed = false;
    return function () {
      if (!executed) {
        executed = true;
        dispatch(bookPageSearch(false));
      }
    };
  }

  return (
    <>
      <div className="bookPage" key={location.state.id}>
        <img
          src={location.state.img}
          alt={location.state.title}
          className="bookPage__img"
        />

        <div className="bookPage__desc">
          <p className="bookPage__category">{location.state.categories}</p>
          <h4 className="bookPage__title">{location.state.title}</h4>
          <p className="bookPage__authors">{location.state.authors}</p>
          {location.state.desc ? (
            <div className="book__text">{location.state.desc}</div>
          ) : (
            ""
          )}
        </div>
      </div>
      {bookPageVisible && (
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
                  onClick={handleClick()}
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
        
      )}
      {!loading && bookPageVisible && (
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

export default BookPage;

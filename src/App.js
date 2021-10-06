import Search from "./components/search/Search";
import BooksPage from "./components/books/BooksPage";
import BookPage from "./components/book/BookPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Search />
      <Switch>
        <Route exact path="/">
          <BooksPage />
        </Route>
        <Route exact path="/:bookId">
          <BookPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

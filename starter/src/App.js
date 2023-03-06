import "./App.css";
import { useEffect, useState } from "react";
import { getAll, update } from "./BooksAPI";
import Shelves from "./components/Shelves";
import SearchPage from "./components/SearchPage";
import { Link, NavLink } from "react-router-dom";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [fetchedBooks, setFetchedBooks] = useState([]);

  const changeShowSearchPage = () => setShowSearchpage(!showSearchPage);

  useEffect(() => {
    const getBooks = async () => {
      setFetchedBooks(await getAll());
      return () => { };
    };
    getBooks();
  }, []);

  const changeBookShelf = (book, shelf) => {
    update(book, shelf);
    if (shelf === "none") {
      setFetchedBooks(fetchedBooks.filter((bookItem) => bookItem.id !== book.id));
    } else {
      book.shelf = shelf;
      setFetchedBooks(
        fetchedBooks.filter((bookItem) => bookItem.id !== book.id).concat(book)
      );
    }
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchPage fetchedBooks={fetchedBooks} changeBookShelf={changeBookShelf} changeShowSearchPage={changeShowSearchPage} />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Shelves books={fetchedBooks} onShelfChange={changeBookShelf} />
          <div className="open-search">
            <NavLink to="/search" href="#search">

              <a onClick={changeShowSearchPage}>Add a book</a>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

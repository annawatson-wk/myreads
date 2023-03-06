import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";
import Book from "./Book";

const SearchPage = ({ fetchedBooks, changeBookShelf, changeShowSearchPage }) => {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const filterBooks = (response) => {
            return response && response.map((searchResultBook) => {
                const bookOnShelf = fetchedBooks.find((bookOnShelf) => bookOnShelf.id === searchResultBook.id)
                return bookOnShelf ? bookOnShelf : searchResultBook;
            })
        }
        
        const getBooks = async () => {
            try {
                const response = await search(query);
                setBooks(filterBooks(response));
            } catch (error) {
                console.log(error);
            }
            return () => { };
        };
        getBooks();
    }, [query]);


    return (
        <div className="search-books">
            <div className="search-books-bar">
            <Link href={"#/"} to="/">
                <a
                    className="close-search"
                    onClick={changeShowSearchPage}
                >
                    Close
                </a>
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or search term"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        books && books.length ? books.map((book) => (
                            <li key={book.id} className="contact-list-item">
                                <div>
                                    <Book
                                        key={book.id}
                                        book={book}
                                        onShelfChange={changeBookShelf}
                                    />
                                </div>
                            </li>
                        )) : (
                            <h2>No Books were found</h2>
                        )}
                </ol>
            </div>
        </div>
    );
};

export default SearchPage;
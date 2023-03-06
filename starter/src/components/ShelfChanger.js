import { useState } from "react";

const ShelfChanger = ({ book, onShelfChange }) => {
    const [shelf, setShelf] = useState(book.shelf ?? "none");

    const onSelectChange = (e) => {
		setShelf(e.target.value);
		onShelfChange(book, e.target.value);
	}

    return (
        <div className="book-shelf-changer">
            <select value={shelf} onChange={onSelectChange}>
                <option value="move" disabled>
                    Move to...
                </option>
                <option value="currentlyReading" >Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div >
    );
};

export default ShelfChanger;
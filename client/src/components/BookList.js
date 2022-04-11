import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from '../components/BookDetails';

const BookList = props => {
    const { loading, data } = useQuery(getBooksQuery);
    const { books } = data ?? [];

    const [detail, setDetail] = useState(null);

    return (
        <>
            {loading ? (
                <h3>loading...</h3>
            ) : (
                <>
                    <ul id="book-list">
                        {books &&
                            books.length &&
                            books.map(book => {
                                return (
                                    <li
                                        key={book.id}
                                        onClick={e => {
                                            setDetail(book.id);
                                        }}
                                    >
                                        <div className="book_title">
                                            {book.name}
                                        </div>

                                        <div className="book_author">
                                            {book.author.name}
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                    <BookDetails bookID={detail} />
                </>
            )}
        </>
    );
};

export default BookList;

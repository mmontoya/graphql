import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

const BookDetails = ({ bookID }) => {
    const { loading, data } = useQuery(getBookQuery, {
        variables: { id: bookID },
    });

    const displayBookDetails = () => {
        if (data && data.book && data.book.id) {
            return (
                <>
                    <div>
                        <div className="book_title">{data.book.name}</div>
                        <div className="book_genre">({data.book.genre})</div>
                        <div className="book_author">
                            {data.book.author.name}
                        </div>
                        {data.book &&
                            data.book.author &&
                            data.book.author.books.length && (
                                <>
                                    <div className="genre_heading">
                                        Other books:
                                    </div>
                                    {data.book.author.books.map((book) => (
                                        <div
                                            key={book.id}
                                            className="other_books"
                                        >
                                            {book.name}
                                        </div>
                                    ))}
                                </>
                            )}
                    </div>
                </>
            );
        } else {
            return <p>No book selected</p>;
        }
    };

    return (
        <div id="book-details">
            {loading ? <h3>loading...</h3> : displayBookDetails()}
        </div>
    );
};

export default BookDetails;

import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
    getAuthorsQuery,
    addBookMutation,
    getBooksQuery,
} from '../queries/queries';

const AddBook = props => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [author, setAuthor] = useState('default');

    const { loading: authorsLoading, data: authorsData } = useQuery(
        getAuthorsQuery,
    );
    const [addBook] = useMutation(addBookMutation, {
        name: name,
        genre: genre,
        author: author,
    });

    const displayAuthors = () => {
        if (authorsLoading) {
            return <option disabled>Loading Authors...</option>;
        } else {
            const authorsList =
                (authorsData &&
                    authorsData.authors.map(author => (
                        <option key={author.id} value={author.id}>
                            {author.name}
                        </option>
                    ))) ||
                [];

            return [
                <option key="0" value="default" disabled>
                    Select author...
                </option>,
                ...authorsList,
            ];
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Form submited', name, genre, author);
        addBook({
            variables: { name, genre, authorID: author },
            refetchQueries: [{ query: getBooksQuery }],
        });
        // Reset UI
        setName('');
        setGenre('');
        setAuthor('default');
    };
    return (
        <>
            <form id="add-book" onSubmit={e => handleSubmit(e)}>
                <div className="field">
                    <label>Book name</label>
                    <input
                        type="text"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div className="field">
                    <label>Genre</label>
                    <input
                        type="text"
                        onChange={e => setGenre(e.target.value)}
                        value={genre}
                    />
                </div>
                <div className="field">
                    <label>Author</label>
                    {authorsLoading ? (
                        <h3>loading...</h3>
                    ) : (
                        <select
                            onChange={e => setAuthor(e.target.value)}
                            value={author}
                        >
                            {displayAuthors()}
                        </select>
                    )}
                </div>

                <button type="submit">+</button>
            </form>
        </>
    );
};

export default AddBook;

import React from 'react';
import AddBook from './components/AddBook';
import BookList from './components/BookList';

function App() {
    return (
        <div id="main">
            <h1>My Book List</h1>
            <BookList />
            <AddBook />
        </div>
    );
}

export default App;

import { gql } from '@apollo/client';

export const getAuthorsQuery = gql`
    query getAuthors {
        authors {
            name
            id
        }
    }
`;

export const getBooksQuery = gql`
    query getBooks {
        books {
            name
            id
            genre
            author {
                name
            }
        }
    }
`;

export const addBookMutation = gql`
    mutation addBook($name: String!, $genre: String!, $authorID: ID!) {
        addBook(name: $name, genre: $genre, authorID: $authorID) {
            name
            author {
                name
            }
            genre
            id
        }
    }
`;

export const getBookQuery = gql`
    query getBook($id: ID) {
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;

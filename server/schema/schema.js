const graphql = require('graphql');
const Book = require('../models/Book');
const Author = require('../models/Author');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
} = graphql;

// dummy data
const books = [
    { name: 'Farenheit 451', genre: 'Sci-Fi', id: '1', authorID: '3' },
    { name: 'The Tombs of Atuan', genre: 'Fantasy', id: '2', authorID: '2' },
    { name: 'Solaris', genre: 'Sci-Fi', id: '3', authorID: '1' },
    { name: 'The Man From Mars', genre: 'Sci-Fi', id: '4', authorID: '1' },
    { name: 'The Hunt', genre: 'Sci-Fi', id: '5', authorID: '1' },
];

const authors = [
    { name: 'Stanislav Lem', age: 67, id: '1', books: ['3', '4', '5'] },
    { name: 'Ursula LeGuin', age: 89, id: '2', books: ['2'] },
    { name: 'Ray Bradburry', age: 67, id: '3', books: ['1'] },
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find((author) => {
                    return author.id === parent.authorID;
                });
            },
        },
    }),
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter((book) => {
                    return book.authorID === parent.id;
                });
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return books.find((book) => {
                    return book.id === args.id;
                });
            },
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return authors.find((author) => {
                    return author.id === args.id;
                });
            },
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => books,
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: (parent, args) => authors,
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age,
                });
                return author.save();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

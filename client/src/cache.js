import { InMemoryCache } from '@apollo/client';
export const cache = new InMemoryCache({});
/*
// Causes issues
typePolicies: {
    Author: {
        keyFields: ['name'],
    },
    Book: {
        keyFields: ['name', 'genre', 'author'],
    },
},

*/

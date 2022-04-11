const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

const { PORT, MONGODB_CONNECTION_URI } = process.env;

mongoose.connect(MONGODB_CONNECTION_URI);

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);

app.listen(PORT, () => {
    console.log(`now listening to requests on port ${PORT}...`);
});

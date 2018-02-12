import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

import UsersSchema from '../../api/users/User.graphql';
import UsersResolvers from '../../api/users/resolvers';

// hiss

const typeDefs = [UsersSchema];

const resolvers = merge(UsersResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });

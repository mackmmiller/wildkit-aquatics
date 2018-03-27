import { Mongo } from 'meteor/mongo';

export const Admins = new Mongo.Collection('admins');

export const Coaches = new Mongo.Collection('coaches');

export const Competitions = new Mongo.Collection('competitions');

export const Events = new Mongo.Collection('events');

export const Groups = new Mongo.Collection('groups');

export const Guardians = new Mongo.Collection('guardians');

export const Parents = new Mongo.Collection('parents');

export const Practices = new Mongo.Collection('practices');

export const Results = new Mongo.Collection('results');

export const Swimmers = new Mongo.Collection('swimmers');

export const Teams = new Mongo.Collection('teams');

// No users collection, handled by Meteor

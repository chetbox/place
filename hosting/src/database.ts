import firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp({
  apiKey: 'AIzaSyB_cFn_nQlA5R9_yK7jz0yOjn4MtC6tDy4',
  authDomain: 'place-6ebc8.firebaseapp.com',
  databaseURL: 'https://place-6ebc8.firebaseio.com',
  projectId: 'place-6ebc8',
  storageBucket: 'place-6ebc8.appspot.com',
  messagingSenderId: '467598771690',
});

const database = firebase.app().database();

export default database;

export type Database = firebase.database.Database;
export type DataSnapshot = firebase.database.DataSnapshot;

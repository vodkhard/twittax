import firebase from 'firebase/app';
import 'firebase/database';
import config from './config';

firebase.initializeApp(config);

const database = firebase.database();

export default database;

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import config from './config';

firebase.initializeApp(config);

firebase.firestore().enablePersistence();
export const fieldValue = firebase.firestore.FieldValue;
export const firestore = firebase.firestore();
export const fireauth = firebase.auth();
export const firestorage = firebase.storage();

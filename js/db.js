import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import config from './config';

firebase.initializeApp(config);

firebase.firestore().enablePersistence();
export const firestore = firebase.firestore();
export const fireauth = firebase.auth();

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
const fieldValue = admin.firestore.FieldValue;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

exports.addFeed = functions.firestore.document('/twaats/{twaatId}').onCreate(
  (snap) => {
    const twaatRef = snap.ref;
    snap.data().author.get().then((authorRef) => {
      const { followers } = authorRef.data();
      twaatRef.update({
        subscribers: fieldValue.arrayUnion(snap.data().author, ...followers),
      });
    });
  },
);

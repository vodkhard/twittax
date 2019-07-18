const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
const fieldValue = admin.firestore.FieldValue;

exports.onFollow = functions.firestore
  .document('/users/{userId}/followers/{followerId}')
  .onCreate((snapshot, context) => {
    const { userId } = context.params;
    const currentUser = snapshot.data().ref;
    return currentUser.collection('followed')
      .add({
        ref: db.collection('users').doc(userId),
        created_at: fieldValue.serverTimestamp(),
      });
  });

const getFolloweddByUserId = (id, currentUser) => currentUser.collection('followed')
  .where('ref', '==', db.collection('users').doc(id))
  .get()
  .then((snapshot) => {
    const { docs } = snapshot;
    if (docs.length > 0) {
      const item = docs[0];
      return item.id;
    }
    return null;
  });

exports.onUnfollow = functions.firestore
  .document('/users/{userId}/followers/{followerId}')
  .onDelete(async (snapshot, context) => {
    const { userId } = context.params;
    const currentUser = snapshot.data().ref;
    return currentUser.collection('followed').doc(await getFolloweddByUserId(userId, currentUser))
      .delete();
  });

exports.addFeed = functions.firestore.document('/twaats/{twaatId}').onCreate(
  (snap) => {
    const twaatRef = snap.ref;
    const { author, parent } = snap.data();
    if (parent) {
      parent.get().then((parentRef) => {
        twaatRef.update({
          subscribers: fieldValue.arrayUnion(parentRef.data().author),
        });
      });
    }
    author.get().then((authorRef) => {
      const { followers } = authorRef.data();
      twaatRef.update({
        subscribers: fieldValue.arrayUnion(author, ...followers),
      });
    });
  },
);

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const thumbnail = require('./src/thumbnail');
const follow = require('./src/follow');
const feed = require('./src/feed');

admin.initializeApp();
const db = admin.firestore();
const fieldValue = admin.firestore.FieldValue;

exports.onFollow = functions.region('europe-west1').firestore
  .document('/users/{userId}/followers/{followerId}')
  .onCreate(snapshot => follow.onFollow(snapshot, fieldValue));

exports.onFollowSubscribe = functions.region('europe-west1').firestore
  .document('/users/{userId}/followers/{followerId}')
  .onCreate((snapshot, context) => follow.onFollowSubscribe(snapshot, context, db, fieldValue));

exports.onUnfollow = functions.region('europe-west1').firestore
  .document('/users/{userId}/followers/{followerId}')
  .onDelete((snapshot, context) => follow.onUnfollow(snapshot, context));

exports.onUnfollowUnsubscribe = functions.region('europe-west1').firestore
  .document('/users/{userId}/followers/{followerId}')
  .onDelete((snapshot, context) => follow.onUnfollowUnsubscribe(snapshot, context, db, fieldValue));

exports.addFeed = functions.region('europe-west1').firestore.document('/twaats/{twaatId}').onCreate(snap => feed.addFeed(snap, fieldValue));

exports.generateThumbnail = functions.region('europe-west1').storage.object().onFinalize(
  object => thumbnail.handler(object),
);

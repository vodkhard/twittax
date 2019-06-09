import { firestore, fireauth, serverTimestamp } from '../../db';

const get = id => firestore.collection('twaats').doc(id);

const add = payload => firestore.collection('twaats').add({
  ...payload,
  author: firestore.collection('users').doc(fireauth.currentUser.uid),
  date: serverTimestamp,
});

const update = (id, payload) => firestore
  .collection('twaats')
  .doc(id)
  .update(payload);

const del = id => firestore
  .collection('twaats')
  .doc(id)
  .delete();

export default {
  get,
  add,
  update,
  del,
};

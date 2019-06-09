import { firestore, fireauth } from '../../db';

const get = id => firestore.collection('twaats').doc(id);

const add = payload => firestore.collection('twaats').add(payload);

const update = (id, payload) => firestore
  .collection('twaats')
  .doc(id)
  .update({
    ...payload,
    author: firestore.collection('users').doc(fireauth.currentUser.uid),
    date: firestore.Timestamp.now().toMillis(),
  });

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

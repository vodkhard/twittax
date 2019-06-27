import { firestore, fireauth, fieldValue } from '../../db';
const collection = "twaats";

const get = id => firestore.collection('twaats').doc(id);

const add = payload => firestore.collection('twaats').add({
  ...payload,
  author: firestore.collection('users').doc(fireauth.currentUser.uid),
  createdAt: fieldValue.serverTimestamp(),
});

const update = (id, payload) => firestore
  .collection('twaats')
  .doc(id)
  .update({
    ...payload,
    updatedAt: fieldValue.serverTimestamp(),
  });

const del = id => firestore
  .collection('twaats')
  .doc(id)
  .delete();

const addLaaked = id => firestore.collection(collection)
  .doc(id)
  .update({
    laaks: fieldValue.arrayUnion(fireauth.currentUser.uid),
  });

const delLaaked = id => firestore.collection(collection)
  .doc(id)
  .update({
    laaks: fieldValue.arrayRemove(fireauth.currentUser.uid),
  });

const hasUserLaaked = id => firestore.collection(collection)
  .doc(id)
  .get().then(twaat => twaat.data().laaks.includes(fireauth.currentUser.uid));

const isLaaked = id => firestore.collection(collection)
  .doc(fireauth.currentUser.uid)
  .get().then(user => user.data().laaks.includes(id));

export default {
  get,
  add,
  update,
  del,
  addLaaked,
  delLaaked,
  isLaaked,
  hasUserLaaked
};

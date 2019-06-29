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
    laaks: fieldValue.arrayUnion(firestore.collection('users').doc(fireauth.currentUser.uid)),
  });

const delLaaked = async id => firestore.collection(collection)
  .doc(id)
  .update({
    laaks: fieldValue.arrayRemove(await firestore.collection('users').doc(fireauth.currentUser.uid)),
  });

const hasUserLaaked = id => firestore.collection(collection)
  .doc(id)
  .get().then(twaat =>
    twaat.data().laaks.find(
      value => value.isEqual(firestore.collection('users').doc(fireauth.currentUser.uid))
  ));

const addRetwaat = id => firestore.collection(collection)
  .doc(id)
  .update({
    retwaats: fieldValue.arrayUnion(firestore.collection('users').doc(fireauth.currentUser.uid)),
  });

const delRetwaat = child =>
  child
  .update({
    retwaats: fieldValue.arrayRemove(firestore.collection('users').doc(fireauth.currentUser.uid)),
  });

const hasUserRetwaat = id => firestore.collection(collection)
  .doc(id)
  .get().then(twaat =>
    twaat.data().retwaats.find(
      value => value.isEqual(firestore.collection('users').doc(fireauth.currentUser.uid))
  ));

export default {
  get,
  add,
  update,
  del,
  addLaaked,
  delLaaked,
  hasUserLaaked,
  addRetwaat,
  delRetwaat,
  hasUserRetwaat
};

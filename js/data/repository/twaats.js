import { firestore, fireauth, fieldValue } from '../../db';

const collection = 'twaats';

const get = id => firestore.collection(collection).doc(id);

const add = (payload) => {
  const tags = [...payload.content.matchAll(/\B\#\w+/gm)].map(([match]) => match);

  return firestore.collection(collection).add({
    ...payload,
    laaks: [],
    retwaats: [],
    tags: tags || [],
    author: firestore.collection('users').doc(fireauth.currentUser.uid),
    createdAt: fieldValue.serverTimestamp(),
  });
};

const update = (id, payload) => firestore
  .collection(collection)
  .doc(id)
  .update({
    ...payload,
    updatedAt: fieldValue.serverTimestamp(),
  });

const del = id => firestore
  .collection(collection)
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
  .get().then(twaat => twaat.data().laaks.find(
    value => value.isEqual(firestore.collection('users').doc(fireauth.currentUser.uid)),
  ));

const addRetwaat = id => firestore.collection(collection)
  .doc(id)
  .update({
    retwaats: fieldValue.arrayUnion(firestore.collection('users').doc(fireauth.currentUser.uid)),
  });

const unretwaat = child => child
  .update({
    retwaats: fieldValue.arrayRemove(firestore.collection('users').doc(fireauth.currentUser.uid)),
  });

const hasUserRetwaat = id => firestore.collection(collection)
  .doc(id)
  .get().then(twaat => twaat.data().retwaats.find(
    value => value.isEqual(firestore.collection('users').doc(fireauth.currentUser.uid)),
  ) || false);

export default {
  get,
  add,
  update,
  del,
  addLaaked,
  delLaaked,
  hasUserLaaked,
  addRetwaat,
  unretwaat,
  hasUserRetwaat,
};

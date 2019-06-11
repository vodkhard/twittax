import { firestore, fireauth, fieldValue } from '../../db';

const collection = 'users';

const get = id => firestore.collection(collection).doc(id);

const getByName = name => firestore
  .collection(collection)
  .where('name', '==', name)
  .get()
  .then((snapshot) => {
    const { docs } = snapshot;
    if (docs.length > 0) {
      const item = docs[0];
      return {
        id: item.id,
        ...item.data(),
      };
    }
    return null;
  });

const add = payload => firestore.collection(collection).add({
  ...payload,
  author: firestore.collection('users').doc(fireauth.currentUser.uid),
  createdAt: fieldValue.serverTimestamp(),
});

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

export default {
  getByName,
  get,
  add,
  update,
  del,
};

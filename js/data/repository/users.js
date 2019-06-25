import { firestore, fireauth, fieldValue } from '../../db';

const collection = 'users';

const getCurrentUser = () => firestore.collection(collection)
  .doc(fireauth.currentUser.uid);

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

const addFollowed = id => getCurrentUser()
  .update({
    followed: fieldValue.arrayUnion(get(id)),
  });

const addFollower = id => firestore.collection(collection)
  .doc(id)
  .update({
    followers: fieldValue.arrayUnion(getCurrentUser()),
  });

const delFollowed = id => getCurrentUser()
  .update({
    followed: fieldValue.arrayRemove(get(id)),
  });

const delFollower = id => get(id)
  .update({
    followers: fieldValue.arrayRemove(getCurrentUser()),
  });

const isFollowing = id => new Promise((resolve, reject) => getCurrentUser().get()
  .then((user) => {
    resolve(user.data().followed.includes(id));
  }).catch(err => reject(err)));

const toggleFollow = (id, followed) => {
  if (followed) {
    delFollowed(id);
    delFollower(id);
    return false;
  }
  addFollowed(id);
  addFollower(id);
  return true;
};

export default {
  getByName,
  get,
  add,
  update,
  del,
  isFollowing,
  toggleFollow,
};

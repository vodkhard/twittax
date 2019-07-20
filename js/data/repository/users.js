import { firestore, fireauth, fieldValue } from '../../db';

const collection = 'users';

const getCurrentUser = () => firestore.collection(collection)
  .doc(fireauth.currentUser.uid);

const get = id => firestore.collection(collection).doc(id);

const getFollowerIdByUserId = async id => firestore.collection(collection)
  .doc(id).collection('followers')
  .where('ref', '==', getCurrentUser())
  .get()
  .then((snapshot) => {
    const { docs } = snapshot;
    if (docs.length > 0) {
      const item = docs[0];
      return item.id;
    }
    return null;
  });

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

const addFollower = id => firestore.collection(collection)
  .doc(id).collection('followers')
  .add({
    ref: getCurrentUser(),
    created_at: fieldValue.serverTimestamp(),
  });

const delFollower = async id => get(id).collection('followers').doc(await getFollowerIdByUserId(id)).delete();

const toggleFollow = (id, followed) => {
  if (followed) {
    delFollower(id);
    return false;
  }
  addFollower(id);
  return true;
};

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
  getByName,
  getCurrentUser,
  get,
  add,
  update,
  del,
  isFollowing: getFollowerIdByUserId,
  toggleFollow,
  addLaaked,
  delLaaked,
  addRetwaat,
  unretwaat,
  hasUserRetwaat,
};

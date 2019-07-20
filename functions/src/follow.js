exports.onFollow = (snapshot, fieldValue) => {
  const follower = snapshot.data().ref;
  return follower.collection('followed').add({
    ref: snapshot.ref.parent.parent,
    createdAt: fieldValue.serverTimestamp(),
  });
};

exports.onFollowSubscribe = (snapshot, context, firestore, fieldValue) => {
  const { userId } = context.params;
  const follower = snapshot.data().ref;
  firestore.collection('twaats')
    .where('author', '==', firestore.collection('users').doc(userId))
    .get()
    .then(({ docs }) => {
      docs.forEach((twaat) => {
        twaat.ref.update({
          subscribers: fieldValue.arrayUnion(follower),
        });
      });
    });
};

exports.onUnfollow = async (snapshot, context) => {
  const { userId } = context.params;
  const currentUser = snapshot.data().ref;
  return currentUser.collection('followed').doc(userId)
    .delete();
};

exports.onUnfollowUnsubscribe = async (snapshot, context, firestore, fieldValue) => {
  const { userId } = context.params;
  const currentUser = snapshot.data().ref;

  firestore.collection('twaats')
    .where('author', '==', firestore.collection('users').doc(userId))
    .get()
    .then(({ docs }) => {
      docs.forEach((twaat) => {
        twaat.ref.update({
          subscribers: fieldValue.arrayRemove(currentUser),
        });
      });
    });
};

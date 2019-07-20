exports.onFollow = (snapshot, fieldValue) => {
  const follower = snapshot.data().ref;
  return follower.collection('followed').add({
    ref: snapshot.ref.parent.parent,
    createdAt: fieldValue.serverTimestamp(),
  });
};

exports.onUnfollow = async (snapshot, context) => {
  const { userId } = context.params;
  const currentUser = snapshot.data().ref;
  return currentUser.collection('followed').doc(userId)
    .delete();
};

exports.addFeed = (snap, fieldValue) => {
  const twaatRef = snap.ref;
  const { author, parent } = snap.data();
  if (parent) {
    parent.get().then((parentRef) => {
      twaatRef.update({
        subscribers: fieldValue.arrayUnion(parentRef.data().author),
      });
    });
  }
  author.collection('followers').get().then(({ docs }) => {
    twaatRef.update({
      subscribers: fieldValue.arrayUnion(...docs.map(d => d.data().ref)),
    });
  });
};

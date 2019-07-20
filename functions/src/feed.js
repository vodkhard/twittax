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
  author.get().then((authorRef) => {
    const { followers } = authorRef.data();
    twaatRef.update({
      subscribers: fieldValue.arrayUnion(author, ...followers),
    });
  });
}
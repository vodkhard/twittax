const subscribeNotification = () => {
  if (('serviceWorker' in navigator) || ('PushManager' in window)) {
    Notification.requestPermission()
      .then((result) => {
        switch (result) {
          case 'default':
            console.log('Permission request dismissed');
            break;
          case 'denied':
            console.log('Permission wasn\'t granted. Allow a retry');
            break;
          default:
            console.log('Notification granted', result);
        }
      });
  }
};

export default subscribeNotification;

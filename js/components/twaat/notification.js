export const notification = (content) => {
  if (Notification.permission === 'granted') {
    const notif = new Notification('Twittax', {
      icon: '/assets/logo.png',
      body: `${content}`,
    });
    setTimeout(notif.close, 5000);
  }
};


export const subscribeNotification = () => {
  if (('serviceWorker' in navigator) || ('PushManager' in window)) {
    Notification.requestPermission()
      .then((result) => {
        switch (result) {
          case 'granted':
            console.log('Notification granted');
            break;
          case 'denied':
            console.log('Permission wasn\'t granted. Allow a retry');
            break;
          default:
            console.log('Permission request dismissed by default');
        }
      });
  }
};

export default { subscribeNotification, notification };

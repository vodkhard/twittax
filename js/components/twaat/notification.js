export const notification = (content) => {
  if (Notification.permission === 'granted') {
    const notif = new Notification('Twittax', {
      icon: '/assets/logo.png',
      body: `${content}`,
    });
    setTimeout(notif.close, 5000);
  }
};

export default notification;

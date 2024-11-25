importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDPBVznrVUXcLFsBcK78daEObcfQjZoBSY",
  authDomain: "chessa-f2943.firebaseapp.com",
  projectId: "chessa-f2943",
  storageBucket: "chessa-f2943.appspot.com",
  messagingSenderId: "686757224967",
  appId: "1:686757224967:web:cddc0bc5bffe8fa93400a2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Recibido mensaje en segundo plano:', payload);

  const notificationTitle = payload.notification.title || 'Notificación';
  const notificationOptions = {
    body: payload.notification.body || 'Tienes un nuevo mensaje.',
    icon: payload.notification.icon || '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

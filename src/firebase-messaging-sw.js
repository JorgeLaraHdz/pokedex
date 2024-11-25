importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

// Configuración de Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDPBVznrVUXcLFsBcK78daEObcfQjZoBSY",
  authDomain: "chessa-f2943.firebaseapp.com",
  projectId: "chessa-f2943",
  storageBucket: "chessa-f2943.appspot.com",
  messagingSenderId: "686757224967",
  appId: "1:686757224967:web:cddc0bc5bffe8fa93400a2"
});

// Inicialización de Firebase Messaging
const messaging = firebase.messaging();

// Manejar mensajes en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Recibido mensaje en segundo plano:', payload);

  const notificationTitle = payload.notification?.title || 'Notificación';
  const notificationOptions = {
    body: payload.notification?.body || 'Tienes un nuevo mensaje.',
    icon: payload.notification?.icon || './assets/pokeball.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Opcional: Manejar clics en las notificaciones
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notificación clickeada:', event);
  event.notification.close();

  // Abrir la URL especificada en la notificación o el sitio principal
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      } else {
        return clients.openWindow('/'); // Cambia '/' por la URL deseada
      }
    })
  );
});

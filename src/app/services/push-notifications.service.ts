import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase-config'; // Asegúrate de que esta es la configuración correcta

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  constructor() {}

  // Solicitar permiso para notificaciones y obtener el token
  requestPermission() {
    if (Notification.permission === 'granted') {
      console.log('Permiso para notificaciones ya otorgado');
      this.getTokenAndListenForMessages();
      return;
    }

    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Permiso otorgado');
        this.getTokenAndListenForMessages();
      } else {
        console.log('Permiso denegado');
      }
    }).catch(err => {
      console.error('Error al solicitar permiso de notificación:', err);
    });
  }

  // Obtener el token de notificación y configurar el listener
  private getTokenAndListenForMessages() {
    const messagingInstance = getMessaging();
    getToken(messagingInstance, {
      vapidKey: 'BOYwDA_9cwajRKrwKH1mE7HCXTI8uCor8WVhvoYJV_9DS_z_pxDMp39ALzVDWqtt5Gw1ocdw7vuFVLH2G7TkAs0'
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Token recibido:', currentToken);
          // Envía el token al backend si es necesario
        } else {
          console.warn('No se pudo obtener el token');
        }
      })
      .catch((err) => {
        console.error('Error al obtener el token:', err);
      });

    // Escucha mensajes en primer plano
    this.listenForMessages(messagingInstance);
  }

  // Escuchar mensajes en primer plano
  private listenForMessages(messagingInstance: any) {
    onMessage(messagingInstance, (payload) => {
      console.log('Mensaje recibido en primer plano:', payload);
      this.showLocalNotification(payload);
    });
  }

  // Mostrar notificaciones locales
  private showLocalNotification(payload: any) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = payload.notification.title || 'Nueva Notificación';
      const body = payload.notification.body || 'Has recibido un mensaje';
      const icon = payload.notification.icon || '/assets/icon/favicon.ico';

      new Notification(title, {
        body: body,
        icon: icon,
      });
    }
  }
}

import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { messaging } from './firebase-config'; // Importamos la instancia de Messaging

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  private messagingInstance: Messaging = messaging;

  constructor() {}

  /**
   * Solicitar permiso para recibir notificaciones y obtener el token
   */
  requestPermission() {
    if (Notification.permission === 'granted') {
      this.getTokenAndListenForMessages();
    } else {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
            console.log('Permiso otorgado');
            this.getTokenAndListenForMessages();
          } else {
            console.warn('Permiso denegado para notificaciones.');
          }
        })
        .catch((error) => {
          console.error('Error al solicitar permiso de notificación:', error);
        });
    }
  }

  /**
   * Obtener el token del dispositivo y configurar el listener para mensajes en primer plano
   */
  private getTokenAndListenForMessages() {
    getToken(this.messagingInstance, {
      vapidKey: 'BOYwDA_9cwajRKrwKH1mE7HCXTI8uCor8WVhvoYJV_9DS_z_pxDMp39ALzVDWqtt5Gw1ocdw7vuFVLH2G7TkAs0',
    })
      .then((currentToken) => {
        if (currentToken) {
        } else {
          console.warn('No se pudo obtener el token. Asegúrate de que las configuraciones son correctas.');
        }
      })
      .catch((error) => {
        console.error('Error al obtener el token:', error);
      });

    this.listenForMessages();
  }

  private listenForMessages() {
    onMessage(this.messagingInstance, (payload) => {
      //this.showLocalNotification(payload);
    });
  }

  /**
   * Mostrar notificación local en el navegador
   */
  showLocalNotification(payload:any) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = payload.title;
      const body = payload.body;
      const icon = './../../assets/icons/icon-512.webp';

      new Notification(title, {
        body,
        icon,
      });
    }
  }
}

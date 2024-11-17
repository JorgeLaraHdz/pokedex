import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { firebaseConfig } from './firebase-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth(initializeApp(firebaseConfig));

  constructor() {
    // Configurar persistencia de sesión (puedes cambiar a `browserSessionPersistence` si deseas eliminar al cerrar el navegador)
    setPersistence(this.auth, browserLocalPersistence).catch((err) => {
      console.error('Error configurando persistencia:', err);
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hora de duración
      localStorage.setItem('sessionExpiration', expirationTime.toString());
      return userCredential;
    });
  }
  
  isSessionValid(): boolean {
    const expirationTime = localStorage.getItem('sessionExpiration');
    if (expirationTime) {
      return Date.now() < parseInt(expirationTime, 10);
    }
    return false;
  }
  

  logout() {
    localStorage.removeItem('sessionExpiration'); // Limpia la expiración
    return this.auth.signOut();
  }
  

  getAuthInstance() {
    return this.auth;
  }
}

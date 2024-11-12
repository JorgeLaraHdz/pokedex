// auth.service.ts
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, Auth } from 'firebase/auth';
import { firebaseConfig } from './firebase-config'; // Importa tu configuración de Firebase desde otro archivo

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth;

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}

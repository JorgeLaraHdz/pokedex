import { OnInit } from '@angular/core';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { PushNotificationService } from 'src/app/services/push-notifications.service';
import {
  IonRefresher,
  IonRefresherContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonCardContent,
  IonSearchbar,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle, IonText
} from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonRefresher, IonRefresherContent, IonText, IonCardContent,
    IonLabel,
    IonItem,
    IonInput,
    IonSearchbar,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    ReactiveFormsModule]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLogin: boolean = true;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private alertController: AlertController, private pushis:PushNotificationService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    
   }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.loginForm.reset();  // Reseteamos el formulario al cambiar entre login y registro
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (this.isLogin) {
        // Si estamos en login, llamamos al método de login
        this.authService.login(email, password)
          .then((userCredential) => {
            this.pushis.showLocalNotification({title:"Login Exitoso", body:"Disfruta tu pokedex"});
            console.log('Login exitoso:', userCredential);
            this.router.navigate(['tabs/tab1']); // Redirige al usuario
          })
          .catch((error) => {
            this.mostrarAlerta('Error al iniciar sesión', error.message);
            console.error('Error de inicio de sesión:', error.message);
          });
      } else {
        // Si estamos en registro, llamamos al método de registro
        this.authService.register(email, password)
          .then((userCredential) => {
            console.log('Registro exitoso:', userCredential);
            this.mostrarAlerta('Aviso', 'Registro exitoso');
            this.router.navigate(['tabs/tab1']); // Redirige al usuario
          })
          .catch((error) => {
            this.mostrarAlerta('Error al registrarse', error.message);
            console.error('Error de registro:', error.message);
          });
      }
    }
  }

  // Función para mostrar una alerta de error
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      window.location.reload();
      event.target.complete();
    }, 1000);
  }
}

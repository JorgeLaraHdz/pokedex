import { OnInit } from '@angular/core';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import {
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
  IonCardSubtitle, IonText } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonText, IonCardContent,
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

  constructor(private fb: FormBuilder, private router:Router, private authService: AuthService, private alertController: AlertController) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() { }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Llama al servicio de autenticación
      this.authService.login(email, password)
        .then((userCredential) => {
          console.log('Login exitoso:', userCredential);
          this.router.navigate(['tabs/tab1']); // Redirige al usuario
        })
        .catch((error) => {
          this.mostrarAlerta();
          console.error('Error de inicio de sesión:', error.message);
        });
    }
  }
  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Tus credenciales no son validas',
      buttons: [
        {
          text: 'Volver',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }
  onRegister() {
    // Redirigir a la página de registro
  }
}

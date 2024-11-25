import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { PushNotificationService } from './services/push-notifications.service';
import { getMessaging } from 'firebase/messaging'; // Importa getMessaging

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private pushNotificationService: PushNotificationService
  ) {
    // Solicitar permiso para las notificaciones
  }

  ngOnInit() {
    setInterval(() => {
      if (!this.authService.isSessionValid()) {
        this.authService.logout().then(() => {
          this.router.navigate(['/login']);
        });
      }
    }, 1000);    
  }
}

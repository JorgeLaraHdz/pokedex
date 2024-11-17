import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    setInterval(() => {
      if (!this.authService.isSessionValid()) {
        this.authService.logout().then(() => {
          this.router.navigate(['/login']);
        });
      }
    }, 1000); // Verificar cada segundo
  }
}

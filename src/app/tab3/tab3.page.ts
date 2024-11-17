import { Component, OnInit } from '@angular/core';
import { IonAlert, IonButton, IonIcon,IonButtons,IonRefresher, IonRefresherContent, IonCardContent,IonCardTitle,IonCardSubtitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/angular/standalone';
import { getAuth } from 'firebase/auth';
import { FavoritesService } from '../services/favorites.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonAlert, IonButton, IonIcon,IonButtons, IonRefresher, IonRefresherContent, CommonModule, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonLabel],
})
export class Tab3Page implements OnInit {
  user: any = null;
  favorites: any[] = [];

  constructor(private favoritesService: FavoritesService, 
    private router:Router,
    private auth:AuthService) {}

  ngOnInit() {
    this.loadUserData();
    this.loadFavorites();
  }

  // Cargar datos del usuario autenticado
  loadUserData() {
    const auth = getAuth();
    this.user = auth.currentUser;
  }

  // Cargar la lista de favoritos del usuario
  async loadFavorites() {
    try {
      this.favorites = await this.favoritesService.getFavorites();
      console.log(this.favorites)
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    }
  }
  onClick(id:any){
    this.router.navigate(['tuPokemon',id]);
  }
  handleRefresh(event:any) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  isAlertOpen = false;
  alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Operación cancelada');
      },
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => {
        this.logout();
      },
    },
  ];
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  logout(){
    this.auth.logout();
  }
}

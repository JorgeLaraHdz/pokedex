import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeapiService } from 'src/app/services/pokeapi.service';
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
  IonCardSubtitle, IonText, 
  IonButtons, IonBackButton, IonIcon, IonFab, IonFabButton} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { heart, heartOutline, add } from 'ionicons/icons';
import { FavoritesService } from 'src/app/services/favorites.service';
import { PushNotificationService } from 'src/app/services/push-notifications.service';
@Component({
  selector: 'app-view-pokemon',
  standalone:true,
  templateUrl: './view-pokemon.component.html',
  styleUrls: ['./view-pokemon.component.scss'],
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
    IonButton, IonButtons, IonBackButton, IonIcon, CommonModule, IonFab, IonFabButton]
})
export class ViewPokemonComponent  implements OnInit {

  constructor(private route:ActivatedRoute, 
    private poki:PokeapiService, 
    private router:Router,
    private favoritesService: FavoritesService,
    private pushis:PushNotificationService
  ) { 
    addIcons({ heart, 'heart-outline': heartOutline, add });
  }
  id:any
  data:any
  abilities: string = '';
  isFavorite: boolean = false;

  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id==null || undefined){
      this.router.navigate(['tabs/tab2']);
    }else{
      this.poki.getPokemon(this.id).subscribe((res:any)=>{
        this.data=res;
        this.abilities=res.abilities.map((ability:any)=> ability.ability.name).join(', ');
        this.favoritesService.isFavorite(this.id).then((isFav) => {
          this.isFavorite = isFav;
        });
      })
    }
    
  }
  toggleFavorite() {
    if (this.isFavorite) {
      // Eliminar de favoritos
      this.favoritesService
        .removeFavorite(this.id)
        .then(() => {
          this.isFavorite = false;
          this.pushis.showLocalNotification({title:"Eliminado", body:"Pokémon eliminado de favoritos"});
        })
        .catch((error) => console.error('Error al eliminar de favoritos:', error));
    } else {
      // Agregar a favoritos
      this.favoritesService
        .addFavorite({
          id: this.id,
          name: this.data.name,
          type: this.data.types[0]?.type.name,
          weight: this.data.weight,
          height: this.data.height,
          abilities: this.abilities,
          image: this.data.sprites?.other?.['official-artwork']?.front_default,
        })
        .then(() => {
          this.isFavorite = true;
          this.pushis.showLocalNotification({title:"Añadido", body:"Pokémon añadido a favoritos"});
        })
        .catch((error) => console.error('Error al añadir a favoritos:', error));
    }
  }

}

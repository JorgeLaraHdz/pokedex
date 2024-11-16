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
  IonButtons, IonBackButton, IonIcon} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';
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
    IonButton, IonButtons, IonBackButton, IonIcon, CommonModule]
})
export class ViewPokemonComponent  implements OnInit {

  constructor(private route:ActivatedRoute, private poki:PokeapiService, private router:Router) { 
    addIcons({heart, heartOutline});
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
        console.log(this.abilities)
      })
    }
    
  }
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

}

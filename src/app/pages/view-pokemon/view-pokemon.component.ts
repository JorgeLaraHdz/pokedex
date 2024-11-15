import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  IonButtons, IonBackButton} from '@ionic/angular/standalone';
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
    IonButton, IonButtons, IonBackButton]
})
export class ViewPokemonComponent  implements OnInit {

  constructor(private route:ActivatedRoute) { }
  id:any
  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }

}

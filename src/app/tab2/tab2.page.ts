import { Component } from '@angular/core';
import { IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonCardContent, IonCard, IonCardHeader,IonCardTitle,IonCardSubtitle, IonItem, IonList, LoadingController } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { PokeapiService } from '../services/pokeapi.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { eye, eyeOff } from 'ionicons/icons';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon,IonList, IonItem, IonCardContent, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle, CommonModule, FormsModule]
})
export class Tab2Page {
  showRandom:boolean=true
  query: string = '';
  suggestions: any[] = [];
  data:any
  searchedPokemon:any

  constructor(private poki:PokeapiService, private loading:LoadingController) {
    addIcons({eye});
  }
  ngOnInit(): void {
    this.poki.getPokemon(this.getRandomPokemon()).subscribe((res:any)=>{
      this.data=res;
      console.log(this.data)
    })
  }
  async presentLoading() {
    const loading = await this.loading.create({
      message: 'Cargando...',
      duration: 1500, // Duración en milisegundos
      cssClass: 'custom-loading'
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  getRandomPokemon(){
    return Math.floor(Math.random() * 1025) + 1;
  }
  onSearchChange(event: any) {
    this.query = event.detail.value;

    if (this.query.length > 1) { // Inicia la búsqueda solo si hay más de 1 caracter
      this.poki.searchPokemon(this.query).subscribe(data => {
        this.suggestions = data;
      });
    } else {
      this.suggestions = [];
    }
  }
  async onSuggestionClick(pokemonName: string) {
    this.showRandom=false
    await this.presentLoading()
    this.query = pokemonName;  // Autocompleta el searchbar
    this.suggestions = [];     // Limpia las sugerencias
    this.poki.getPokemonByName(pokemonName).subscribe((res:any)=>{
      this.searchedPokemon=res;
    })
    
  }
  async onSearchCancel(){
    await this.presentLoading();
    this.showRandom=true;
  }
}

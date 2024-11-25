import { Component } from '@angular/core';
import { IonButtons, IonGrid, IonRow, IonCol, IonInfiniteScroll, IonInfiniteScrollContent, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonCardContent, IonCard, IonCardHeader,IonCardTitle,IonCardSubtitle, IonItem, IonList, LoadingController, IonChip, IonAlert } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { PokeapiService } from '../services/pokeapi.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { eye, eyeOff, powerOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [ IonButtons, IonAlert, IonChip, IonGrid, IonRow, IonCol, IonInfiniteScroll, IonInfiniteScrollContent, IonButton, IonIcon,IonList, IonItem, IonCardContent, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle, CommonModule, FormsModule]
})
export class Tab2Page {
  showRandom:boolean=true
  query: string = '';
  suggestions: any[] = [];
  data:any
  searchedPokemon:any
  //
  pokemons: any[] = [];
  offset: number = 0;
  limit: number = 20;
  loadingp: boolean = false;

  constructor(private poki:PokeapiService, 
    private loading:LoadingController, 
    private router:Router,
    private auth:AuthService) {
    addIcons({powerOutline,eye});
  }

  ngOnInit(): void {
    this.poki.getPokemon(this.getRandomPokemon()).subscribe((res:any)=>{
      this.data=res;
    });
    this.loadPokemons();
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

    if (this.query.length > 1) {
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
    this.query = pokemonName;
    this.suggestions = [];
    this.poki.getPokemonByName(pokemonName).subscribe((res:any)=>{
      this.searchedPokemon=res;
    })
    
  }
  async onSearchCancel(){
    await this.presentLoading();
    this.showRandom=true;
  }
  onClick(id:any){
    this.router.navigate(['tuPokemon',id]);
  }
  //Infinite
  loadPokemons() {
    if(this.loadingp) return;
    this.loadingp = true;
    console.log(`Cargando Pokémon con offset: ${this.offset} y limit: ${this.limit}`);

    this.poki.getPokemons(this.offset, this.limit).subscribe(pokemons => {
      // Mapeamos la lista de URLs de Pokémon a solicitudes de detalles
      console.log(pokemons);
      const detailedPokemons = pokemons.map(pokemon => 
        this.poki.getPokemonDetails(pokemon.url).toPromise()
      );
  
      // Esperamos a que todas las solicitudes de detalles se completen
      Promise.all(detailedPokemons).then(results => {
        // Concatenamos los resultados obtenidos a la lista existente de pokemons
        this.pokemons = [...this.pokemons, ...results];
        this.offset += this.limit;
        this.loadingp = false;
      }).catch(err => {
        console.error('Error al cargar detalles de los Pokémon', err);
        this.loadingp = false;
      });
    });
  }
  
  loadData(event: any) {
    if (!this.loadingp) {
      this.loadPokemons();
      event.target.complete();
    }else{
      event.target.complete();
    }
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

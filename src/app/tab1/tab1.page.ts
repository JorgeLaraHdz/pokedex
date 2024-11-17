import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NewserviceService } from '../services/newservice.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import { logOutOutline, powerOutline, text } from 'ionicons/icons';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonCard, CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page{

  constructor(private news:NewserviceService,
    private auth:AuthService,
    private router:Router
  ) {
    addIcons({powerOutline,logOutOutline});}
  data:any
  ngOnInit(): void {
    this.news.getNews().subscribe((res:any)=>{
      const pokemonArticles = res.articles.filter((articles: { description: string; title: string; }) => 
        articles.description?.toLowerCase().includes("pokemon") || 
        articles.title?.toLowerCase().includes("pokemon")
      );
      this.data=pokemonArticles
      console.log(this.data)
    })
  }
  ir(url:any){
    window.open(url)
  }
  logout(){
    this.auth.logout();
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
}

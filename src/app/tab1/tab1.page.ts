import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NewserviceService } from '../services/newservice.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
    private router:Router
  ) {}
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
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_POKEMONES } from '../config/config';
import { map } from 'rxjs/operators';

interface PokemonType {
  type: {
    name: string;
    id: number
  };
}
interface PokemonResponse {
  name: string;
  id:number;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
}
@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private http:HttpClient) { }

  public getPokemon(id:number):Observable<any>{
    return this.http.get(API_POKEMONES+id);
  }

  public getPokemonByName(name:string):Observable<any>{
    return this.http.get(API_POKEMONES+name);
  }

  public searchPokemon(query: string): Observable<any[]> {
    return this.http.get<any>(`${API_POKEMONES}?limit=1025`).pipe(
      map(response => response.results.filter((pokemon: any) =>
        pokemon.name.includes(query.toLowerCase()) || pokemon.url.includes(query)
      ))
    );
  }
  public getPokemons(offset: number, limit: number): Observable<any[]> {
    return this.http.get<any>(`${API_POKEMONES}?offset=${offset}&limit=${limit}`).pipe(
      map(response => response.results)
    );
  }

  public getPokemonDetails(url: string): Observable<any> {
    return this.http.get<PokemonResponse>(url).pipe(
      map(pokemon => ({
        id:pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        types: pokemon.types.map((typeInfo: PokemonType) => typeInfo.type.name) // Explicit type for typeInfo
      }))
    );
  }
  
}

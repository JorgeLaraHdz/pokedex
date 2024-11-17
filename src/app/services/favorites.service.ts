import { Injectable } from '@angular/core';
import { getFirestore, doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private firestore = getFirestore();

  constructor() {}

  // Agregar un Pokémon a favoritos
  async addFavorite(pokemon: any): Promise<void> {
    const user = getAuth().currentUser;
    if (user) {
      const userFavoritesRef = doc(this.firestore, `favorites/${user.uid}/pokemons/${pokemon.id}`);
      await setDoc(userFavoritesRef, pokemon);
      console.log('Pokémon añadido a favoritos:', pokemon);
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  // Eliminar un Pokémon de favoritos
  async removeFavorite(pokemonId: string): Promise<void> {
    const user = getAuth().currentUser;
    if (user) {
      const userFavoriteRef = doc(this.firestore, `favorites/${user.uid}/pokemons/${pokemonId}`);
      await deleteDoc(userFavoriteRef);
      console.log('Pokémon eliminado de favoritos:', pokemonId);
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  // Consultar si un Pokémon está en favoritos
  async isFavorite(pokemonId: string): Promise<boolean> {
    const user = getAuth().currentUser;
    if (user) {
      const userFavoritesCollection = collection(this.firestore, `favorites/${user.uid}/pokemons`);
      const snapshot = await getDocs(userFavoritesCollection);
      return snapshot.docs.some((doc) => doc.id === pokemonId);
    } else {
      throw new Error('Usuario no autenticado');
    }
  }
  async getFavorites(): Promise<any[]> {
    const user = getAuth().currentUser;
    if (user) {
      const userFavoritesCollection = collection(this.firestore, `favorites/${user.uid}/pokemons`);
      const snapshot = await getDocs(userFavoritesCollection);
      return snapshot.docs.map((doc) => doc.data()); // Extraer los datos de cada documento
    } else {
      throw new Error('Usuario no autenticado');
    }
  }
}

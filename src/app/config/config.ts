function getYesterdayDate(): string {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Restar un día
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes en formato 'MM'
    const day = String(today.getDate()).padStart(2, '0'); // Día en formato 'DD'
    return `${year}-${month}-${day}`;
  }
  
  export const API_NEWS = `https://newsapi.org/v2/everything?q=pokemon&from=${getYesterdayDate()}&sortBy=publishedAt&apiKey=89cd8f604334442bbd3bc22e4fdb9f80`;
  export const API_POKEMONES="https://pokeapi.co/api/v2/pokemon/"
  
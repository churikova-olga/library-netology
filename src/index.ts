import { Observable } from 'rxjs';
import axios from 'axios';

let streamGithub$ = new Observable( ( observer ) => {
  axios.get( 'https://api.github.com/search/repositories?q=library-netology' )
      .then( ( response ) => {
        observer.next( response.data );
        observer.complete();
      } )
      .catch( ( error ) => {
        observer.error( error );
      } );
} );
streamGithub$.subscribe( {
  next:value=>console.log(value),
  error:err=>console.error(err),
  complete: () =>console.log('completed')
} );

let streamPokemon$ = new Observable( ( observer ) => {
    axios.get( 'https://pokeapi.co/api/v2/pokemon?search=$ditto' )
        .then( ( response ) => {
            observer.next( response.data );
            observer.complete();
        } )
        .catch( ( error ) => {
            observer.error( error );
        } );
} );
streamPokemon$.subscribe( {
    next:value=>console.log(value),
    error:err=>console.error(err),
    complete: () =>console.log('completed')
} );

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '2hvXk2v8sfRYdbMhUWuhF0y0aIr3jQ2O';
  private _historial: string[] =[];

  public resultados: Gif[] =[];

  get historial() {
    
    return [...this._historial];
  }
  
  // constructor solo se ejecuta la primera que el servicio es llamado
  constructor( private http: HttpClient){
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse( localStorage.getItem('historial')!)
    // }
    // otra forma
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this. resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifst(query: string = ''){

    // convierte todo a minuscula para evitar repeticiones
    query = query.trim().toLocaleLowerCase();

    // revisa si lo que busco no esta incluido en el arreglo
    if( !this._historial.includes( query )){
      // lo agrego al principio
      this._historial.unshift(query);
      // solo corto en 10
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
      
    }
    
    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=2hvXk2v8sfRYdbMhUWuhF0y0aIr3jQ2O&q=${query}&limit=10`)
          .subscribe( (resp) => {
            console.log(resp.data)
            
            this.resultados = resp.data;
            localStorage.setItem('resultados', JSON.stringify(this.resultados));
            
          })

    
  }

}
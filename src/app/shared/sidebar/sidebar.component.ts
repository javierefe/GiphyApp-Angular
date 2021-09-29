import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private gifsService: GifsService){}

  get historial(){
    return this.gifsService.historial;
  }

  buscar( termino: string){
    this.gifsService.buscarGifst(termino);
  }

  // get resultados(){
  //   console.log(this.gifsService.resultados)
  //   return this.gifsService.resultados;
  // }
}

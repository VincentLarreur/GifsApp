import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {
  @ViewChild('txtBusqueda') txtBusqueda!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  buscar() {
    const valor = this.txtBusqueda.nativeElement.value;
    if (valor.trim().length == 0) { return; }

    this.gifsService.buscarGifs(valor);
    this.txtBusqueda.nativeElement.value = '';
  }
}

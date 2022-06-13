import { Component, EventEmitter, Output, OnInit,Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit{

  @Input() placeholder: string = "";

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();

  termino: string = "";

  constructor() { }

  ngOnInit(): void {
    //Esto obtendra el valor que se vaya presionando en cada tecla dentro del input
    this.debouncer
      .pipe(
        //Esto lo que va a decir las ms que se va a esperar antes de emitir el siguiente valor.
        debounceTime(300)
      )
      .subscribe((valor) => {
        //console.log('debounce',valor);
        this.onDebounce.emit(valor);
      })

  }

  buscar(){
    this.onEnter.emit(this.termino);
  }

  // teclaPresionada(event:any){
  //   const valor = event.target.value;
  //   console.log(valor);
  //   console.log(this.termino)
  // }

  teclaPresionada(){
    //Aqui lo que pide es el siguiente valor, con cada tecla presionada 
    //se obtendrá una nueva concatenacion de caracteres, con lo cual servirá
    //para realizar las busqueda con ese termino asignado en el input
    this.debouncer.next(this.termino);
  }
}

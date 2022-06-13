import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import {switchMap, tap} from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {
  
  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService) { }

  ngOnInit(): void {
    /*=======================
       Primera forma de hacerlo
      ======================= */
    // this.activatedRoute.params
    //   .subscribe(({id}) => {
    //     //Recibe la proporcion de :id en el enlace
    //     this.paisService.getPaisPorAlpha(id)
    //       .subscribe((pais) => console.log(pais))
    //   })

    // =======================
    //  Segunda forma de hacerlo
    // =======================
    this.activatedRoute.params
      .pipe(
        //switchMap( param => this.paisService.getPaisPorAlpha(param.id))
        switchMap(({id}) => this.paisService.getPaisPorAlpha(id) ),
        tap()
      ).subscribe((pais) => {
        this.pais = pais;
      })
  }

}

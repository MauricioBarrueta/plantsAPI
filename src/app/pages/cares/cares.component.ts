import { Component, OnInit } from '@angular/core';
import { CaresService } from './service/cares.service';
import { catchError, tap, throwError } from 'rxjs';
import { Cares } from './interface/cares';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cares',
  templateUrl: './cares.component.html',
  styleUrls: ['./cares.component.scss']
})
export class CaresComponent implements OnInit {

  constructor(private readonly careService: CaresService, private readonly route: ActivatedRoute, private router: Router) {}

  id!: any
  caresList!: Cares[]
  caresTypeIcons: string = environment.care_types
  imgDataNotFound!: string

  ngOnInit(): void {
    this.getCaresBySpecieId()    
  }

  getCaresBySpecieId() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.careService.getCaresBySpecieId(this.id)
      .pipe(
        catchError(error => {
          if(error.status === 404 || error.status === 400 || error.status === 429) {
            this.imgDataNotFound = environment.status_error          
          }
          return throwError(() => error)
        }),
        tap((res: Cares[]) => { 
          this.caresList = res           
        })
      )
      .subscribe()
  }

  /* Volver a los detalles de la planta */
  backToDetails() {
    this.router.navigate(['specie-details', this.id]);
  }
}
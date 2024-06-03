import { Component, Input, OnInit } from '@angular/core';
import { Specie } from './interface/specie';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeciesService } from '../service/species.service';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-specie',
  templateUrl: './specie.component.html',
  styleUrls: ['./specie.component.scss']
})
export class SpecieComponent implements OnInit {
  
  constructor(private readonly speciesService: SpeciesService, private readonly route: ActivatedRoute, private router: Router) {}
  
  id!: number
  specie$: Specie[] = []

  @Input() currentPage!: number //* Recibe el valor correspondiente a la página actual
  imgDataNotFound!: string
  imgPath: string = `${environment.care_types}`

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => { this.id = param['id'] })
    this.getSpecieDetails()
  }

  /* Muestra los datos de acuerdo al parámetro 'id' */ 
  getSpecieDetails() {    
    this.speciesService.getSpecieDetailsById(this.id)
      .pipe(
        catchError(error => {
          if (error.status === 404 || error.status === 400 || error.status === 429) {
            this.imgDataNotFound = environment.status_error
          }
          return throwError(() => error)
        })
      )
      .subscribe((res: any) => {            
        this.specie$.push(res)
      })
  }

  /* Convierte los valores booleanos a texto */
  booleanToString(booleanValue: boolean): string {
    return booleanValue == false ? 'No' : 'Yes'
  }

  /* Regresa a la página en donde se quedó */
  backToList() {
    this.router.navigate([`species-list/by`], { queryParams: { page: `${this.currentPage}` }})     
  }

  /* Manda el parámetro a la ruta especificada para mostrar las enfermedades */
  diseasesList() {
    this.router.navigate([`specie-details/pest-diseases`], { queryParams: { id: `${this.id}` }})
  }

  /* Manda el parámetro a la ruta especificada para mostrar los cuidados */
  caresList() {
    this.router.navigate(['specie-details/cares-guide'], { queryParams: {id: `${this.id}`}})
  }
}
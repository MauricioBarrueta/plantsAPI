import { Component, OnInit } from '@angular/core';
import { SpeciesService } from './service/species.service';
import { Species } from './interface/species';
import { catchError, tap, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit {
  
  constructor(private readonly speciesService: SpeciesService, private router: Router, private route: ActivatedRoute) {}
  
  page: number = 1
  lastPage!: number
  species$: Species[] = []
  nameParam!: string

  imgDataNotFound!: string 
  imgPath: string = `${environment.care_types}`

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => { this.nameParam = param['name'] })
    this.getSpeciesList()    
  }

  /* Muestra la lista de especies por página o la lista de especies que coincidan con el parámetro 'name', si es que existe */
  getSpeciesList() {
    this.route.queryParams.subscribe(param => { this.nameParam = param['name'] })
    if(this.nameParam === undefined || this.nameParam === '' || this.nameParam === null) {
      this.router.navigate([`species-list/by`], { queryParams: { page: `${this.page}` }})      
      this.speciesService.getSpeciesListByPage(this.page)
      .pipe(
        catchError(error => {
          if (error.status === 404 || error.status === 400 || error.status === 429) {
            this.imgDataNotFound = environment.status_error
          }
          return throwError(() => error)
        }),
        tap((res: Species[]) => { 
          this.species$ = res
          this.lastPage = this.speciesService.last
        })
      )
      .subscribe()
    } else {
      this.getQueryToList(this.nameParam)
    }
  } 

  /* Obtiene el parámetro ingresado y lo pasa a la ruta especificada */
  getNameParam(name: string) {
    this.nameParam = name
    this.router.navigate(['species-list/by'], { queryParams: { name: `${this.nameParam}` }})
    this.getQueryToList(this.nameParam)
  }

  /* Filtra la lista de acuerdo al valor del parámetro */
  getQueryToList(param: string) {
    this.speciesService.getSpeciesByQuery(param)
    .pipe(
      tap((res: Species[]) => this.species$ = res )
    )
    .subscribe() 
  }

  /* Página siguiente */
  nextPage() {
    this.page++
    this.getSpeciesList() 
    this.router.navigate([`species-list/by`], { queryParams: { page: `${this.page}` }})   
  }

  /* Página anterior */
  prevPage() {
    if(this.page > 1) {
      this.page--
      this.getSpeciesList()
      this.router.navigate([`species-list/by`], { queryParams: { page: `${this.page}` }})     
    }  
  }

  /* Manda el parámetro 'id' a la ruta especificada para mostrar los detalles de la especie seleccionada */
  showDetails(param: number) {    
    this.router.navigate(['specie-details'], { queryParams: {id: `${param}`} })
  }  
}

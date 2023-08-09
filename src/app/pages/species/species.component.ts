import { Component, OnInit } from '@angular/core';
import { SpeciesService } from './service/species.service';
import { Species } from './interface/species';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit {

  current_page = 1
  last_page!: number
  query!: string
  species$: Species[] = []
  imgDataNotFound!: string
  
  constructor(private readonly speciesService: SpeciesService, private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['species-list/page/', 1]);      
    this.getSpeciesListByPage()
  }

  /* Lista por páginas */
  getSpeciesListByPage() {
    this.speciesService.getSpeciesListByPage(this.current_page)
      .pipe(
        catchError(error => {
          if (error.status === 404 || error.status === 400 || error.status === 429) {
            this.imgDataNotFound = environment.status_error
          }
          return throwError(() => error)
        }),
        tap((res: Species[]) => { 
          this.species$ = res
          this.last_page = this.speciesService.last
        })
      )
      .subscribe()
  }

  /* Filtrar lista */
  getQueryToList(queryValue: string) {
    this.query = queryValue
    this.speciesService.getSpeciesByQuery(this.query)
    .pipe(
      tap((res: Species[]) => this.species$ = res )
    )
    .subscribe() 
  }

  /* Página siguiente */
  nextPage() {
    if(this.current_page >= this.last_page) {
      alert('No hay más páginas')
    } else {     
      this.current_page++
      this.getSpeciesListByPage() 
      this.router.navigate(['species-list/page/', this.current_page]);
    }  
  }

  /* Página anterior */
  prevPage() {
    if(this.current_page > 1) {
      this.current_page--
      this.getSpeciesListByPage()
      this.router.navigate(['species-list/page/', this.current_page]);
    }  
  }
}

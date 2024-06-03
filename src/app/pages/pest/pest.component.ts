import { Component, OnInit } from '@angular/core';
import { PestService } from './service/pest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pest } from './interface/pest';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pest',
  templateUrl: './pest.component.html',
  styleUrls: ['./pest.component.scss']
})
export class PestComponent implements OnInit {

  id!: any
  pestData: Pest[] = []
  pestDescData: any[] = []
  pestSolutionData: any[] = []

  imgDataNotFound!: string

  constructor(private readonly pestService: PestService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => { this.id = param['id'] })
    this.getPestBySpecieId()
  }

  getPestBySpecieId() {
    this.pestService.getPestBySpecieId(this.id)
      .pipe(
        catchError(error => {
          if(error.status === 404 || error.status === 400 || error.status === 429) {
            this.imgDataNotFound = environment.status_error          
          }
          return throwError(() => error)
        }),
        tap((res: Pest[]) => {
          this.pestData = res
          if(this.pestData.length == 0) {
            this.imgDataNotFound = environment.status_error
          }
          this.pestData.forEach(pestDesc => {
            pestDesc.description.forEach(desc => {
              this.pestDescData.push(desc)
            });
            pestDesc.solution.forEach(solution => {
              this.pestSolutionData.push(solution)
            });
          });
        })
      )
      .subscribe()
  }

  /* Volver a los detalles de la planta */
  backToDetails(param: number) {
    this.router.navigate(['specie-details'], { queryParams: {id: `${param}`} })
  }
}
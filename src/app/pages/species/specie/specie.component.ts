import { Component, OnInit } from '@angular/core';
import { Specie } from './interface/specie';
import { ActivatedRoute } from '@angular/router';
import { SpeciesService } from '../service/species.service';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-specie',
  templateUrl: './specie.component.html',
  styleUrls: ['./specie.component.scss']
})
export class SpecieComponent implements OnInit {
  
  constructor(private readonly speciesService: SpeciesService, private readonly route: ActivatedRoute) {}
  
  id!: any
  specie$: Specie[] = []
  imgDataNotFound!: string

  ngOnInit(): void {
    this.getSpecieDetails()    
  } 

  getSpecieDetails() {
    this.id = this.route.snapshot.paramMap.get('id')
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

  convert(booleanValue: boolean): string {
    return booleanValue == false ? 'No' : 'Yes'
  }
}
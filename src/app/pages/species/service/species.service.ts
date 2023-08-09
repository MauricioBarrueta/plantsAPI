import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Species, apiResponse } from '../interface/species';
import { Observable, map, pluck } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Specie } from '../specie/interface/specie';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(private readonly http: HttpClient) { }

  /* Listar por página */
  last!: number
  getSpeciesListByPage(page: number): Observable<Species[]> {    
    return this.http.get<apiResponse>(`${environment.url}/species-list?page=${page}&key=${environment.key}`)
      .pipe(map((res: apiResponse) => { 
          page = res.current_page
          this.last = res.last_page
          return res.data
        })
      )
  } 

  /* Filtrar lista por query */
  getSpeciesByQuery(query: string): Observable<Species[]> {
    return this.http.get<apiResponse>(`${environment.url}/species-list?key=${environment.key}&q=${query}`)
      .pipe(map((res: apiResponse) => { 
        return res.data
      }))
  }

  /* Detalles de la especie por Id */  
  getSpecieDetailsById(id: number): Observable<Specie[]> {
    return this.http.get<Specie[]>(`${environment.url}/species/details/${id}?key=${environment.key}`)
      .pipe(map((res: Specie[]) => { return res }))
  }
}

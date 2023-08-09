import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cares, caresResponse } from '../interface/cares';

@Injectable({
  providedIn: 'root'
})
export class CaresService {

  constructor(private readonly http: HttpClient) { }

  getCaresBySpecieId(id: number): Observable<Cares[]> {
    return this.http.get<caresResponse>(`${environment.url}/species-care-guide-list?key=${environment.key}&species_id=${id}`)
      .pipe(map((res: caresResponse) => { 
        return res.data
      }))
  }
  
}

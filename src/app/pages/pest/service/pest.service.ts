import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pest, pestResponse } from '../interface/pest';

@Injectable({
  providedIn: 'root'
})
export class PestService {

  constructor(private readonly http: HttpClient) { }

  /* Listar plaga de acuerdo al Id de la especie */
  getPestBySpecieId(id: number): Observable<Pest[]> {
    return this.http.get<pestResponse>(`${environment.url}/pest-disease-list?key=${environment.key}&id=${id}`)
      .pipe(map((res: pestResponse) => {
        return res.data
      }))
  }
}

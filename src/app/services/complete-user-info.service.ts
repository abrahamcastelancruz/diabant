import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompleteUserInfoService {
  constructor(private http: HttpClient) {}

  public getCountries(): Observable<any> {
    return this.http.get('https://countriesnow.space/api/v0.1/countries/');
  }

  public getStatesFromCountry(country): Observable<any> {
    return this.http.post(
      'https://countriesnow.space/api/v0.1/countries/states', country
    );
  }
}

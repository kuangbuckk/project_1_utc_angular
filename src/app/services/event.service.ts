import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiGetEvents = `${environment.apiBaseUrl}/events`

  constructor(private http: HttpClient) { }

  getEvents(page: number, limit: number):Observable<Event[]>{
      const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      return this.http.get<Event[]>(this.apiGetEvents, {params})
  }
}
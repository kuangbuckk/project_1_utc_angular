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

  getEventById(id: number):Observable<Event>{
      return this.http.get<Event>(`${this.apiGetEvents}/${id}`)
  }

  getEventsByCategoryId(categoryId: number, page: number, limit: number):Observable<Event[]>{
      const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());
      return this.http.get<Event[]>(`${this.apiGetEvents}/category/${categoryId}`, {params})
  }

  searchEventByKeyword(keyword: string, page: number, itemsPerPage: number): Observable<Event[]> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('limit', itemsPerPage.toString());

    return this.http.get<Event[]>(`${this.apiGetEvents}/search`, { params });
  }
}
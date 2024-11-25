import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDTO } from '../dtos/event/event.dto';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiGetEvents = `${environment.apiBaseUrl}/events`

  constructor(private http: HttpClient) { }

  getAllEventsAdmin(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiGetEvents + '/getAll');
  }

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

  getEventsByOrganizationId(organizationId: number, page: number, limit: number):Observable<Event[]>{
      const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());
      return this.http.get<Event[]>(`${this.apiGetEvents}/organization/${organizationId}`, {params})
  }

  searchEventByKeyword(keyword: string, page: number, itemsPerPage: number): Observable<Event[]> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('limit', itemsPerPage.toString());

    return this.http.get<Event[]>(`${this.apiGetEvents}/search`, { params });
  }

  insertEvent(eventDTO: EventDTO): Observable<any> {
    return this.http.post(this.apiGetEvents, eventDTO);
  }

  updateEvent(eventId: number, eventDTO: EventDTO): Observable<any> {
    return this.http.put(`${this.apiGetEvents}/${eventId}`, eventDTO);
  }

  updateEventStatus(eventId: number, status: string): Observable<any> {
    const params = new HttpParams().set('status', status);
    return this.http.patch<any>(`${this.apiGetEvents}/${eventId}/status`, {}, { params });
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.apiGetEvents}/${id}`);
  }

  uploadEventImages(eventId: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiGetEvents}/uploads/${eventId}`, formData);
  }
}
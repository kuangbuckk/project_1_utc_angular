import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketCategory } from '../model/ticket.category';

@Injectable({
  providedIn: 'root'
})
export class TicketCategoryService {
    private apiGetTicketCategories = `${environment.apiBaseUrl}/ticketCategories/events`

    constructor(private http: HttpClient) { }
    getTicketCategoriesByEventId(eventId: number):Observable<TicketCategory[]>{
        return this.http.get<TicketCategory[]>(`${this.apiGetTicketCategories}/${eventId}`)
    }
}
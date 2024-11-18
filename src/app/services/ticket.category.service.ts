import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketCategory } from '../model/ticket.category';

@Injectable({
  providedIn: 'root'
})
export class TicketCategoryService {
    private apiGetTicketCategories = `${environment.apiBaseUrl}/ticketCategories/events`
    private apiGetTicketCategoriesById = `${environment.apiBaseUrl}/ticketCategories`
    private apiGetTicketCategoriesByIds = `${environment.apiBaseUrl}/ticketCategories/by-ids`
  insertTicketCategory: any;

    constructor(private http: HttpClient) { }
    getTicketCategoriesByEventId(eventId: number):Observable<TicketCategory[]>{
        return this.http.get<TicketCategory[]>(`${this.apiGetTicketCategories}/${eventId}`)
    }

    getTicketCategoryById(id: number):Observable<TicketCategory>{
        return this.http.get<TicketCategory>(`${this.apiGetTicketCategoriesById}/${id}`)
    }

    getTicketCategoriesByIds(ticketCategoryIds: number[]):Observable<TicketCategory[]>{
        const params = new HttpParams().set('ids', ticketCategoryIds.join(',')); 
        return this.http.get<TicketCategory[]>(`${this.apiGetTicketCategoriesByIds}`, {params})
    }
}

export { TicketCategory };

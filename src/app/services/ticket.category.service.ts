import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketCategory } from '../model/ticket.category';
import { TicketCategoryDTO } from '../dtos/ticket-category/ticket.category.dto';

@Injectable({
  providedIn: 'root'
})
export class TicketCategoryService {
    private apiGetTicketCategoriesWithEvent = `${environment.apiBaseUrl}/ticketCategories/events`
    private apiGetTicketCategories = `${environment.apiBaseUrl}/ticketCategories`
    private apiGetTicketCategoriesByIds = `${environment.apiBaseUrl}/ticketCategories/by-ids`

    constructor(private http: HttpClient) { }
    getTicketCategoriesByEventId(eventId: number):Observable<TicketCategory[]>{
        return this.http.get<TicketCategory[]>(`${this.apiGetTicketCategoriesWithEvent}/${eventId}`)
    }

    getTicketCategoryById(id: number):Observable<TicketCategory>{
        return this.http.get<TicketCategory>(`${this.apiGetTicketCategories}/${id}`)
    }

    getTicketCategoriesByIds(ticketCategoryIds: number[]):Observable<TicketCategory[]>{
        const params = new HttpParams().set('ids', ticketCategoryIds.join(',')); 
        return this.http.get<TicketCategory[]>(`${this.apiGetTicketCategoriesByIds}`, {params})
    }

    insertTicketCategory(ticketCategoryDTO: TicketCategoryDTO):Observable<TicketCategory>{
        return this.http.post<TicketCategory>(this.apiGetTicketCategories, ticketCategoryDTO)
    }

    updateTicketCategory(ticketCategoryId: number, updateTicketCategoryDTO: TicketCategoryDTO):Observable<any>{
        return this.http.put(`${this.apiGetTicketCategories}/${ticketCategoryId}`, updateTicketCategoryDTO)
    }

    deleteTicketCategory(ticketCategoryId: number):Observable<any>{
        return this.http.delete(`${this.apiGetTicketCategories}/${ticketCategoryId}`)
    }
}

export { TicketCategory };

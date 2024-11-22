import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketDTO } from '../dtos/ticket/ticket.dto';
import { Ticket } from '../model/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
    private apiTicket = `${environment.apiBaseUrl}/tickets`

    constructor(private http: HttpClient) { }
    
    insertTicket(ticketDTO: TicketDTO):Observable<Ticket>{
        return this.http.post<Ticket>(this.apiTicket, ticketDTO)
    }

    getTicketsByTicketCategoryId(ticketCategoryId: number):Observable<Ticket[]>{
        return this.http.get<Ticket[]>(`${this.apiTicket}/ticketCategory/${ticketCategoryId}`)
    }

    getTicketsByTicketOrderDetailId(ticketOrderDetailId: number):Observable<Ticket[]>{
        return this.http.get<Ticket[]>(`${this.apiTicket}/ticketOrderDetail/${ticketOrderDetailId}`)
    }

    updateTicketStatus(ticketId: number, status: string): Observable<any> {
      const params = new HttpParams().set('status', status);
      return this.http.patch<any>(`${this.apiTicket}/${ticketId}/status`, {}, { params });
    }
}

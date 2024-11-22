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
}

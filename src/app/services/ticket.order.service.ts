import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketOrderDTO } from '../dtos/ticket-order/ticket.order.dto';
import { TicketOrder } from '../model/ticket.order';

@Injectable({
  providedIn: 'root'
})
export class TicketOrderService {
    private apiTicketOrder = `${environment.apiBaseUrl}/ticketOrders`

    constructor(private http: HttpClient) { }

    getTicketOrdersByUserId(userId: number):Observable<TicketOrder[]>{
        return this.http.get<TicketOrder[]>(`${this.apiTicketOrder}/user/${userId}`)
    }
    
    insertTicketOrder(ticketOrderDTO: TicketOrderDTO):Observable<TicketOrder>{
        return this.http.post<TicketOrder>(this.apiTicketOrder, ticketOrderDTO)
    }
}

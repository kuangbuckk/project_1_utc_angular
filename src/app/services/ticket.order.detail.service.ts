import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketOrderDetailDTO } from '../dtos/ticket-order-detail/ticket.order.detail.dto';
import { TicketOrder } from '../model/ticket.order';
import { TicketOrderDetail } from '../model/ticket.order.detail';

@Injectable({
  providedIn: 'root'
})
export class TicketOrderDetailService {
    private apiTicketOrderDetail = `${environment.apiBaseUrl}/ticketOrderDetails`

    constructor(private http: HttpClient) { }
    
    insertTicketOrderDetail(ticketOrderDetailDTO: TicketOrderDetailDTO):Observable<TicketOrderDetail>{
        return this.http.post<TicketOrderDetail>(this.apiTicketOrderDetail, ticketOrderDetailDTO)
    }

    // getAllTicketOrderDetailsByUserId(userId: number):Observable<TicketOrderDetail[]>{
    //     return this.http.get<TicketOrderDetail[]>(`${this.apiTicketOrderDetail}/user/${userId}`)
    // }

    getAllTicketOrderDetailsByTicketOrderId(ticketOrderId: number):Observable<TicketOrderDetail[]>{        
        return this.http.get<TicketOrderDetail[]>(`${this.apiTicketOrderDetail}/order/${ticketOrderId}`)
    }
}

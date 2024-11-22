import { User } from './../../model/user';
import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { TicketOrderService } from 'src/app/services/ticket.order.service';
import { Router } from '@angular/router';
import { TicketOrder } from '../../model/ticket.order';

@Component({
  selector: 'app-my-ticket-orders',
  templateUrl: './my-ticket-orders.component.html',
  styleUrls: ['./my-ticket-orders.component.scss']
})
export class MyTicketOrdersComponent {
  ticketOrders: TicketOrder[] = [];
  userId: number = 0; 
  constructor(
    private tokenService: TokenService,
    private ticketOrderService: TicketOrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = this.tokenService.getUserId();
    if (this.userId) {
      this.getTicketOrdersByUserId(this.userId);
    }
  }

  getTicketOrdersByUserId(userId: number) {
    this.ticketOrderService.getTicketOrdersByUserId(userId).subscribe({
      next: (response: TicketOrder[]) => {
        debugger
        this.ticketOrders = response;
      },
      complete: () => {
        
      },
      error: (error: any) => {
        console.error('Đã xảy ra lỗi: ', error?.error.message);
      }
    })
  }
}

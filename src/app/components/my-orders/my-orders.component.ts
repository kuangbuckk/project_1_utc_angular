import { TokenService } from './../../services/token.service';
import { TicketOrderDetailService } from './../../services/ticket.order.detail.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketOrder } from '../../model/ticket.order';
import { TicketOrderDetail } from '../../model/ticket.order.detail';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  ticketOrderDetails: TicketOrderDetail[] = [];
  userId: number = 0;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ticketOrderDetailService: TicketOrderDetailService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.userId = this.tokenService.getUserId();
    debugger
    this.getOrders(this.userId);
  }

  getOrders(userId: number) {
    this.ticketOrderDetailService.getAllTicketOrderDetailsByUserId(userId).subscribe({
      next: (response: any) => {
        debugger
        this.ticketOrderDetails = response;
      },
      complete: () => {
        
      },
      error: (error: any) => {
        console.error('Error fetching orders:', error);
      }
    });
  }
}

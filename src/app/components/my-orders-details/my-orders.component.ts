import { TokenService } from '../../services/token.service';
import { TicketOrderDetailService } from '../../services/ticket.order.detail.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketOrderDetail } from '../../model/ticket.order.detail';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  ticketOrderDetails: TicketOrderDetail[] = [];
  ticketOrderId: number = 0;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ticketOrderDetailService: TicketOrderDetailService,
  ) { }

  ngOnInit() {
    const idParam = this.activatedRoute.snapshot.paramMap.get('ticketOrderId');
    if (idParam) {
      this.ticketOrderId = parseInt(idParam);
    }
    debugger
    this.getOrders(this.ticketOrderId);
  }

  getOrders(ticketOrderId: number) {
    this.ticketOrderDetailService.getAllTicketOrderDetailsByTicketOrderId(ticketOrderId).subscribe({
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

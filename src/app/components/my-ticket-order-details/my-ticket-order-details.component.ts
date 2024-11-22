import { TicketService } from './../../services/ticket.service';
import { Component } from '@angular/core';
import { Ticket } from '../../model/ticket';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-ticket-order-details',
  templateUrl: './my-ticket-order-details.component.html',
  styleUrls: ['./my-ticket-order-details.component.scss']
})
export class MyTicketOrderDetailsComponent {
  tickets: Ticket[] = [];
  ticketOrderDetailId: number = 0;

  constructor(
    private ticketService: TicketService,
    private activatedRoute: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.ticketOrderDetailId = parseInt(idParam, 10);
    }
    this.getTicketsByTicketCategoryId(this.ticketOrderDetailId);
  }

  getTicketsByTicketCategoryId(ticketOrderDetailId: number) {
    this.ticketService.getTicketsByTicketOrderDetailId(ticketOrderDetailId).subscribe({
      next: (response: any) => {
        this.tickets = response;
        debugger;
      },
      complete: () => {
        
      },
      error: (error: any) => {
        console.error('Error fetching tickets:', error);
      }
    });
  }
}

import { TicketService } from './../../../services/ticket.service';
import { TicketCategoryService } from './../../../services/ticket.category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TicketCategory } from '../../../model/ticket.category';
import { Ticket } from '../../../model/ticket';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ticket-category-admin',
  templateUrl: './ticket-category-admin.component.html',
  styleUrls: ['./ticket-category-admin.component.scss']
})
export class TicketCategoryAdminComponent implements OnInit {
  eventId: number = 0;
  ticketCategories: TicketCategory[] = [];
  tickets: Ticket[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ticketCategoryService: TicketCategoryService,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.eventId = parseInt(idParam, 10);
    }
    this.getAllTicketCategoriesByEventId();
  }

  getAllTicketCategoriesByEventId() {
    this.ticketCategoryService.getTicketCategoriesByEventId(this.eventId).subscribe({
      next: (ticketCategories: any) => {
        this.ticketCategories = ticketCategories;
        this.getAllTicketsByTicketCategories();
      },
      complete: () => {
        console.log('Completed');
      },
      error: (error: any) => {
        console.error('Error fetching ticket categories:', error);
      }
    });
  }

  getAllTicketsByTicketCategories() {
    const ticketRequests = this.ticketCategories.map(category => 
      this.ticketService.getTicketsByTicketCategoryId(category.id)
    );

    forkJoin(ticketRequests).subscribe({
      next: (results: any[]) => {
        this.tickets = results.flat();
        this.tickets = this.tickets.sort((a, b) => b.id - a.id);
        debugger;
      },
      complete: () => {
        console.log('Completed fetching all tickets');
      },
      error: (error: any) => {
        console.error('Error fetching tickets:', error);
      }
    });
  }

  insertTicketCategory(eventId: number) {
    this.router.navigate([`/admin/events/${eventId}/ticket-categories/insert`]);
  }

  editTicketCategory(ticketCategoryId: number, eventId: number) {
    this.router.navigate([`/admin/events/${eventId}/ticket-categories/edit/${ticketCategoryId}`]);
  }

  deleteTicketCategory(ticketCategoryId: number) {
    this.ticketCategoryService.deleteTicketCategory(ticketCategoryId).subscribe({
      next: (response: any) => {
        alert('Delete ticket category successfully');
        this.getAllTicketCategoriesByEventId();
      },
      error: (error: any) => {
        console.error('Error deleting ticket category:', error);
      }
    });
  }

  getTicketsByTicketCategoryId(ticketCategoryId: number) {
    this.ticketService.getTicketsByTicketCategoryId(ticketCategoryId).subscribe({
      next: (tickets: any) => {
        this.tickets = tickets;
      },
      complete: () => {
        console.log('Completed');
      },
      error: (error: any) => {
        console.error('Error fetching tickets:', error);
      }
    });
  }

  updateTicketStatus(ticket: Ticket) {
    this.ticketService.updateTicketStatus(ticket.id, ticket.status).subscribe({
      next: () => {
        alert('Ticket status updated successfully');
      },
      error: (error: any) => {
        console.error('Error updating ticket status:', error);
      }
    });
  }
}

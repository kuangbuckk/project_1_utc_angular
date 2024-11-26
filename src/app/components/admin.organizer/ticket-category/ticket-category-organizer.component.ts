import { Component } from '@angular/core';
import { Ticket } from '../../../model/ticket';
import { TicketService } from '../../../services/ticket.service';
import { TicketCategoryService } from '../../../services/ticket.category.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TicketCategory } from '../../../model/ticket.category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-category-organizer',
  templateUrl: './ticket-category-organizer.component.html',
  styleUrls: ['./ticket-category-organizer.component.scss']
})
export class TicketCategoryOrganizerComponent {
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
        alert('Error fetching ticket categories:' + error.error);
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
        this.tickets.sort((a, b) => b.id - a.id);
        debugger;
      },
      complete: () => {
        console.log('Completed fetching all tickets');
      },
      error: (error: any) => {
        alert('Error fetching tickets:' + error.error);
      }
    });
  }

  insertTicketCategory(eventId: number) {
    this.router.navigate([`/admin/events/${eventId}/ticket-categories/insert`]);
  }

  editTicketCategory(ticketCategoryId: number, eventId: number) {
    this.router.navigate([`/organizer/events/${eventId}/ticketCategory/update/${ticketCategoryId}`]);
  }

  deleteTicketCategory(ticketCategoryId: number) {
    this.ticketCategoryService.deleteTicketCategory(ticketCategoryId).subscribe({
      next: (response: any) => {
        alert('Delete ticket category successfully');
        this.getAllTicketCategoriesByEventId();
      },
      error: (error: any) => {
        alert('Error deleting ticket category:' + error.error);
      }
    });
  }

  updateTicketStatus(ticket: Ticket) {
    this.ticketService.updateTicketStatus(ticket.id, ticket.status).subscribe({
      next: () => {
        alert('Ticket status updated successfully');
      },
      error: (error: any) => {
        alert('Error updating ticket status:' + error.error);
      }
    });
  }

}

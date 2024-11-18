import { TicketCategoryService } from './../../../services/ticket.category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { TicketCategory } from '../../../model/ticket.category';

@Component({
  selector: 'app-ticket-category-admin',
  templateUrl: './ticket-category-admin.component.html',
  styleUrls: ['./ticket-category-admin.component.scss']
})
export class TicketCategoryAdminComponent {
  eventId: number = 0;
  ticketCategories: TicketCategory[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ticketCategoryService: TicketCategoryService
  ) { }

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.eventId = parseInt(idParam, 10);
      debugger
    }
    this.getAllTicketCategoriesByEventId();
  }

  getAllTicketCategoriesByEventId() {
    this.ticketCategoryService.getTicketCategoriesByEventId(this.eventId).subscribe({
      next: (ticketCategories: any) => {
        this.ticketCategories = ticketCategories;
      },
      complete: () => {
        console.log('Completed');
      },
      error: (error: any) => {
        console.error('Error fetching ticket categories:', error);
      }
    });
  }

  insertTicketCategory(eventId: number) {
    this.router.navigate([`/admin/events/${eventId}/ticket-categories/insert`])
  }

  editTicketCategory(ticketCategoryId: number, eventId: number) {
    this.router.navigate([`/admin/events/${eventId}/ticket-categories/edit/${ticketCategoryId}`])
  }

  deleteTicketCategory(ticketCategoryId: number) {
    this.ticketCategoryService.deleteTicketCategory(ticketCategoryId).subscribe({
      next: (response: any) => {
        
      },
      complete: () => {
        alert('Delete ticket category successfully');
        this.getAllTicketCategoriesByEventId();
      },
      error: (error: any) => {
        console.error('Error deleting ticket category:', error)
      }
    });
  }
}

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
    }
    this.getAllTicketCategoriesByEventId(this.eventId);
  }

  getAllTicketCategoriesByEventId(eventId: number) {
    this.ticketCategoryService.getTicketCategoriesByEventId(eventId).subscribe({
      next: (response: any) => {
        debugger
        this.ticketCategories = response;
      },
      complete: () => {

      },
      error: (error: any) => {
        console.log('error: ', error);
      }
    })
  }

  insertTicketCategory(eventId: number) {
    this.router.navigate(['/admin/events/${eventId}/ticket-category/insert'])
  }
  editTicketCategory(ticketCategoryId: number) {
    this.router.navigate(['/admin/events/${eventId}/ticket-category/edit', ticketCategoryId])
  }
  deleteTicketCategory(ticketCategoryId: number) {}
}

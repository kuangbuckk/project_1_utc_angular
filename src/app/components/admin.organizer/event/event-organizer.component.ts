import { TokenService } from 'src/app/services/token.service';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Event } from '../../../model/event';

@Component({
  selector: 'app-event-organizer',
  templateUrl: './event-organizer.component.html',
  styleUrls: ['./event-organizer.component.scss']
})
export class EventOrganizerComponent {
  events: Event[] = [];
  organizationId: number = 0; 
  currentPage: number = 0;
  itemsPerPage: number = 6;
  totalPages:number = 0;
  visiblePages: number[] = [];

  constructor(
    private eventService: EventService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.organizationId = this.tokenService.getOrganizationId();
    this.getEventsByOrganiztionId(this.organizationId, this.currentPage, this.itemsPerPage);
  }

  getEventsByOrganiztionId(organizationId: number, currentPage: number, itemsPerPage: number) {
    this.eventService.getEventsByOrganizationId(organizationId, currentPage, itemsPerPage).subscribe({
      next: (response: any) => {
        this.events = response.events;
        this.totalPages = response.totalPages;
        debugger; 
      },
      complete: () => {
      },
      error: (error: any) => {
        alert('Error fetching events: ' + error.error);
      }
    });
  }

  onPageChange(page: number) {
    debugger;
    this.currentPage = page < 0 ? 0 : page;
    localStorage.setItem('currentProductPage', String(this.currentPage)); 
    this.getEventsByOrganiztionId(this.organizationId, this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  
    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
  
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
  
    return new Array(endPage - startPage + 1).fill(0)
      .map((_, index) => startPage + index);
  }

  insertEvent() {
    this.router.navigate(['/organizer/events/insert']);
  }

  manageTicketCategories(eventId: number) {
    this.router.navigate([`organizer/events/${eventId}/ticketCategory`]);
  }
}

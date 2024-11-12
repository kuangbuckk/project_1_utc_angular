import { EventService } from './../../../services/event.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Event } from '../../../model/event';


@Component({
  selector: 'app-events-admin',
  templateUrl: './events-admin.component.html',
  styleUrls: ['./events-admin.component.scss']
})

export class EventsAdminComponent {
  events: Event[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 6;
  totalPages:number = 0;
  visiblePages: number[] = [];

  constructor(
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.getEvents(this.currentPage, this.itemsPerPage);
  }

  getEvents(page: number, itemsPerPage: number) {
    this.eventService.getEvents(page, itemsPerPage).subscribe({
      next: (response: any) => {
        this.events = response.events;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {

      },
      error: (error: any) => {
        console.log('error: ', error);
      }
    })
  }

  onPageChange(page: number) {
    debugger;
    this.currentPage = page < 0 ? 0 : page;
    localStorage.setItem('currentProductPage', String(this.currentPage)); 
    this.getEvents(this.currentPage, this.itemsPerPage);
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
    this.router.navigate(['/admin/events/insert']);
  }

  editEvent(id: number) {
    this.router.navigate(['/admin/events/edit', id]);
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe({
      next: (response: any) => {
        
      },
      complete: () => {
        alert('Delete event successfully');
        this.getEvents(this.currentPage, this.itemsPerPage);
      },
      error: (error: any) => {
        console.error('Error deleting event:', error);
      }
    });
  }
}

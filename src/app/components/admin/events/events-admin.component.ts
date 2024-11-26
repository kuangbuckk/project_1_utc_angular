import { EventService } from './../../../services/event.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Event } from '../../../model/event';
import { HttpClient } from '@angular/common/http';


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
    private eventService: EventService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getEvents(this.currentPage, this.itemsPerPage);
  }

  getEvents(page: number, itemsPerPage: number) {
    this.eventService.getEvents(page, itemsPerPage).subscribe({
      next: (response: any) => {
        debugger
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

  manageTicketCategories(eventId: number) {
    this.router.navigate([`/admin/events/${eventId}/ticket-categories`]);
  }

  updateEventStatus(event: Event) {
    this.eventService.updateEventStatus(event.id, event.status).subscribe({
      next: (response: any) => {
        alert('Update event status successfully');
      },
      error: (error: any) => {
        console.error('Error updating event status:', error);
      }
    });
  }

  exportExcel(){
    const fileUrl = 'http://localhost:8090/api/v1/excel/export/events'; // Replace with your API endpoint
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        // Create a blob from the response
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);

        // Create a temporary anchor to download the file
        const a = document.createElement('a');
        a.href = url;
        a.download = `events.xls`; // Desired file name
        a.click();

        // Revoke the object URL to free memory
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading file', error);
      }
    );
  }
}

import { TicketCategoryService } from './../../services/ticket.category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventImage } from '../../model/event.image';
import { environment } from '../../enviroments/enviroment';
import { Event } from '../../model/event';
import { TicketCategory } from '../../model/ticket.category';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss']
})
export class DetailEventComponent implements OnInit {
  eventId: number = 0;
  event?: Event;
  currentImageIndex: number = 0;
  ticketCategories: TicketCategory[] = [];

  constructor(
    private route: Router, 
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private ticketCategoryService: TicketCategoryService) { }

  ngOnInit() {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if(idParam){
      this.eventId = parseInt(idParam);
    }
    if(!isNaN(this.eventId)) {
      this.eventService.getEventById(this.eventId).subscribe({
        next: (event: any) => {
          if (event.event_images && event.event_images.length > 0) {
            event.event_images.forEach((event_images:EventImage) => {
              event_images.image_url = `${environment.apiBaseUrl}/events/images/${event_images.image_url}`;
            });
            this.event = event 
            // Bắt đầu với ảnh đầu tiên
            this.showImage(0);
          } 
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
        },
        complete: () => {
          console.log('Completed');
        },
        error: (error: any) => {
          console.error('Error fetching event:', error);
        }
      });
    }
  }

  showImage(index: number): void {
    debugger
    if (this.event && this.event.event_images && 
        this.event.event_images.length > 0) {
      // Đảm bảo index nằm trong khoảng hợp lệ        
      if (index < 0) {
        index = 0;
      } else if (index >= this.event.event_images.length) {
        index = this.event.event_images.length - 1;
      }        
      // Gán index hiện tại và cập nhật ảnh hiển thị
      this.currentImageIndex = index;
    }
  }

  nextImage(): void {
    debugger
    this.showImage(this.currentImageIndex + 1);
  }

  previousImage(): void {
    debugger
    this.showImage(this.currentImageIndex - 1);
  }      

  onOrderTicket(ticketCategoryId: number){

  }
}

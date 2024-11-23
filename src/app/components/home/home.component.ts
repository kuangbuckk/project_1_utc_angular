import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { environment } from '../../enviroments/enviroment';
import { Event } from '../../model/event';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../model/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  events: Event[] = [];
  activated_events: Event[] = [];
  // completed_events: Event[] = [];
  categories: Category[] = [];
  selectedCategoryId: number  = 0;
  currentPage: number = 0;
  itemsPerPage: number = 6;
  totalPages:number = 0;
  visiblePages: number[] = [];
  keyword: string = '';

  constructor(
    private router: Router,
    private eventService: EventService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.getEvents(this.currentPage, this.itemsPerPage);
    debugger;
    this.getCategories();
  }

  //trả về danh sách các Category từ Observable và gán vào biến categories -> sau đó hiện lên HTML
  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        debugger;
        this.categories = categories;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  /*trả về danh sách các Event từ Observable và gán vào biến events, response bao gồm cả totalPages 
  chứ ko chỉ mỗi Event nên phải là response chứ ko để như Category ở trên được -> sau đó hiện lên HTML*/
  getEvents(page: number, itemsPerPage: number) {
    this.eventService.getEvents(page, itemsPerPage).subscribe({
      next: (response: any) => {
        response.events.forEach((event: Event) => {
          event.url = `${environment.apiBaseUrl}/events/images/${event.thumbnail}`;
        });
        this.events = response.events;
        this.activated_events = this.events.filter(event => event.status === 'active');
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
  
  
  searchEvents() {
    this.eventService.searchEventByKeyword(this.keyword, this.currentPage, this.itemsPerPage).subscribe({
      next: (response: any) => {
        response.events.forEach((event: Event) => {
          event.url = `${environment.apiBaseUrl}/events/images/${event.thumbnail}`;
        });
        this.events = response.events;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
        
      },
      error: (error: any) => {
        console.error('Error fetching events:', error);
      }
    });
  }

  getEventsByCategory(categoryId: number) {
    this.eventService.getEventsByCategoryId(categoryId, this.currentPage, this.itemsPerPage).subscribe({
      next: (response: any) => {
        response.events.forEach((event: Event) => {
          event.url = `${environment.apiBaseUrl}/events/images/${event.thumbnail}`;
        });
        this.events = response.events;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
        
      },
      error: (error: any) => {
        console.error('Error fetching events:', error);
      }
    });
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

  goToDetail(eventId: number): void {
    this.router.navigate(['/event', eventId]);
  }

  
}

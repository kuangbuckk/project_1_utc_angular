import { TicketCategory } from './../../../../services/ticket.category.service';
import { Component } from '@angular/core';
import { TicketCategoryDTO } from '../../../../dtos/ticket-category/ticket-category.dto';
import { TicketCategoryService } from '../../../../services/ticket.category.service';
//import { OrganizationService } from '../../../../services/organization.service';
//import { Category } from '../../../../model/category';
//import { Organization } from '../../../../model/organization';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-category-insert-admin',
  templateUrl: './ticket-category-insert-admin.component.html',
  styleUrls: ['./ticket-category-insert-admin.component.scss']
})
export class EventsInsertAdminComponent {
  updateTicketCategoryDTO: TicketCategoryDTO = {
    ticket_category_name: '',  
    price: 0,
    remaining_count: 0,
    eventId: 0,
  };
  categories: Category[] = [];
  organizations: Organization[] = [];
  selectedFiles: File[] = [];

  constructor(
    private eventService: EventService,
    private organizationService: OrganizationService,
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.organizationService.getOrganizations().subscribe({
      next: (organizations: any) => {
        this.organizations = organizations;
      },
      complete: () => {
        
      },
      error: (error: any) => {
        alert('Get organizations failed: ' + error.message);
      }
    });

    this.categoryService.getCategories().subscribe({
      next: (categories: any) => {
        this.categories = categories;
      },
      complete: () => {
        
      },
      error: (error: any) => {
        alert('Get categories failed: ' + error.message);
      }
    });
  }

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
  }

  insertEvent() {
    this.insertEventDTO.start_date = this.formatDate(new Date(this.insertEventDTO.start_date));
    this.insertEventDTO.end_date = this.formatDate(new Date(this.insertEventDTO.end_date));

    this.eventService.insertEvent(this.insertEventDTO).subscribe({
      next: (response: any) => {
        debugger;
        this.uploadImages(response.id);
      },
      complete: () => {
        alert('Insert event successfully');
      },
      error: (error: any) => {
        debugger;
        alert('Insert event failed: ' + error.message);
      }
    })
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  uploadImages(eventId: number) {
    const formData = new FormData();
    for (let file of this.selectedFiles) {
      formData.append('files', file, file.name);
    }

    this.eventService.uploadEventImages(eventId, formData).subscribe({
      next: () => {
        alert('Event inserted and images uploaded successfully');
        this.router.navigate(['/admin/events']);
      },
      error: (error: any) => {
        alert('Upload images failed: ' + error.message);
      }
    });
  }
}

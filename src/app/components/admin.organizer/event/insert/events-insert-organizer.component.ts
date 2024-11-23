import { TokenService } from 'src/app/services/token.service';
import { EventService } from '../../../../services/event.service';
import { Component } from '@angular/core';
import { EventDTO } from '../../../../dtos/event/event.dto';
import { CategoryService } from '../../../../services/category.service';
import { OrganizationService } from '../../../../services/organization.service';
import { Category } from '../../../../model/category';
import { Organization } from '../../../../model/organization';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-insert-organizer',
  templateUrl: './events-insert-organizer.component.html',
  styleUrls: ['./events-insert-organizer.component.scss']
})
export class EventsInsertOrganizerComponent {
  insertEventDTO: EventDTO = {
    name: '',  
    description: '',
    location: '',
    start_date: '',
    end_date: '',
    category_id: 0,
    organization_id: 0,
  };
  categories: Category[] = [];
  selectedFiles: File[] = [];

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit(): void {
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
    this.insertEventDTO.organization_id = this.tokenService.getOrganizationId();
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
        this.router.navigate(['/organizer/events']);
      },
      error: (error: any) => {
        alert('Upload images failed: ' + error.message);
      }
    });
  }
}

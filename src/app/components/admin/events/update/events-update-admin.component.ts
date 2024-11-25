import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { CategoryService } from 'src/app/services/category.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { Event } from 'src/app/model/event';
import { Category } from 'src/app/model/category';
import { Organization } from 'src/app/model/organization';

@Component({
  selector: 'app-events-update-admin',
  templateUrl: './events-update-admin.component.html',
  styleUrls: ['./events-update-admin.component.scss']
})
export class EventsUpdateAdminComponent implements OnInit {
  eventId: number = 0;
  event: Event = {} as Event;
  categories: Category[] = [];
  organizations: Organization[] = [];
  selectedFiles: File[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private categoryService: CategoryService,
    private organizationService: OrganizationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.eventId = parseInt(idParam, 10);
    }

    this.eventService.getEventById(this.eventId).subscribe(
      (response: any) => {
        this.event = response;
        // Convert the date strings to Date objects
        this.event.start_date = new Date(this.event.start_date);
        this.event.end_date = new Date(this.event.end_date);
      },
      (error: any) => {
        alert('Error fetching event: ' + error.error);
      }
    );

    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error: any) => {
        alert('Get categories failed: ' + error.error);
      }
    );

    this.organizationService.getOrganizations().subscribe(
      (organizations: Organization[]) => {
        this.organizations = organizations;
      },
      (error: any) => {
        alert('Get organizations failed: ' + error.error);
      }
    );
  }

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
  }

  updateEvent() {
    const eventDTO = {
      name: this.event.name,
      description: this.event.description,
      location: this.event.location,
      start_date: this.formatDate(new Date(this.event.start_date)),
      end_date: this.formatDate(new Date(this.event.end_date)),
      category_id: this.event.category_id,
      organization_id: this.event.organization_id,
      url: this.event.url,
    };

    this.eventService.updateEvent(this.eventId, eventDTO).subscribe({
      next: () => {
        // this.uploadImages(this.eventId);
        
      },
      complete: () => {
        alert('Update event successfully');
        this.router.navigate(['/admin/events']);
      },
      error: (error: any) => {
        alert('Update event failed: ' + error.error);
      }
    });
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
        alert('Images uploaded successfully');
      },
      error: (error: any) => {
        alert('Upload images failed: ' + error.error);
      }
    });
  }
}
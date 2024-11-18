import { Component } from '@angular/core';
import { TicketCategory } from '../../../model/ticket.category';
import { TicketCategoryService } from '../../../services/ticket.category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent {
  ticketCategories: TicketCategory[] = [];
  constructor(
    private ticketCategories: TicketCategory,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ticketCategories();
  }

  getTicketCategories() {
    this.ticketCategories.getTicketCategories().subscribe({
      next: (ticketCategories: TicketCategory[]) => {
        this.ticketCategories = ticketCategories;
        debugger; 
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.error('Error fetching ticketCategories:', error);
      }
    });
  }

  insertTicketCategory(eventId: number) {
    this.router.navigate(['/admin/organizations/insert']);
  }

  editOrganization(id: number) {
    this.router.navigate(['/admin/organizations/edit', id]);
  }

  deleteOrganization(id: number) {
    this.ticketCategoriesService.deleteOrganization(id).subscribe({
      next: (response: any) => {
        
      },
      complete: () => {
        alert('Delete organization successfully');
        this.router.navigate(['/admin/organizations']);
      },
      error: (error: any) => {
        console.error('Error deleting organization:', error);
      }
    });
  }

}

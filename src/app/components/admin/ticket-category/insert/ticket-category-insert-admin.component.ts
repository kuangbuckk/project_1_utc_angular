import { Component } from '@angular/core';
import { TicketCategoryDTO } from '../../../../dtos/ticket-category/ticket.category.dto';
import { Router } from '@angular/router';
import { TicketCategoryService } from '../../../../services/ticket.category.service';

@Component({
  selector: 'app-ticketcategory-insert-admin',
  templateUrl: './ticket-category-insert-admin.component.html',
  styleUrls: ['./ticket-category-insert-admin.component.scss']
})

export class TicketCategoryInsertAdminComponent {
  insertTicketCategoryDTO: TicketCategoryDTO = {
    ticket_category_name: '',
    price: 0,
    remaining_count: 0,
    eventId: 0,    
  };

  constructor(
    private router: Router,
    private ticketCategoryService: TicketCategoryService,
  ) { }

  insertTicketCategory(): void { 
    this.ticketCategoryService.insertTicketCategory(this.insertTicketCategoryDTO).subscribe({
      next: (response: any) => {
        
      },
      complete: () => {
        alert('Thêm loại vé thành công');
        this.router.navigate(['/admin/organizations']);
      },
      error: (error: any) => {
        alert('Thêm loại vé thất bại: ' + error.message);
      }
    })
  }
}

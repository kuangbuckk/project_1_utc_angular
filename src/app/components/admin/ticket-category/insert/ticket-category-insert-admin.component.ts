import { Component } from '@angular/core';
import { TicketCategoryDTO } from '../../../../dtos/ticket-category/ticket.category.dto';
import { Router } from '@angular/router';
import { TicketCategoryService } from '../../../../services/ticket.category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-category-insert-admin',
  templateUrl: './ticket-category-insert-admin.component.html',
  styleUrls: ['./ticket-category-insert-admin.component.scss']
})

export class TicketCategoryInsertAdminComponent {
  insertTicketCategoryDTO: TicketCategoryDTO = {
    category_name: '',
    price: 0,
    remaining_count: 0,
    event_id: 0,    
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ticketCategoryService: TicketCategoryService,
  ) { }

  insertTicketCategory(): void { 
    this.insertTicketCategoryDTO.event_id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0', 10);
    this.ticketCategoryService.insertTicketCategory(this.insertTicketCategoryDTO).subscribe({
      next: (response: any) => {
        
      },
      complete: () => {
        alert('Thêm loại vé thành công');
        this.router.navigate(['/admin/events']);
      },
      error: (error: any) => {
        alert('Thêm loại vé thất bại: ' + error.error);
      }
    })
  }
}

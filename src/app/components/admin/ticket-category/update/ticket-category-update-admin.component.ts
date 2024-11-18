import { Component } from '@angular/core';
import { TicketCategoryService } from '../../../../services/ticket.category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketCategoryDTO } from '../../../../dtos/ticket-category/ticket.category.dto';

@Component({
  selector: 'app-ticket-category-update-admin',
  templateUrl: './ticket-category-update-admin.component.html',
  styleUrls: ['./ticket-category-update-admin.component.scss']
})

export class TicketCategoryUpdateAdminComponent {
  updateTicketCategoryDTO: TicketCategoryDTO = { 
    category_name: '',
    price: 0,
    remaining_count: 0,
    event_id: 0,
  }
  ticketCategoryId: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ticketCategoryService: TicketCategoryService,
  ) { }

  ngOnInit(): void {
    const ticketCategoryIdParam = this.activatedRoute.snapshot.paramMap.get('ticketCategoryId');
    if (ticketCategoryIdParam) {
      this.ticketCategoryId = parseInt(ticketCategoryIdParam, 10);
      debugger
      this.getTicketCategoryById(this.ticketCategoryId);
    }
  }

  getTicketCategoryById(ticketCategoryId: number) {
    this.ticketCategoryService.getTicketCategoryById(ticketCategoryId).subscribe({
      next: (response: any) => {
        this.updateTicketCategoryDTO = response;
      },
      complete: () => {
        
      },
      error: (error: any) => {
        console.log('error: ', error);
      }
    })
  }

  updateTicketCategory(): void {
    this.updateTicketCategoryDTO.event_id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0', 10);
    this.ticketCategoryService.updateTicketCategory(this.ticketCategoryId, this.updateTicketCategoryDTO).subscribe({
      next: (response: any) => {
        
      },
      complete: () => {
        alert('Cập nhật loại vé thành công');
        this.router.navigate(['/admin/events']);
      },
      error: (error: any) => {
        debugger
        alert('Cập nhật loại vé thất bại: ' + error.error.message);
      }
    });
  }

}

import { Organization } from 'src/app/model/organization';
import { TokenService } from 'src/app/services/token.service';
import { Component } from '@angular/core';
import { TicketCategoryDTO } from '../../../../dtos/ticket-category/ticket.category.dto';
import { Router } from '@angular/router';
import { TicketCategoryService } from '../../../../services/ticket.category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-category-insert-organizer',
  templateUrl: './ticket-category-insert-organizer.component.html',
  styleUrls: ['./ticket-category-insert-organizer.component.scss']
})

export class TicketCategoryInsertOrganizerComponent {
  insertTicketCategoryDTO: TicketCategoryDTO = {
    category_name: '',
    price: 0,
    remaining_count: 0,
    event_id: 0,    
  };
  eventId: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ticketCategoryService: TicketCategoryService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.eventId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0', 10);
  }

  insertTicketCategory(): void { 
    this.insertTicketCategoryDTO.event_id = this.eventId;
    const organizationToken = this.tokenService.getToken();
    this.ticketCategoryService.insertTicketCategoryByOrganization(organizationToken, this.insertTicketCategoryDTO).subscribe({
      next: (response: any) => {
        
      },
      complete: () => {
        alert('Thêm loại vé thành công');
        this.router.navigate([`/organizer/events/${this.eventId}/ticket-categories`]);
      },
      error: (error: any) => {
        alert('Thêm loại vé thất bại: ' + error.message);
      }
    })
  }
}

import { ActivatedRoute, Router } from '@angular/router';
import { TicketCategoryService } from '../../services/ticket.category.service';
import { TicketCategory } from './../../model/ticket.category';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-ticket-order',
  templateUrl: './ticket-order.component.html',
  styleUrls: ['./ticket-order.component.scss']
})
export class TicketOrderComponent implements OnInit{
  ticketCategoryId: number = 0;
  ticketCategory?: TicketCategory;
  quantity: number = 1;
  isPressedAddToCart:boolean = false;

  constructor(
    private ticketCategoryService: TicketCategoryService, 
    private cartService: CartService,
    private router:Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if(idParam){
      this.ticketCategoryId = parseInt(idParam);
    }
    this.ticketCategoryService.getTicketCategoryById(this.ticketCategoryId).subscribe({
      next: (ticketCategory: any) => {
        this.ticketCategory = ticketCategory;
      },
      complete: () => {
        console.log('Completed');
      },
      error: (error: any) => {
        alert('Error fetching ticket category: ' + error.error);
      }
    });
  }

  addToCart(): void {
    this.isPressedAddToCart = true;
    if(this.ticketCategory && this.ticketCategory.remaining_count < this.quantity){ 
      alert('Số lượng vé còn lại không đủ');
      return;
    } else {
      if (this.ticketCategory) {
        this.cartService.addToCart(this.ticketCategory.id, this.quantity);
        alert('Thêm sản phẩm vào giỏ hàng thành công.');
        this.router.navigate(['/my-cart']);
      } else {
        // Xử lý khi product là null
        console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null.');
      }
    }
    debugger
  }
  
  increaseQuantity(): void {
    debugger
    this.quantity++;
  }
  
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}

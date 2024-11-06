import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { TicketCategory } from '../../model/ticket.category';
import { TicketCategoryService } from '../../services/ticket.category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-order-confirm',
  templateUrl: './ticket-order-confirm.component.html',
  styleUrls: ['./ticket-order-confirm.component.scss']
})

export class TicketOrderConfirmComponent {
  cartItems: { ticketCategory: TicketCategory, quantity: number }[] = [];
  couponCode: string = ''; // Mã giảm giá
  totalAmount: number = 0; // Tổng tiền

  constructor(
    private cartService: CartService,
    private ticketCategoryService: TicketCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {    
    // Lấy danh sách sản phẩm từ giỏ hàng
    debugger
    const cart = this.cartService.getCart();
    const ticketCategoryIds = Array.from(cart.keys()); // Chuyển danh sách ID từ Map giỏ hàng    

    // Gọi service để lấy thông tin sản phẩm dựa trên danh sách ID
    debugger
    this.ticketCategoryService.getTicketCategoriesByIds(ticketCategoryIds).subscribe({
      next: (ticketCategories) => {            
        debugger
        // Lấy thông tin sản phẩm và số lượng từ danh sách sản phẩm và giỏ hàng
        this.cartItems = ticketCategoryIds.map((ticketCategoryId) => {
          const ticketCategory = ticketCategories.find((p) => p.id === ticketCategoryId);
          return {
            ticketCategory: ticketCategory!,
            quantity: cart.get(ticketCategoryId)!
          };
        });
      },
      complete: () => {
        debugger;
        this.calculateTotal()
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
      }
    });        
  }
  // Hàm tính tổng tiền
  calculateTotal(): void {
      this.totalAmount = this.cartItems.reduce(
          (total, item) => total + item.ticketCategory.price * item.quantity,
          0
      );
  }

  clearCart() {
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }

}

import { TicketOrderDetail } from './../../model/ticket.order.detail';
import { TicketDTO } from './../../dtos/ticket/ticket.dto';
import { TicketService } from './../../services/ticket.service';
import { TicketOrderService } from './../../services/ticket.order.service';
import { Ticket } from './../../model/ticket';
import { TokenService } from './../../services/token.service';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { TicketCategory } from '../../model/ticket.category';
import { TicketCategoryService } from '../../services/ticket.category.service';
import { Router } from '@angular/router';
import { TicketOrder } from '../../model/ticket.order';
import { TicketOrderDTO } from '../../dtos/ticket-order/ticket.order.dto';
import { TicketOrderDetailDTO } from '../../dtos/ticket-order-detail/ticket.order.detail.dto';
import { TicketOrderDetailService } from '../../services/ticket.order.detail.service';

@Component({
  selector: 'app-ticket-order-confirm',
  templateUrl: './ticket-order-confirm.component.html',
  styleUrls: ['./ticket-order-confirm.component.scss']
})

export class TicketOrderConfirmComponent {
  cartItems: { ticketCategory: TicketCategory, quantity: number }[] = [];
  ticketOrderDTO: TicketOrderDTO = {
    user_id: 0,
    total_money: 0,
    payment_method: ''
  }

  couponCode: string = ''; // Mã giảm giá
  totalAmount: number = 0; // Tổng tiền

  constructor(
    private cartService: CartService,
    private ticketCategoryService: TicketCategoryService,
    private ticketOrderService: TicketOrderService,
    private ticketOrderDetailService: TicketOrderDetailService,
    private ticketService: TicketService,
    private tokenService: TokenService,
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

  makeOrder(){
    this.ticketOrderDTO.total_money = this.totalAmount;
    this.ticketOrderDTO.user_id = this.tokenService.getUserId();

    this.ticketOrderService.insertTicketOrder(this.ticketOrderDTO).subscribe({
      next: (response: any) => {
        this.insertTickets();
        this.insertTicketOrderDetails(response.id);
        this.clearCart();
        alert('Đặt vé thành công');
        this.router.navigate(['/']);
      },
      complete: () => {
        
      },
      error: (error: any) => {
        debugger
        alert('Đặt vé thất bại: ' + error.error.message);
      }
    });
  }

  async insertTickets() {
    for (const item of this.cartItems) {
      for (let i = 0; i < item.quantity; i++) {
        console.log(`Inserting ticket ${i + 1} for item:`, item);
        const ticketDTO: TicketDTO = {
          ticket_category_id: item.ticketCategory.id,
          user_id: this.tokenService.getUserId(),
        };
        try {
          await this.ticketService.insertTicket(ticketDTO).toPromise();
          console.log('Ticket inserted successfully');
        } catch (error) {
          console.error('Error inserting ticket:', error);
        }
      }
    }
  }

  insertTicketOrderDetails(orderId: number) {
    const ticketOrderDetailsDTO = this.cartItems.map(item => ({
      ticket_order_id: orderId,
      ticket_category_id: item.ticketCategory.id,
      number_of_tickets: item.quantity,
      total_money: item.ticketCategory.price * item.quantity
    }));

    ticketOrderDetailsDTO.forEach(detail => {
      this.ticketOrderDetailService.insertTicketOrderDetail(detail).subscribe({
        next: (response: any) => {
          console.log('Ticket order detail inserted successfully');
        },
        error: (error: any) => {
          console.error('Error inserting ticket order detail:', error);
        }
      });
    });
  }
}

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
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  paymentHandler: any = null;
  stripeAPIKey: any = 'pk_test_51QNppgG8KniinZDBIB2WnY3pPnzWSl6LnnkO3FixNj56frMRs6ccuVxyMdzdhiMUX21AWJfFmftpCm8PNYAgKZt800ziZJ0Hiu';

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
    this.invokeStripe() 
  }

  calculateTotal(): void {
      this.totalAmount = this.cartItems.reduce(
          (total, item) => total + item.ticketCategory.price * item.quantity,
          0
      );
  }

  clearCart(showAlert: boolean = true) {
    this.cartService.clearCart();
    if (showAlert) {
      alert('Đã xóa giỏ hàng');
    }
    this.router.navigate(['/']);
  }

  async makePayment() {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',
      token: async (stripeToken: any) => {
        const paymentDetails = {
          tokenId: stripeToken.id,
          email: stripeToken.email,
          created: new Date(stripeToken.created * 1000).toLocaleString(),
          card: {
            brand: stripeToken.card.brand,
            last4: stripeToken.card.last4,
            expMonth: stripeToken.card.exp_month,
            expYear: stripeToken.card.exp_year,
          },
        };
        console.log('Payment successful!', paymentDetails);
        await this.makeOrder();
      },
    });
  
    paymentHandler.open({
      name: 'Team 08',
      description: 'make the payment for the tickets',
      amount: (this.totalAmount / 25000) * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }
  async makeOrder() {
    this.ticketOrderDTO.total_money = this.totalAmount;
    this.ticketOrderDTO.user_id = this.tokenService.getUserId();
    this.ticketOrderDTO.payment_method = 'stripe';
    try {
      const response = await this.ticketOrderService.insertTicketOrder(this.ticketOrderDTO).toPromise();
      if (response) {
        await this.insertTicketOrderDetails(response.id);
      } else {
        alert('Tạo hoá đơn thất bại');
      }
      alert('Đặt vé thành công');
      this.clearCart();
      this.router.navigate(['/']);
    } catch (error) {
      alert('Đặt vé thất bại: ');
    }
  }

  async insertTicketOrderDetails(orderId: number) {
    const ticketOrderDetailsDTO = this.cartItems.map(item => ({
      ticket_order_id: orderId,
      ticket_category_id: item.ticketCategory.id,
      number_of_tickets: item.quantity,
      total_money: item.ticketCategory.price * item.quantity
    }));

    for (const detail of ticketOrderDetailsDTO) {
      try {
        const response = await this.ticketOrderDetailService.insertTicketOrderDetail(detail).toPromise();
        if (response) {
          await this.insertTickets(response.id, detail.ticket_category_id, detail.number_of_tickets);
        } else {
          console.error('Response is undefined');
        }
      } catch (error) {
        console.error('Error inserting ticket order detail:', error);
      }
    }
  }

  async insertTickets(ticketOrderDetailId: number, ticketCategoryId: number, quantity: number) {
    for (let i = 0; i < quantity; i++) {
      console.log(`Inserting ticket ${i + 1} for ticket category ID: ${ticketCategoryId}`);
      const ticketDTO: TicketDTO = {
        ticket_category_id: ticketCategoryId,
        ticket_order_detail_id: ticketOrderDetailId,
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

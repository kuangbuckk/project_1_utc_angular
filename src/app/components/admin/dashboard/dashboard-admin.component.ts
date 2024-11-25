import { CategoryService } from './../../../services/category.service';
import { Component, ChangeDetectorRef  } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { Category } from '../../../model/category';
import { Event } from '../../../model/event';
import { Ticket } from '../../../model/ticket';
import { EventService } from '../../../services/event.service';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent {
  categories: Category[] = [];
  events: Event[] = [];
  tickets: Ticket[] = [];

  ticketPriceMonthly: number[] = [];

  public pieChartEventOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartEventLabels: string[] = []
  public pieChartEventDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartEventLegend = true;
  public pieChartEventPlugins = [];
  

  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '07/2024', '08/2024', '09/2024', '10/2024', '11/2024', '12/2024' ],
    datasets: [
      { data: [] },
    ]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor(
    private categoryService: CategoryService,
    private eventService: EventService,
    private ticketService: TicketService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllEvents();
    this.getAllTickets();
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories: any) => {
        this.categories = categories;
        this.pieChartEventLabels = this.categories.map(category => category.name);
      },
      complete: () => {
        console.log('Completed');
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  getAllEvents() {
    this.eventService.getAllEventsAdmin().subscribe({
      next: (events: any) => {
        this.events = events;
        const eventCounts = this.categories.map(category => {
          return this.events.filter(event => event.category_name === category.name).length;
        });
        this.pieChartEventDatasets = [{ data: eventCounts }];
      },
      complete: () => {
        console.log('Completed');
      },
      error: (error: any) => {
        console.error('Error fetching events:', error);
      }
    });
  }

  getAllTickets() {
    this.ticketService.getAllTicketsAdmin().subscribe({
      next: (tickets: any) => {
        this.tickets = tickets;
        debugger
        this.updateLineChartData();
      },
      complete: () => {
        console.log('Completed');
      },
      error: (error: any) => {
        console.error('Error fetching tickets:', error);
      }
    });
  }

  updateLineChartData() {
    // Initialize an array to hold the total prices for each month from 7 to 12 (index corresponds to month)
    const monthlyData: { [key: number]: number } = {};

    // Initialize the monthly data with 0 for each month (7 to 12)
    for (let i = 7; i <= 12; i++) {
      monthlyData[i] = 0;
    }

    // Iterate over the tickets and aggregate the prices by month
    this.tickets.forEach(ticket => {
      // Extract the month from updated_at (second element of the array, 0-indexed)
      const month = ticket.updated_at[1]; // The second element represents the month

      // Add the ticket price to the corresponding month
      if (month >= 7 && month <= 12) {
        monthlyData[month] += ticket.price;
      }
    });

    // Now map the data to the corresponding month order from 7 to 12
    const data = [];
    for (let i = 7; i <= 12; i++) {
      data.push(monthlyData[i]);
    }

    this.barChartData = {
      datasets: [
        {
          data: data,  // Set the updated prices
          label: 'Ticket Price',
        }
      ]
    };

     // Update the line chart data
    //  this.barChartData.datasets[0] = {data: data};
    //  this.lineChartData.update();
    this.cdRef.detectChanges();
    debugger
  }
  
}

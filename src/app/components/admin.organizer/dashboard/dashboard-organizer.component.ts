import { TokenService } from './../../../services/token.service';
import { EventService } from 'src/app/services/event.service';
import { TicketService } from './../../../services/ticket.service';
import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { Ticket } from '../../../model/ticket';
import { Event } from '../../../model/event';

@Component({
  selector: 'app-dashboard-organizer',
  templateUrl: './dashboard-organizer.component.html',
  styleUrls: ['./dashboard-organizer.component.scss']
})
export class DashboardOrganizerComponent {
  tickets: Ticket[] = [];
  events: Event[] = [];
  organization_name: string = '';

  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '07/2024', '08/2024', '09/2024', '10/2024', '11/2024', '12/2024' ],
    datasets: [
      { 
        data: [],
        backgroundColor: ["cyan"],
        hoverBackgroundColor: ["darkcyan"],
       },
    ]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  public pieChartEventStatusOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartEventStatusLabels = [ ['Đang diễn ra'], ['Chờ duyệt'], ['Huỷ'], ['Đã xong']];
  public pieChartEventStatusDatasets = [ {
    data: [ 0, 0, 0, 0 ],
    backgroundColor: ["cyan", "blue", "red", "purple"],
    hoverBackgroundColor: ["darkcyan", "darkblue", "darkred", "darkpurple"],
  } ];
  public pieChartEventStatusLegend = true;
  public pieChartEventStatusPlugins = [];
  
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };


  constructor(
    private ticketService: TicketService,
    private tokenService: TokenService,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {  
    this.getAllEvents();
    this.getAllTickets();
    
    this.organization_name = localStorage.getItem('organization.name') || '';
    const storedData = localStorage.getItem('user');
    if (storedData) {
      const userData = JSON.parse(storedData);
      this.organization_name = userData.organization.name;
    }
  }

  getAllEvents(){
    const organizationId = this.tokenService.getOrganizationId();
    debugger
    this.eventService.getAllEventsByOrganizationId(organizationId).subscribe({
      next: (events: any) => {
        this.events = events;
        const eventStatusCounts = [0, 0, 0, 0]; // Active, Pending, Cancelled
        debugger
        this.events.forEach(event => {
          if (event.status === 'active') {
            eventStatusCounts[0]++;
          } else if (event.status === 'completed') {
            eventStatusCounts[3]++;
          } else if (event.status === 'pending') {
            eventStatusCounts[1]++;
          } else if (event.status === 'cancelled') {
            eventStatusCounts[2]++;
          }
        });
        debugger
        this.pieChartEventStatusDatasets = [{ 
          data: eventStatusCounts,
          backgroundColor: ["green", "blue", "red", "purple"],
          hoverBackgroundColor: ["darkgreen", "darkblue", "darkred", "darkpurple"],
        }];
      },
      complete: () => {
        console.log('Completed');
      },
      error: (error: any) => {
        console.error('Error fetching events:', error);
      }
    });
  }

  getAllTickets(){
    this.ticketService.getAllTicketsOrganizer().subscribe({
      next: (tickets: any) => {
        this.tickets = tickets;
        this.tickets = this.tickets.filter(ticket => ticket.status === 'success');
        // debugger
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
          label: 'Doanh thu (VNĐ)',
          backgroundColor: ["cyan"],
          hoverBackgroundColor: ["darkcyan"],
        }
      ]
    };
    debugger
  }
}

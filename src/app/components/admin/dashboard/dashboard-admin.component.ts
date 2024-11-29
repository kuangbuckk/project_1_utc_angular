import { OrganizationService } from './../../../services/organization.service';
import { Organization } from './../../../model/organization';
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
  organizations: Organization[] = [];
  events: Event[] = [];
  tickets: Ticket[] = [];

  ticketPriceMonthly: number[] = [];

  // Thống kê thể loại sự kiện
  public pieChartEventOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartEventLabels: string[] = []
  public pieChartEventDatasets = [ {
    data: [ 300, 500, 100, 0 ],
    backgroundColor: ["#00bcd4", "#3f51b5", "#e91e63", "#ff9800", "#4caf50", "#9c27b0", "#607d8b"],
    hoverBackgroundColor: ["#0097a7", "#303f9f", "#c2185b", "#f57c00", "#388e3c", "#7b1fa2", "#455a64"],	
  } ];
  public pieChartEventLegend = true;
  public pieChartEventPlugins = [];

  // Thống kê tình trạng sự kiện
  public pieChartEventStatusOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartEventStatusLabels = [ ['Đang diễn ra'], ['Chờ duyệt'], ['Huỷ'], ['Đã xong']];
  public pieChartEventStatusDatasets = [ {
    data: [ 0, 0, 0, 0 ],
    backgroundColor: ["#00bcd4", "#3f51b5", "#e91e63", "#ff9800"],
    hoverBackgroundColor: ["#0097a7", "#303f9f", "#c2185b", "#f57c00"],
  } ];
  public pieChartEventStatusLegend = true;
  public pieChartEventStatusPlugins = [];
  
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#37474f'  // Darker text for better readability
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 2,  // Adds a nice border between segments
        borderColor: '#ffffff'  // White borders between segments
      }
    }
  };

  //Thống kê số sự kiện được ban tổ chức làm ra
  public pieChartEventByOrganizationOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartEventByOrganizationLabels: string[] = [];
  public pieChartEventByOrganizationDatasets = [ {
    data: [ 0, 0, 0, 0 ],
    backgroundColor: ["#00bcd4", "#3f51b5", "#e91e63", "#ff9800", "#4caf50"],
    hoverBackgroundColor: ["#0097a7", "#303f9f", "#c2185b", "#f57c00", "#388e3c"],
  } ];
  public pieChartEventByOrganizationLegend = true;
  public pieChartEventByOrganizationPlugins = [];
  

  // public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  // public pieChartDatasets = [ {
  //   data: [ 300, 500, 100 ],
  //   backgroundColor: ["red", "green", "blue"],
  //   hoverBackgroundColor: ["darkred", "darkgreen", "darkblue"],
  // } ];
  // public pieChartLegend = true;
  // public pieChartPlugins = [];

  // Thống kê doanh thu
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

  constructor(
    private categoryService: CategoryService,
    private organizationService: OrganizationService,
    private eventService: EventService,
    private ticketService: TicketService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllOrganizations();
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

  getAllOrganizations() {
    this.organizationService.getOrganizations().subscribe({
      next: (organizations: any) => {
        this.organizations = organizations;
        this.pieChartEventByOrganizationLabels = this.organizations.map(organization => organization.name);
      },
      complete: () => {
        console.log('Completed');
      },
      error: (error: any) => {
        console.error('Error fetching organizations:', error);
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
        this.pieChartEventDatasets = [{ 
          data: eventCounts,
          backgroundColor: ["cyan", "blue", "red", "purple", "yellow", "orange", "brown"],
          hoverBackgroundColor: ["darkcyan", "darkblue", "darkred", "darkpurple", "darkyellow", "darkorange", "darkbrown"],	 
        }];

        const eventStatusCounts = [0, 0, 0, 0]; // Active, Pending, Cancelled

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

        this.pieChartEventStatusDatasets = [{ 
          data: eventStatusCounts,
          backgroundColor: ["green", "blue", "red", "purple"],
          hoverBackgroundColor: ["darkgreen", "darkblue", "darkred", "darkpurple"],
        }];

        const eventByOrganizationCounts = this.organizations.map(organization => {
          return this.events.filter(event => event.organization_name === organization.name).length;
        });
        this.pieChartEventByOrganizationDatasets = [{ 
          data: eventByOrganizationCounts,
          backgroundColor: ["cyan", "blue", "red", "purple", "yellow"],
          hoverBackgroundColor: ["darkcyan", "darkblue", "darkred", "darkpurple", "darkyellow"],
        }];
        // this.cdRef.detectChanges();
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
        this.tickets = this.tickets.filter(ticket => ticket.status === 'success');
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
          label: 'Doanh thu (VNĐ)',
          backgroundColor: ["cyan"],
          hoverBackgroundColor: ["darkcyan"],
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

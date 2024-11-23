import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.router.url === '/organizer') {
      this.router.navigate(['/organizer/events']);
    }
  }

}

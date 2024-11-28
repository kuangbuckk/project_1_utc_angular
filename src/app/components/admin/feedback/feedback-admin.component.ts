import { Router } from '@angular/router';
import { FeedbackService } from './../../../services/feedback.service';
import { Component } from '@angular/core';
import { Feedback } from '../../../model/feedback';

@Component({
  selector: 'app-feedback-admin',
  templateUrl: './feedback-admin.component.html',
  styleUrls: ['./feedback-admin.component.scss']
})
export class FeedbackAdminComponent {
  feedbacks: Feedback[] = [];

  constructor(
    private feedbackService: FeedbackService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks() {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (response: Feedback[]) => {
        this.feedbacks = response;
        debugger;
        this.feedbacks = this.feedbacks.sort((a, b) => b.id - a.id);
      },
      complete: () => {
      },
      error: (error: any) => {
        console.log('error: ', error);
      }
    })
  }

  updateFeedbackStatus(feedbackId: number, status: string) {
    this.feedbackService.updateFeedbackStatus(feedbackId, status).subscribe({
      next: (response: any) => {
        this.getFeedbacks();
      },
      complete: () => {
      },
      error: (error: any) => {
        console.log('error: ', error);
      }
    })
  }

  deleteFeedback(feedbackId: number) { 
    this.feedbackService.deleteFeedback(feedbackId).subscribe({
      next: (response: any) => {
        alert('Đã xoá góp ý');
        this.getFeedbacks();
      },
      complete: () => {
      },
      error: (error: any) => {
        console.log('error: ', error);
      }
    })
  }

  responseFeedback(feedback: Feedback) {
    this.router.navigate(['/admin/feedbacks/response', feedback.id]);
  }
}

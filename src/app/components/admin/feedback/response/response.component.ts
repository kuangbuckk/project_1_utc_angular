import { FeedbackService } from './../../../../services/feedback.service';
import { Feedback } from './../../../../model/feedback';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailService } from './../../../../services/email.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent {
  responseDTO: any = {
    recipient: '',
    msgBody: '',
    subject: ''
  }

  constructor(
    private emailService: EmailService,
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const feedbackId = this.activatedRoute.snapshot.params['id'];
    if (feedbackId) this.getFeedbackDetails(parseInt(feedbackId, 10)); 
  }

  getFeedbackDetails(feedbackId: number) {
    this.feedbackService.getFeedbackById(feedbackId).subscribe({
      next: (feedback: Feedback) => {
        this.responseDTO.recipient = feedback.email;
        debugger
      },
      error: (error: any) => {
        console.log('error: ', error);
      }
    });
  }

  sendResponse() {
    this.emailService.sendEmail(this.responseDTO).subscribe({
      next: (response: any) => {
        alert('Gửi phản hồi thành công');
        this.router.navigate(['/admin/feedbacks']);
      },
      complete: () => {
      },
      error: (error: any) => {
        console.log('error: ', error.error);
      }
    })
  }
}

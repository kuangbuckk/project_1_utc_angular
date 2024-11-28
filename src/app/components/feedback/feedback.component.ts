import { TokenService } from './../../services/token.service';
import { FeedbackService } from './../../services/feedback.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { FeedbackDTO } from '../../dtos/feedback/feedback.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  @ViewChild('feedbackForm') feedbackForm!: NgForm;
  feedbackDTO: FeedbackDTO = {
    content: '',
    email: '',
    type: '',
    user_id: 0
  }

  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  sendFeedback() {
    this.feedbackDTO.user_id = this.tokenService.getUserId();
    this.feedbackService.sendFeedback(this.feedbackDTO).subscribe({
      next: (response: any) => {
        alert('Gửi góp ý thành công');
        this.router.navigate(['/']);
      },
      complete: () => {
      },
      error: (error: any) => {
        console.log('error: ', error.error);
      }
    })
  }
}

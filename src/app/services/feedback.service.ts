import { FeedbackDTO } from './../dtos/feedback/feedback.dto';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../model/feedback';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
    private apiFeedback = `${environment.apiBaseUrl}/feedbacks`;

    constructor(private http: HttpClient) { }

    getAllFeedbacks(): Observable<Feedback[]> {
        return this.http.get<Feedback[]>(this.apiFeedback);
    }

    getFeedbackById(feedbackId: number): Observable<Feedback> {
        return this.http.get<Feedback>(`${this.apiFeedback}/${feedbackId}`);
    }

    sendFeedback(FeedbackDTO: FeedbackDTO): Observable<any> {
        return this.http.post(this.apiFeedback, FeedbackDTO);
    }

    updateFeedbackStatus(feedbackId: number, status: string): Observable<any> {
        const params = new HttpParams()
            .set('status', status);
        return this.http.patch(`${this.apiFeedback}/${feedbackId}/status`, {}, { params });
    }

    deleteFeedback(feedbackId: number): Observable<any> {
        return this.http.delete(`${this.apiFeedback}/${feedbackId}`);
    }
}
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmailService {
    private apiBaseURL = `${environment.apiBaseUrl}/emails`

    constructor(private http: HttpClient) { }

    sendEmail(emailDTO: any):Observable<any>{ 
        return this.http.post(this.apiBaseURL + '/sendEmail', emailDTO)
    }
}
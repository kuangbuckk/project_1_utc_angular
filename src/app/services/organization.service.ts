import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '../model/organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private apiGetOrganization = `${environment.apiBaseUrl}/organizations`

  constructor(private http: HttpClient) { }

  getOrganizationById(id: number):Observable<Organization>{
      return this.http.get<Organization>(`${this.apiGetOrganization}/${id}`)
  }
}
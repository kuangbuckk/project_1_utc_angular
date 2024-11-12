import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '../model/organization';
import { OrganizationDTO } from '../dtos/organization/organization.dto';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private apiGetOrganization = `${environment.apiBaseUrl}/organizations`

  constructor(private http: HttpClient) { }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.apiGetOrganization)
  }

  getOrganizationById(id: number):Observable<Organization>{
      return this.http.get<Organization>(`${this.apiGetOrganization}/${id}`)
  }

  insertOrganization(organizationDTO: OrganizationDTO): Observable<Organization> {
    return this.http.post<Organization>(this.apiGetOrganization, organizationDTO)
  }

  updateOrganization(id: number, organizationDTO: OrganizationDTO): Observable<Organization> {
    return this.http.put<Organization>(`${this.apiGetOrganization}/${id}`, organizationDTO)
  }

  deleteOrganization(id: number): Observable<any> {
    return this.http.delete(`${this.apiGetOrganization}/${id}`)
  }
}
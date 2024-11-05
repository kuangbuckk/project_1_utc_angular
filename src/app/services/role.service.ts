import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
    private apiGetRoles = `${environment.apiBaseUrl}/roles`

    constructor(private http: HttpClient) { }
    getRoles():Observable<any>{
        return this.http.get<any[]>(this.apiGetRoles)
    }
}

import { RegisterDTO } from '../dtos/user/register.dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegsiter = `${environment.apiBaseUrl}/users/register`
  private apiLogin = `${environment.apiBaseUrl}/users/login`

  private apiConfig = {
    headers: this.createrHeader()
  }
  constructor(private http: HttpClient) { }

  register(registerDTO: RegisterDTO):Observable<any>{
    return this.http.post(this.apiRegsiter, registerDTO, this.apiConfig)
  }

  login(loginDTO: LoginDTO):Observable<any>{
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig)
  }

  private createrHeader(): HttpHeaders{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return headers;
  }
}

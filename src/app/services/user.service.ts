import { RegisterDTO } from '../dtos/user/register.dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../enviroments/enviroment';
import { UserResponse } from '../responses/user.response';
import { UserUpdateDTO } from '../dtos/user/user.update.dto';
import { UserUpdateAdminDTO } from '../dtos/user/user.admin.update.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegsiter = `${environment.apiBaseUrl}/users/register`
  private apiLogin = `${environment.apiBaseUrl}/users/login`
  private apiAdminRetrieveAllUsers = `${environment.apiBaseUrl}/users/admin/retrieveAll`
  private apiuserDetail = `${environment.apiBaseUrl}/users/details`
  private apiUpdateUser = `${environment.apiBaseUrl}/users/update`

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

  updateUserInfo(token: string, userUpdateDTO: UserUpdateDTO):Observable<any>{
    return this.http.put(this.apiUpdateUser, userUpdateDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    })
  }

  retrieveAllUsers():Observable<UserResponse[]>{
    return this.http.get<UserResponse[]>(this.apiAdminRetrieveAllUsers)
  }

  updateUserAdmin(userId: number, userUpdateAdminDTO: UserUpdateAdminDTO):Observable<any>{
    return this.http.put(`${environment.apiBaseUrl}/users/admin/updateUser/${userId}`, userUpdateAdminDTO)
  }

  getUserDetail(token: string) {
    return this.http.post(this.apiuserDetail, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    }, this.apiConfig)
  }

  getUserByIdAdminOnly(userId: number):Observable<UserResponse>{
    return this.http.get<UserResponse>(`${environment.apiBaseUrl}/users/admin/${userId}`)
  }

  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger
      if(userResponse == null || !userResponse) {
        return;
      }
      // Convert the userResponse object to a JSON string
      const userResponseJSON = JSON.stringify(userResponse);  
      // Save the JSON string to local storage with a key (e.g., "userResponse")
      localStorage.setItem('user', userResponseJSON);  
      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error saving user response to local storage:', error);
    }
  }

  getUserResponseFromLocalStorage():UserResponse | null {
    try {
      // Retrieve the JSON string from local storage using the key
      const userResponseJSON = localStorage.getItem('user'); 
      if(userResponseJSON == null || userResponseJSON == undefined) {
        return null;
      }
      // Parse the JSON string back to an object
      const userResponse = JSON.parse(userResponseJSON!);  
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error('Error retrieving user response from local storage:', error);
      return null; // Return null or handle the error as needed
    }
  }
  
  removeUserFromLocalStorage():void {
    try {
      // Remove the user data from local storage using the key
      localStorage.removeItem('user');
      console.log('User data removed from local storage.');
    } catch (error) {
      console.error('Error removing user data from local storage:', error);
      // Handle the error as needed
    }
  }

  private createrHeader(): HttpHeaders{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return headers;
  }
}

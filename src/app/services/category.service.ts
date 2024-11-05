import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiGetCategories = `${environment.apiBaseUrl}/events`

  constructor(private http: HttpClient) { }

  getCategories():Observable<Category[]>{
      return this.http.get<Category[]>(this.apiGetCategories)
  }
}
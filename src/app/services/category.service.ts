import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { CategoryInsertDTO } from '../dtos/category/insert.category.dto';
import { CategoryUpdateDTO } from '../dtos/category/update.category.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiBaseURL = `${environment.apiBaseUrl}/categories`

  constructor(private http: HttpClient) { }

  //trả về danh sách các category từ server và mapping nó với model Category
  getCategories():Observable<Category[]>{
      return this.http.get<Category[]>(this.apiBaseURL)
  }

  getCategoryById(id: number):Observable<Category>{
    return this.http.get<Category>(`${this.apiBaseURL}/${id}`)
  }

  insertCategory(categoryDTO: CategoryInsertDTO):Observable<any>{ 
    return this.http.post(this.apiBaseURL, categoryDTO)
  }

  updateCategory(id: number, categoryUpdateDTO: CategoryUpdateDTO):Observable<void>{ 
    return this.http.put<void>(`${this.apiBaseURL}/${id}`, categoryUpdateDTO)
  }

  deleteCategory(id: number):Observable<any>{
    return this.http.delete(`${this.apiBaseURL}/${id}`)
  }
}
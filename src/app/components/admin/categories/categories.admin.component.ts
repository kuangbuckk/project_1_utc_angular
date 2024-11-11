import { Component, OnInit } from '@angular/core';
import { Category } from '../../../model/category';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories.admin.component.html',
  styleUrls: ['./categories.admin.component.scss']
})
export class CategoriesAdminComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  //trả về danh sách các Category từ Observable và gán vào biến categories -> sau đó hiện lên HTML
  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        debugger;
        this.categories = categories;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  insertCategory() {
    debugger
    // Điều hướng đến trang detail-category với categoryId là tham số
    this.router.navigate(['/admin/categories/insert']);
  } 

  editCategory(id: number) {
    this.router.navigate(['/admin/categories/edit', id]);
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (response: any) => {
        alert('Delete category successfully');
        this.getCategories();
      },
      error: (error: any) => {
        console.error('Error deleting category:', error);
      }
    });
  }
}

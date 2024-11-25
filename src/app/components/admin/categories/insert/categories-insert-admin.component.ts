import { Component } from '@angular/core';
import { CategoryInsertDTO } from 'src/app/dtos/category/insert.category.dto';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-insert-admin',
  templateUrl: './categories-insert-admin.component.html',
  styleUrls: ['./categories-insert-admin.component.scss']
})
export class CategoriesInsertAdminComponent {
  insertCategoryDTO: CategoryInsertDTO = {
    name: '',    
  };

  constructor(
    private router: Router,
    private categoryService: CategoryService,
  ) { }

  insertCategory(): void { 
    this.categoryService.insertCategory(this.insertCategoryDTO).subscribe({
      next: (response: any) => {
        alert('Thêm category thành công');
        this.router.navigate(['/admin/categories']);
      },
      error: (error: any) => {
        alert('Thêm category thất bại: ' + error.error);
      }
    })
  }
}

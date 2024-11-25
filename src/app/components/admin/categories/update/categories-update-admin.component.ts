import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../../../model/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-update-admin',
  templateUrl: './categories-update-admin.component.html',
  styleUrls: ['./categories-update-admin.component.scss']
})
export class CategoriesUpdateAdminComponent implements OnInit {
  categoryId: number = 0;
  category: Category;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
  ) { 
    this.category = {} as Category;
  }

  ngOnInit() {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if(idParam){
      this.categoryId = parseInt(idParam);
    }
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (category: Category) => {
        // Gán category vào biến category
        this.category = category;
        debugger;
      },
      error: (error: any) => {
        console.error('Error fetching category:', error);
      }
    })
  }

  updateCategory() {
    this.categoryService.updateCategory(this.categoryId, this.category).subscribe({
      next: () => {
        alert('Update category successfully');
        this.router.navigate(['/admin/categories']);
      },
      error: (error: any) => {
        alert('Error updating category:' + error.error);
      }
    });
  }
}

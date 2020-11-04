import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ["name", "description", 'star'];
  categories: any[];

  constructor(
    private catService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.catService.getAdminCategories().subscribe((data) => {
      if (data.response.success) {
        this.categories = data.response.categories;
      }
    });
  }

  onDeleteCategory(id) {
    this.catService.deleteCategory(id).subscribe((data) => {
      if (data.response.success) {
        this.snackBar.open("Category Deleted", "success", { duration: 5000 });
        this.getCategories();
      }
    });
  }
}

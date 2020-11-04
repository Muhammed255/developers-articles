import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";

const BACKEND_URL = environment.backendUrl + "/categories/";

@Injectable({
  providedIn: "root",
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  newCategory(name: string, description: string) {
    const categoryData = {name, description};
    return this.http.post<{response: any}>(BACKEND_URL + 'new-cat', categoryData);
  }

  getAllCategories() {
    return this.http.get<{response: any}>(BACKEND_URL + 'get-all');
  }
  
  getAdminCategories() {
    return this.http.get<{response: any}>(BACKEND_URL + 'admin-categories');
  }

  findOneCategory(id: string) {
    return this.http.get<{response: any}>(BACKEND_URL + id);
  }

  updateCategory(id: string, name: string, description: string) {
    const categoryData = {name, description};
    return this.http.put<{response: any}>(BACKEND_URL + id, categoryData);
  }

  deleteCategory(id: string) {
    return this.http.delete<{response: any}>(BACKEND_URL + id);
  }


  getTopicsByCategory() {
    return this.http.get<{response: any}>(BACKEND_URL + 'join')
  }

}

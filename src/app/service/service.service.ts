import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url: string = "http://127.0.0.1:3000/categories";
  searchUrl: string = "http://127.0.0.1:3000/categories?filter[where][name][eq]=";
  urlD: string = "http://127.0.0.1:3000/categories/";
  oneCategory= [];
  id:number;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.url);
  }

  addCategory(category) {
    return this.http.post(this.url, category);
  }

  deleteCategory(id) {
    return this.http.delete(this.urlD + id);
  }

  searchFunction(name) {
    return this.http.get(this.searchUrl + name)
  }

  updateCategory(id, oneCategory) {
    return this.http.put(this.urlD + id, oneCategory);
  }

  getCategoryData (id) {
    return this.http.get(this.urlD + id);
  }

}

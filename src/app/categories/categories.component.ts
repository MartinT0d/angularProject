import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service/service.service'


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private http: HttpClient, private service: ServiceService) { }

  id: number;
  oneCategory: object = [];
  categories: object[];
  searchByName: string;
  openForm: boolean = false;
  openUpdateForm: boolean = false;


  getData = function () {
    this.service.getData()
    .subscribe((data) =>{
      this.categories = data;
      console.log(data)
    } );
  }

  addCategory = function (category) {
    this.oneCategory = {
      'name': category.name,
      'description': category.description
    }
    this.service.addCategory(this.oneCategory)
    .subscribe(data => {
      this.oneCategory = data;
      this.getData();
    });
    this.openForm = false;
  }

  deleteCategory(id) {
    this.service.deleteCategory(id)
    .subscribe(data => {
      this.getData();
    })
  }

  addNewCategory = function () {
    this.openForm = true;
  }

  closeForm = function () {
    this.openForm = false;
  }

  closeUpdateForm = function () {
    this.openUpdateForm = false;
  }

  searchFunc = function () {
    this.service.searchFunction(this.searchByName)
    .subscribe((data) => {
      if (this.searchByName === "") {
        this.getData()
      }
      else if (this.searchByName) {
        this.categories = data;
      }
    })
  }

  checkInput = function () {
    if (this.searchByName.trim() == "") {
      this.getData()
    }
  }


  updateCategory = function () {
    this.service.updateCategory(this.id, this.oneCategory)
    .subscribe(data => {
      console.log(data);
      this.getData();
      this.openUpdateForm = false;
    })

  }

  getCategoryData = function (id) {
    this.openUpdateForm = true;
    this.service.getCategoryData(id)
    .subscribe(
      (category) => {
      this.id = category.id,
        this.oneCategory = {
          "name": category.name,
          "description": category.description
        }
      }
    )
  }

  ngOnInit() {
    this.getData();
  }
}

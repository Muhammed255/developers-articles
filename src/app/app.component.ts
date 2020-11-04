import { Component, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from '@angular/material';
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "./services/auth.service";
import { CategoryService } from "./services/category.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  categories: any[];
  auth_user: any;
  userImage = 'assets/faces/face-0.jpg';
  @ViewChild(MatMenuTrigger, {static: true}) topicsTriggerMenu: MatMenuTrigger;

  constructor(
    public authService: AuthService,
    private catService: CategoryService,
    public flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    this.getAllCategories();
    if(localStorage.getItem("userId")) {
      this.authService.findUserById(localStorage.getItem("userId")).subscribe(data => {
        this.auth_user = data.response.user;
      })
    }
  }


  ngAfterViewInit() {
  }

  getAllCategories() {
    this.catService.getTopicsByCategory().subscribe((data) => {
      if (data.response.success) {
        this.categories = data.response.topicsByCat;
      } else {
        this.flashMessagesService.show(data.response.msg, {
          cssClass: "alert-danger",
          timeout: 3000,
        });
      }
    });
  }
}

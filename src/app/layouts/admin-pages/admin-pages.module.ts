import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminPagesComponent } from "./admin-pages.component";

import { AdminPagesRoutingModule } from "./admin-pages-routing.module";
import { MaterialModule } from "src/app/shared/material.module";
import { CategoriesComponent } from "src/app/admin-pages/categories/categories.component";
import { AddEditCategoryComponent } from "src/app/admin-pages/add-edit-category/add-edit-category.component";
import { TopicsComponent } from "src/app/admin-pages/topics/topics.component";
import { AddEditTopicComponent } from "src/app/admin-pages/add-edit-topic/add-edit-topic.component";
import { AddEditPostComponent } from "src/app/admin-pages/add-edit-post/add-edit-post.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PostsComponent } from 'src/app/admin-pages/posts/posts.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthProfileModule } from 'src/app/pages/auth-profile/auth-profile.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SingleArticleComponent } from 'src/app/admin-pages/single-article/single-article.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AdminPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    AuthProfileModule,
    AngularEditorModule
  ],
  declarations: [
    CategoriesComponent,
    AddEditCategoryComponent,
    TopicsComponent,
    AddEditTopicComponent,
    PostsComponent,
    SingleArticleComponent
  ]
})
export class AdminPagesModule {}

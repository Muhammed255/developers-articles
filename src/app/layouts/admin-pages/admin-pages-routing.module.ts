import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddEditCategoryComponent } from "src/app/admin-pages/add-edit-category/add-edit-category.component";
import { AddEditPostComponent } from "src/app/admin-pages/add-edit-post/add-edit-post.component";
import { AddEditTopicComponent } from "src/app/admin-pages/add-edit-topic/add-edit-topic.component";
import { CategoriesComponent } from "src/app/admin-pages/categories/categories.component";
import { PostsComponent } from "src/app/admin-pages/posts/posts.component";
import { SingleArticleComponent } from 'src/app/admin-pages/single-article/single-article.component';
import { TopicsComponent } from "src/app/admin-pages/topics/topics.component";
import { AdminAuthGuard } from "src/app/guards/auth.guard";
import { AuthProfileComponent } from "src/app/pages/auth-profile/auth-profile.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("../../pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
        data: { breadcrumb: "Dashboard" },
        canActivate: [AdminAuthGuard],
      },
      {
        path: "add-category",
        component: AddEditCategoryComponent,
        data: { breadcrumb: "Add | Edit Category" },
        canActivate: [AdminAuthGuard],
      },
      {
        path: "category/:catId",
        component: AddEditCategoryComponent,
        data: { breadcrumb: "Add | Edit Category" },
        canActivate: [AdminAuthGuard],
      },
      {
        path: "categories",
        component: CategoriesComponent,
        data: { breadcrumb: "Categories" },
        canActivate: [AdminAuthGuard],
      },
      {
        path: "add-topic",
        component: AddEditTopicComponent,
        data: { breadcrumb: "Add | Edit Topic" },
        canActivate: [AdminAuthGuard],
      },
      {
        path: "topic/:topicId",
        component: AddEditTopicComponent,
        data: { breadcrumb: "Add | Edit Topic" },
        canActivate: [AdminAuthGuard],
      },
      {
        path: "topics",
        component: TopicsComponent,
        data: { breadcrumb: "Topics" },
        canActivate: [AdminAuthGuard],
      },
      // {
      //   path: 'add-post',
      //   component: AddEditPostComponent,
      //   data: { breadcrumb: "Add | Edit Post" },
      //   canActivate: [AdminAuthGuard]
      // },
      {
        path: 'post/:postId',
        component: SingleArticleComponent,
        data: { breadcrumb: "Single Post" },
        canActivate: [AdminAuthGuard]
      },
      {
        path: "posts",
        component: PostsComponent,
        data: { breadcrumb: "Posts" },
        canActivate: [AdminAuthGuard],
      },
      {
        path: ":username",
        component: AuthProfileComponent,
        canActivate: [AdminAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminAuthGuard],
})
export class AdminPagesRoutingModule {}

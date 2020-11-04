import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { AdminSignupComponent } from "src/app/pages/admin-signup/admin-signup.component";
import { AuthProfileComponent } from "src/app/pages/auth-profile/auth-profile.component";
import { EmailVerificationComponent } from "src/app/pages/email-verification/email-verification.component";
import { LoginComponent } from "src/app/pages/login/login.component";
import { PostsComponent } from "src/app/pages/posts/posts.component";
import { ResendConfirmationComponent } from "src/app/pages/resend-confirmation/resend-confirmation.component";
import { SignupComponent } from "src/app/pages/signup/signup.component";
import { SingleArticlePostComponent } from "src/app/pages/single-article-post/single-article-post.component";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "wall", component: PostsComponent },
      { path: "home", component: PostsComponent, canActivate: [AuthGuard] },
      { path: "login", component: LoginComponent },
      { path: "signup", component: SignupComponent },
      { path: "admin-signup", component: AdminSignupComponent },
      { path: "email-confirmation", component: EmailVerificationComponent },
      {
        path: "auth/resend-confirmation",
        component: ResendConfirmationComponent,
      },
      { path: "articles/:articleId", component: SingleArticlePostComponent },
      {
        path: ":username",
        component: AuthProfileComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class UserPagesRoutingModule {}

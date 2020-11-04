import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserPagesComponent } from "./user-pages.component";

import { UserPagesRoutingModule } from "./user-pages-routing.module";
import { MaterialModule } from "src/app/shared/material.module";
import { FlashMessagesModule } from "angular2-flash-messages";
import { PostsComponent } from "src/app/pages/posts/posts.component";
import { LoginComponent } from "src/app/pages/login/login.component";
import { SignupComponent } from "src/app/pages/signup/signup.component";
import { AdminSignupComponent } from "src/app/pages/admin-signup/admin-signup.component";
import { EmailVerificationComponent } from "src/app/pages/email-verification/email-verification.component";
import { ResendConfirmationComponent } from 'src/app/pages/resend-confirmation/resend-confirmation.component';
import { SingleArticlePostComponent } from 'src/app/pages/single-article-post/single-article-post.component';
import { AuthProfileComponent } from 'src/app/pages/auth-profile/auth-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthProfileModule } from 'src/app/pages/auth-profile/auth-profile.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    UserPagesRoutingModule,
    FlashMessagesModule,
    FormsModule,
    ReactiveFormsModule,
    AuthProfileModule
  ],
  declarations: [
    PostsComponent,
    LoginComponent,
    SignupComponent,
    AdminSignupComponent,
    EmailVerificationComponent,
    ResendConfirmationComponent,
    SingleArticlePostComponent
  ]
})
export class UserPagesModule {}

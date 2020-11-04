import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlashMessagesService, FlashMessagesModule} from 'angular2-flash-messages'


import { MaterialModule } from './shared/material.module';
import { SignupComponent } from './pages/signup/signup.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { ResendConfirmationComponent } from './pages/resend-confirmation/resend-confirmation.component';
import { LoginComponent } from './pages/login/login.component';
import { PostsComponent } from './pages/posts/posts.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './Interceptors/auth-interceptor';
import { AdminAuthGuard, AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from './services/category.service';
import { TopicService } from './services/topic.service';
import { ArticlePostService } from './services/article-post.service';
import {SingleArticlePostComponent} from './pages/single-article-post/single-article-post.component'
import { AuthProfileComponent } from './pages/auth-profile/auth-profile.component';
import { AdminSignupComponent } from './pages/admin-signup/admin-signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { UserPagesComponent } from './layouts/user-pages/user-pages.component';
import { AdminPagesComponent } from './layouts/admin-pages/admin-pages.component';
import { SidenavModule } from './theme/sidenav/sidenav.module';
import { MenuService } from './services/menu.service';
import { AddEditPostComponent } from './admin-pages/add-edit-post/add-edit-post.component';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UserPagesComponent,
    AdminPagesComponent,
    AddEditPostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlashMessagesModule.forRoot(),
    SidenavModule,
    AngularEditorModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthGuard,
    AuthService,
    AdminAuthGuard,
    FlashMessagesService,
    CategoryService,
    TopicService,
    ArticlePostService,
    MenuService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddEditPostComponent]
})
export class AppModule { }

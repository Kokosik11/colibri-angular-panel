import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {TokenInterceptor} from "./shared/classes/token.interceptor";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { MainComponent } from './views/main/main.component';
import { ContentComponent } from './views/content/content.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { FaqComponent } from './views/faq/faq.component';
import { ServicesComponent } from './views/services/services.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectViewComponent } from './views/project-view/project-view.component';
import { ProjectCreateComponent } from './views/project-create/project-create.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    MainComponent,
    ContentComponent,
    ProjectsComponent,
    FaqComponent,
    ServicesComponent,
    ProjectComponent,
    ProjectViewComponent,
    ProjectCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

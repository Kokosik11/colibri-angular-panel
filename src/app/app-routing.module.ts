import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {AuthGuard} from "./shared/classes/auth.guard";
import {MainLayoutComponent} from "./shared/layouts/main-layout/main-layout.component";
import {MainComponent} from "./main/main.component";
import {ContentComponent} from "./content/content.component";

const routes: Routes = [
  { path: '', component: MainLayoutComponent, canActivate: [AuthGuard], children: [
      { path: '', component: MainComponent },
      { path: 'content', component: ContentComponent }
    ] },
  { path: 'auth', component: AuthLayoutComponent, children: [
      { path: 'signin', component: LoginComponent }
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {MainLayoutComponent} from "./shared/layouts/main-layout/main-layout.component";
import {MainComponent} from "./views/main/main.component";
import {ContentComponent} from "./views/content/content.component";

import {AuthGuard} from "./shared/classes/auth.guard";
import {ProjectsComponent} from "./views/projects/projects.component";
import {FaqComponent} from "./views/faq/faq.component";
import {ServicesComponent} from "./views/services/services.component";

const routes: Routes = [
  { path: '', component: MainLayoutComponent, /* canActivate: [AuthGuard] , */ children: [
      { path: '', component: MainComponent },
      { path: 'content', component: ContentComponent, children: [
          { path: 'projects', component: ProjectsComponent },
          { path: 'faq', component: FaqComponent },
          { path: 'services', component: ServicesComponent }
        ] }
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { BusinessFormComponent } from './pages/business-form/business-form.component';
import { BusinessManagerComponent } from './pages/business-manager/business-manager.component';
import { MenuManagerComponent } from './pages/menu-manager/menu-manager.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'menu-manager', component: MenuManagerComponent },
      { path: 'business-form', component: BusinessFormComponent },
      { path: 'business-manager', component: BusinessManagerComponent },
      { path: '', redirectTo: 'business-manager', pathMatch: 'full' },  // Default redirect for empty child path
    ]
  },
  { path: '**', redirectTo: 'business-manager' } // Catch-all route for invalid URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

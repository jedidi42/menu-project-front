import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./guards/auth.guard";
import { BusinessFormComponent } from "./pages/business-form/business-form.component";
import { BusinessManagerComponent } from "./pages/business-manager/business-manager.component";
import { MenuManagerComponent } from "./pages/menu-manager/menu-manager.component";
import { Menu1Component } from "./shared/menus/menu1/menu1.component";
import { MainMenuComponent } from "./shared/menus/main-menu/main-menu.component";
import { Menu2Component } from "./shared/menus/menu2/menu2.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },

  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "menu-manager", component: MenuManagerComponent },
      { path: "business-form", component: BusinessFormComponent },
      { path: "business-manager", component: BusinessManagerComponent },
      { path: "", redirectTo: "business-manager", pathMatch: "full" }, // Default redirect for empty child path
    ],
  },
  { path: "menu1", component: Menu1Component },
  { path: "menu2", component: Menu2Component },
  { path: "main-menu", component: MainMenuComponent },
  { path: "**", redirectTo: "business-manager" }, // Catch-all route for invalid URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

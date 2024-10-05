// src/app/app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { JwtModule } from "@auth0/angular-jwt";
import { DividerModule } from "primeng/divider";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TabViewModule } from "primeng/tabview";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { PasswordModule } from "primeng/password";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FloatLabelModule } from "primeng/floatlabel";
import { MenubarModule } from "primeng/menubar";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { DropdownModule } from "primeng/dropdown";
import { DialogModule } from "primeng/dialog";
import { TableModule } from "primeng/table";

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { BusinessManagerComponent } from "./pages/business-manager/business-manager.component";
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { BusinessFormComponent } from "./pages/business-form/business-form.component";
import { MenuManagerComponent } from "./pages/menu-manager/menu-manager.component";
import { ColorPickerModule } from "primeng/colorpicker";
import { Menu1Component } from "./shared/menus/menu1/menu1.component";
import { PanelModule } from "primeng/panel";
import { ChipsModule } from "primeng/chips";
import { ManageMenuItemsComponent } from "./pages/manage-menu-items/manage-menu-items.component";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BusinessManagerComponent,
    NavBarComponent,
    BusinessFormComponent,
    MenuManagerComponent,
    Menu1Component,
    ManageMenuItemsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ["localhost:3000"], // Adjust as needed
        disallowedRoutes: ["http://localhost:3000/api/auth/login"],
      },
    }),
    ReactiveFormsModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    InputIconModule,
    IconFieldModule,
    PasswordModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    FloatLabelModule,
    MenubarModule,
    OverlayPanelModule,
    DropdownModule,
    ColorPickerModule,
    PanelModule,
    ChipsModule,
    DialogModule,
    TableModule,
    MatCardModule,
    MatIconModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

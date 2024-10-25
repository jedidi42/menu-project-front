// src/app/services/auth.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "https://menu-project-back.onrender.com/api/auth"; // Adjust the URL as needed

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  login(email: string, password: string) {
    console.log(email, password);
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  isLoggedIn(): any {
    const token = localStorage.getItem("token");
    return token && !this.jwtHelper.isTokenExpired(token);
  }
}

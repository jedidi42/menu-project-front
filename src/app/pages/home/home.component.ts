// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}
  businesses = [
    {
      name: 'Tanit',
      image: 'https://plus.unsplash.com/premium_photo-1661953124283-76d0a8436b87?q=80&w=1788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with your image paths
      menus: 5
    },
    {
      name: 'Mesk lil',
      image: null,
      menus: 3
    }
  ];
  logout() {
    this.authService.logout();
  }
  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/image_not_available.png';
  }
  navigateToBusinessForm() {
    this.router.navigate(['/business-form']);
  }

}

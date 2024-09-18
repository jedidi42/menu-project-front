// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  newEmail: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  lastName: string = '';
  firstName: string = '';

  constructor(private authService: AuthService,private userService:UserService ,private router: Router) { }
  activeIndex: number = 1;
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }
  signUp() {
    this.userService.createUser({firstName:this.firstName, lastName:this.lastName,email:this.newEmail,password:this.newPassword}).subscribe({
      next: (response:any) => {
        console.log('user created successfully',response);
      },
      error: (error:any) => {
        console.error('user creation failed ', error);
      },
    });
  }

  goToSignIn() {
    // Navigate to the sign-in page or perform any other action
    this.activeIndex = 0
  }
  goToLogin() {
    this.activeIndex = 1;
  }

  onTabChange(event: any) {
    const tabContent = document.querySelector('.p-tabview-panels');
    if (tabContent) {
      tabContent.classList.add('tab-leave');
      setTimeout(() => {
        this.activeIndex = event.index;
        tabContent.classList.remove('tab-leave');
        tabContent.classList.add('tab-enter');
        setTimeout(() => {
          tabContent.classList.remove('tab-enter');
        }, 500);
      }, 500);
    }
  }
  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.selected.setValue(index);
  }
}

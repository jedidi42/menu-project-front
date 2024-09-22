import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-business-manager',
  templateUrl: './business-manager.component.html',
  styleUrl: './business-manager.component.scss'
})
export class BusinessManagerComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router, private businessService:BusinessService) {}
  ngOnInit(): void {
    this. getBusinessesDate()
  }
  businesses: any[] = [];
  logout() {
    this.authService.logout();
  }
  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/image_not_available.png';
  }
  navigateToBusinessFormCreate() {
    this.router.navigate(['/business-form']);
  }

  navigateToBusinessFormUpdate(businessId:any) {
    console.log('businessId',businessId)
    this.router.navigate(['/business-form'],{
      queryParams: { id: businessId }
    });
  }

  getBusinessesDate(){
    return this.businessService.getAllBusinesses().subscribe({
      next: (response) => {
        console.log('data', response);
        response.forEach((element:any) => {
          const tempbusiness={
             name:element.name,
             image: 'https://plus.unsplash.com/premium_photo-1661953124283-76d0a8436b87?q=80&w=1788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with your image paths
             menus:element.Menus?element.Menus.length:0,
             id:element.id
           }
console.log('tempbusiness',tempbusiness)
           this.businesses.push(tempbusiness)
       });
      },
      error: (error) => {
        console.error(error);
      },
    });  }

}


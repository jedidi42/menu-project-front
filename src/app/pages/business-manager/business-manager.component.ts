import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { BusinessService } from "../../services/business.service";

@Component({
  selector: "app-business-manager",
  templateUrl: "./business-manager.component.html",
  styleUrl: "./business-manager.component.scss",
})
export class BusinessManagerComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private businessService: BusinessService
  ) {}
  ngOnInit(): void {
    this.getBusinessesDate();
  }
  businesses: any[] = [];
  logout() {
    this.authService.logout();
  }
  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = "assets/images/image_not_available.png";
  }
  navigateToBusinessFormCreate() {
    this.router.navigate(["/business-form"]);
  }

  navigateToBusinessFormUpdate(businessId: any) {
    console.log("businessId", businessId);
    this.router.navigate(["/business-form"], {
      queryParams: { id: businessId },
    });
  }

  getBusinessesDate() {
    return this.businessService.getAllBusinesses().subscribe({
      next: (response) => {
        console.log("data", response);
        response.forEach((element: any) => {
          console.log("element", element);
          const tempbusiness = {
            name: element.name,
            image: element.imagePath, // Replace with your image paths
            menus: element.Menus ? element.Menus.length : 0,
            id: element.id,
          };
          console.log("tempbusiness", tempbusiness);
          this.businesses.push(tempbusiness);
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

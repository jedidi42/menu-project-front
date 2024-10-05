import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MenuService } from "../../../services/menu.service";

@Component({
  selector: "app-menu1",
  templateUrl: "./menu1.component.html",
  styleUrl: "./menu1.component.scss",
})
export class Menu1Component implements OnInit {
  menuData: any;

  menu: any;
  menuId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    // Get the menuId from the query parameters
    this.route.queryParamMap.subscribe((params) => {
      this.menuId = params.get("menuId");
      if (this.menuId) {
        this.getMenuById(Number(this.menuId));
      }
    });
  }

  // Fetch the menu by ID
  getMenuById(menuId: number): void {
    this.menuService.getMenuById(menuId).subscribe({
      next: (response) => {
        this.menu = response;
        this.menuData = response.content;
        console.log("Menu data:", this.menu);
      },
      error: (error) => {
        console.error("Error fetching menu:", error);
      },
    });
  }
}

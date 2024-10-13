import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuService } from "../../../services/menu.service";
import { MENU_DICTIONARY } from "../../constants/menu-dictionary";

@Component({
  selector: "app-main-menu",
  templateUrl: "./main-menu.component.html",
  styleUrl: "./main-menu.component.scss",
})
export class MainMenuComponent implements OnInit {
  menuId: string | null | undefined;
  menu: any;
  menuData: any;
  path: string = "";
  menuTemplate: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    // Get the menuId from the query parameters
    this.route.queryParamMap.subscribe((params) => {
      this.menuId = params.get("menuId");
      if (this.menuId) {
        this.getMenuById(Number(this.menuId));
      }
      console.log("Menu data:", this.path);
    });
  }
  getMenuById(menuId: number): void {
    this.menuService.getMenuById(menuId).subscribe({
      next: (response) => {
        this.menu = response;
        this.menuData = response.content;
        console.log("Menu data:", this.menu);
        this.menuTemplate = MENU_DICTIONARY[this.menu?.Brands[0]?.templateId];
        console.log(
          "templateId",
          this.menu?.Brands[0]?.templateId,
          "Menu template:",
          this.menuTemplate
        );
        this.path = `/${
          MENU_DICTIONARY[this.menu?.Brands[0]?.templateId]
        }?menuId=${this.menuId}`;
        console.log("Menu data:", this.path);
        this.router.navigateByUrl(this.path);
      },
      error: (error) => {
        console.error("Error fetching menu:", error);
      },
    });
  }
}

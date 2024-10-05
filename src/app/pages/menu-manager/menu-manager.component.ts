import { Component } from "@angular/core";
import { MenuService } from "../../services/menu.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-menu-manager",
  templateUrl: "./menu-manager.component.html",
  styleUrl: "./menu-manager.component.scss",
})
export class MenuManagerComponent {
  BusinesseMenus: any[] = [];
  menuForm!: FormGroup;
  categories = [
    { label: "Pizzas", value: "pizzas" },
    { label: "Sandwiches", value: "sandwiches" },
    { label: "Beverages", value: "beverages" },
  ];

  fonts = [
    { label: "Arial", value: "1" },
    { label: "Roboto", value: "2" },
    { label: "Sans-serif", value: "3" },
  ];

  templates = [
    { label: "Classic", value: "classic" },
    { label: "Modern", value: "modern" },
    { label: "Elegant", value: "elegant" },
  ];
  selectedMenuId: number | null = null;
  selectedMenu: any;
  categoriList: any;
  categorieList: any = [];
  iFrameUrl: string = "";

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.menuForm = this.fb.group({
      name: ["", Validators.required],
      // category: [null, Validators.required],
      font: [null, Validators.required],
      //  template: [null, Validators.required],
      primaryColor: ["#ffffff", Validators.required],
      accentColor: ["#ff0000", Validators.required],
      categories: [[]],
    });
    this.getBusinesseMenus();
  }

  getBusinesseMenus() {
    this.route.queryParams.subscribe((params) => {
      const businessId = params["id"];
      if (businessId) {
        this.menuService.getMenusBuBusinessId(businessId).subscribe({
          next: (response) => {
            this.BusinesseMenus = response;
            this.selectedMenuId = response[0]?.id;
            if (this.BusinesseMenus.length == 0) {
              this.selectedMenu = null;
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
      } else {
        console.error("Business ID not found in query parameters");
      }
    });
  }
  onSubmit() {
    if (this.menuForm.valid) {
      console.log("form", this.menuForm.value);
      if (this.selectedMenu && this.selectedMenuId) {
        let updatedMenu = { ...this.selectedMenu };
        updatedMenu.name = this.menuForm.value.name;
        updatedMenu.Brands[0].primaryColor = this.menuForm.value.primaryColor;
        updatedMenu.Brands[0].secondaryColor = this.menuForm.value.accentColor;
        updatedMenu.Brands[0].font = this.menuForm.value.font.value;
        updatedMenu.content = this.selectedMenu.content;
        this.menuService
          .updateMenu(this.selectedMenuId, updatedMenu)
          .subscribe({
            next: (response) => {
              console.log("Menu updated successfully", response);
              this.getBusinesseMenus();
            },
            error: (error) => {
              console.error("Failed to update menu", error);
            },
          });
      } else {
        console.error("No menu selected to update");
      }
    } else {
      console.log("Form is not valid");
    }
  }

  CreateMenu() {
    this.route.queryParams.subscribe((params) => {
      const businessId = params["id"];
      if (businessId) {
        this.menuService
          .CreateMenu(businessId, this.BusinesseMenus.length + 1)
          .subscribe({
            next: (response) => {
              console.log("Menu created successfully", response);
              this.getBusinesseMenus();
            },
            error: (error) => {
              console.error("Failed to create menu", error);
            },
          });
      } else {
        console.error("Business ID not found in query parameters");
      }
    });
  }
  SelectMenu(menu: any) {
    this.selectedMenuId = menu.id;

    if (this.selectedMenuId) {
      this.getMenuById(this.selectedMenuId);
      this.iFrameUrl = `http://localhost:4200/menu1?menuId=${this.selectedMenuId}`;

      console.log("iFrameUrl", this.iFrameUrl);
    }
    console.log("selectedMenu", this.selectedMenu);
    this.prepareCategories();

    if (this.selectedMenu && this.selectedMenu.Brands) {
      this.menuForm.patchValue({
        name: this.selectedMenu.name,
        font: this.fonts.find(
          (f) => f.value === this.selectedMenu.Brands[0].font
        ),
        primaryColor: this.selectedMenu.Brands[0].primaryColor,
        accentColor: this.selectedMenu.Brands[0].secondaryColor,
        categories: this.categorieList,
      });
    }
  }

  deleteMenu(menuId: any) {
    this.menuService.deleteMenu(menuId).subscribe({
      next: (response) => {
        console.log("Menu deleted successfully", response);
        this.getBusinesseMenus();
      },
      error: (error) => {
        console.error("Failed to delete menu", error);
      },
    });
  }

  async getMenuById(menuId: number) {
    await this.menuService.getMenuById(menuId).subscribe({
      next: (response) => {
        this.selectedMenu = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  prepareCategories() {
    this.categorieList = [];
    this.selectedMenu?.content?.categories.forEach((category: any) => {
      this.categorieList.push(category.name);
    });
    console.log("categories", this.categorieList);
  }
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  handleFinalObject(finalObject: any[]) {
    console.log("Received final object from child:", finalObject);
    if (this.selectedMenuId) {
      this.menuService
        .updateMenuContent(this.selectedMenuId, { categories: finalObject })
        .subscribe({
          next: (response) => {
            console.log("Menu content updated successfully", response);
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }
}

import { Component, Input, OnInit, Renderer2 } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MenuService } from "../../../services/menu.service";
import { FONT_DICTIONARY } from "../../constants/font-dictionary";

@Component({
  selector: "app-menu2",
  templateUrl: "./menu2.component.html",
  styleUrls: ["./menu2.component.scss"], // Corrected property name
})
export class Menu2Component implements OnInit {
  menuData: any;

  menu: any;
  menuId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private renderer: Renderer2
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
        this.applyFont(this.menu?.Brands[0]?.font);
      },
      error: (error) => {
        console.error("Error fetching menu:", error);
      },
    });
  }
  // Apply the font to the whole page
  applyFont(fontId: string): void {
    const font = FONT_DICTIONARY[fontId];
    if (font) {
      console.log(`Applying font ${font} to the page`);
      this.setFontFamilyImportant(font);
    } else {
      console.warn(`Font ID ${fontId} not found in FONT_DICTIONARY`);
    }
  }

  // Set font-family with !important
  setFontFamilyImportant(font: string): void {
    const styleElement = this.renderer.createElement("style");
    styleElement.innerHTML = `body, body * { font-family: ${font} !important;background-color:${this.menu?.Brands[0]?.secondaryColor} !important; }`;

    this.renderer.appendChild(document.head, styleElement);
  }
}

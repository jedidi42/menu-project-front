import {
  Component,
  Input,
  ChangeDetectorRef,
  ViewEncapsulation,
  EventEmitter,
  Output,
} from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UploadService } from "../../services/upload.service";

@Component({
  selector: "app-manage-menu-items",
  templateUrl: "./manage-menu-items.component.html",
  styleUrls: ["./manage-menu-items.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ManageMenuItemsComponent {
  // BehaviorSubject to manage categories
  private categoriesSubject = new BehaviorSubject<any[]>([]);
  categories$: Observable<any[]> = this.categoriesSubject.asObservable();

  // New category name input
  newCategoryName: string = "";

  constructor(
    private uploadService: UploadService,
    private cdr: ChangeDetectorRef
  ) {}

  @Output() finalObjectSubmitted = new EventEmitter<any[]>();

  // Input setter for categories
  @Input()
  set categories(value: any[]) {
    this.categoriesSubject.next(value);
  }

  // Save the edited item (optional: send the data to a backend)
  saveItem(item: any, category: any) {
    console.log("Saving item:", item, "in category:", category.name);
  }

  // Delete an item from the category
  deleteItem(category: any, item: any) {
    const categories = this.categoriesSubject.getValue();
    const updatedCategories = categories.map((cat) => {
      if (cat === category) {
        return {
          ...cat,
          items: cat.items.filter((i: any) => i !== item),
        };
      }
      return cat;
    });
    this.categoriesSubject.next(updatedCategories);
    console.log("Deleted item:", item, "from category:", category.name);
  }

  // Add a new item to a specific category
  addItemToCategory(category: any) {
    const categories = this.categoriesSubject.getValue();
    const updatedCategories = categories.map((cat) => {
      if (cat === category) {
        return {
          ...cat,
          items: [...cat.items, { name: "", description: "", price: 0 }],
        };
      }
      return cat;
    });
    this.categoriesSubject.next(updatedCategories);
  }

  // Add a new category with no items
  addCategory() {
    if (this.newCategoryName.trim()) {
      const newCategory = {
        name: this.newCategoryName,
        items: [], // Initially no items
        imageUrl: "", // Initially no image
      };

      const categories = this.categoriesSubject.getValue();
      this.categoriesSubject.next([...categories, newCategory]);
      this.newCategoryName = ""; // Reset the input field after adding
      console.log("Added new category:", newCategory);
    } else {
      console.log("Category name is empty");
    }
  }

  // Handle file selection and upload for category image
  onCategoryFileSelected(event: any, category: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.uploadService.uploadImage(selectedFile).subscribe({
        next: (response: any) => {
          this.updateCategoryImageUrl(category, response.imageUrl);
          console.log("Category Image URL:", response.imageUrl);
          this.cdr.detectChanges(); // Ensure the view is updated
        },
        error: (error: any) => {
          console.error("Error uploading image:", error);
        },
      });
    } else {
      console.error("No file selected");
    }
  }

  // Update the imageUrl for the specific category
  updateCategoryImageUrl(category: any, imageUrl: string) {
    const categories = this.categoriesSubject.getValue();
    const updatedCategories = categories.map((cat) => {
      if (cat === category) {
        console.log("Updating image for category:", cat);
        return { ...cat, imageUrl };
      }
      return cat;
    });
    console.log("Updated categories:", updatedCategories);
    this.categoriesSubject.next(updatedCategories);
  }

  // Submit the final object structure (can be sent to the backend)
  submit() {
    const finalObject = this.categoriesSubject.getValue();
    console.log("Submitting final object:", finalObject);
    this.finalObjectSubmitted.emit(finalObject); // Emit the final object
  }
}

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BusinessService } from "../../services/business.service";
import { UploadService } from "../../services/upload.service";

@Component({
  selector: "app-business-form",
  templateUrl: "./business-form.component.html",
  styleUrls: ["./business-form.component.scss"],
})
export class BusinessFormComponent implements OnInit {
  businessForm!: FormGroup;
  businessId: number | null = null;
  categories = [
    { label: "Restaurant", value: 1 },
    { label: "Cafe", value: 3 },
    { label: "Bar", value: 4 },
  ];
  isDragOver = false;
  imagePreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null; // Store the actual image file here
  isUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.businessForm = this.fb.group({
      businessName: ["", Validators.required],
      businessAddress: ["", Validators.required],
      businessCategory: ["", Validators.required],
      businessImage: [null], // Store image file in the form
    });

    // Check for businessId in the route parameters
    this.route.queryParams.subscribe((params) => {
      const id = params["id"];
      console.log("id", id);
      if (id) {
        this.isUpdate = true;
        this.businessId = +id;
        this.getBusiness(this.businessId);
      }
    });
  }

  getBusiness(id: number): void {
    this.businessService.getBusinessById(id).subscribe({
      next: (business) => {
        this.businessForm.patchValue({
          businessName: business.name,
          businessAddress: business.address,
          businessCategory: business.categoryID,
        });
        // Handle image preview if needed
      },
      error: (error) => {
        console.error("Failed to fetch business data", error);
      },
    });
  }

  onSubmit() {
    if (this.businessForm.valid) {
      if (this.imageFile) {
        this.uploadService.uploadImage(this.imageFile).subscribe({
          next: (response: any) => {
            const imageUrl = response.imageUrl;
            this.businessForm.patchValue({ businessImage: imageUrl });
            console.log("Image URL:", imageUrl);
            this.submitForm();
          },
          error: (error: any) => {
            console.error("Error uploading image:", error);
          },
        });
      } else {
        this.submitForm();
      }
    } else {
      console.log("Form is not valid");
    }
  }

  submitForm() {
    const formValue = this.businessForm.value;
    const businessObject = {
      name: formValue.businessName,
      address: formValue.businessAddress,
      categoryID: formValue.businessCategory,
      imagePath: formValue.businessImage,
    };

    if (this.businessId) {
      // Update existing business
      this.businessService
        .updateBusiness(this.businessId, businessObject)
        .subscribe({
          next: (response) => {
            console.log("Business updated successfully", response);
            this.router.navigate(["/business-manager"]);
          },
          error: (error) => {
            console.error("Business update failed", error);
          },
        });
    } else {
      // Create new business
      this.businessService.createBusiness(businessObject).subscribe({
        next: (response) => {
          console.log("Business created successfully", response);
          this.router.navigate(["/business-manager"]);
        },
        error: (error) => {
          console.error("Business creation failed", error);
        },
      });
    }
  }
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.imageFile = file; // Store the file
      this.previewImage(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.imageFile = file; // Store the file
      this.previewImage(file);
    }
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.businessForm.patchValue({ businessImage: file }); // Update form with image file
    };
    reader.readAsDataURL(file);
  }

  navigateToMenuManger(businessId: any) {
    console.log("businessId", businessId);
    this.router.navigate(["/menu-manager"], {
      queryParams: { id: businessId },
    });
  }
}

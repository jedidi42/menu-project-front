import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrl: './business-form.component.scss'
})
export class BusinessFormComponent implements OnInit {

  businessForm!: FormGroup;
  categories = [
    { label: 'Restaurant', value: 'restaurant' },
    { label: 'Cafe', value: 'cafe' },
    { label: 'Bar', value: 'bar' }
  ];
  isDragOver = false;
  imagePreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;  // Store the actual image file here

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.businessForm = this.fb.group({
      businessName: ['', Validators.required],
      businessAddress: ['', Validators.required],
      businessCategory: ['', Validators.required],
      businessImage: [null]  // Store image file in the form
    });
  }

  onSubmit() {
    if (this.businessForm.valid) {
      const formData = new FormData();
      formData.append('businessName', this.businessForm.get('businessName')?.value);
      formData.append('businessAddress', this.businessForm.get('businessAddress')?.value);
      formData.append('businessCategory', this.businessForm.get('businessCategory')?.value);
      
      // Append the image file if available
      if (this.imageFile) {
        formData.append('businessImage', this.imageFile);
      }

      console.log('Form Data:', formData);

      // Here you would send the formData to your server using an HTTP request.
      // Example:
      // this.http.post('/your-backend-endpoint', formData).subscribe(response => { ... });

    } else {
      console.log('Form is not valid');
    }
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.imageFile = file;  // Store the file
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
      this.imageFile = file;  // Store the file
      this.previewImage(file);
    }
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.businessForm.patchValue({ businessImage: file });  // Update form with image file
    };
    reader.readAsDataURL(file);
  }
}
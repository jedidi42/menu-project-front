import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UploadService {
  private uploadUrl = "https://menu-project-back.onrender.com/api/upload"; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("image", file);

    return this.http.post<any>(this.uploadUrl, formData, {
      headers: new HttpHeaders({
        // Add any necessary headers here
      }),
    });
  }
}

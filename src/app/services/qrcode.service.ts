// qr-code.service.ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class QrCodeService {
  private apiUrl = "https://api.qr-code-generator.com/v1/create"; // Example endpoint (adapt based on QRCode Monkey's official API)

  constructor(private http: HttpClient) {}

  generateQrCode(data: string): Observable<any> {
    const body = {
      data,
      config: {
        body: "square",
        eye: "frame0",
        eyeBall: "ball0",
        bgColor: "#FFFFFF",
        bodyColor: "#000000",
        eye1Color: "#000000",
        eye2Color: "#000000",
        eye3Color: "#000000",
        logo: "https://example.com/logo.png",
        logoMode: "default",
      },
    };

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    return this.http.post(this.apiUrl, body, { headers });
  }
}

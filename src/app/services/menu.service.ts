import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  private apiUrl = "https://menu-project-back.onrender.com/api/menus"; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getMenusBuBusinessId(businessId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/business/${businessId}`);
  }

  getMenuById(Id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${Id}`);
  }
  CreateMenu(businessId: number, menuNumber: number): Observable<any> {
    let businessObj = {
      businessId: businessId,
      name: `New Menu ${menuNumber}`,
    };
    return this.http.post<any>(`${this.apiUrl}`, businessObj);
  }

  deleteMenu(menuId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${menuId}`);
  }

  updateMenu(menuId: number, menu: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${menuId}`, menu);
  }

  updateMenuContent(menuId: number, menu: any): Observable<any> {
    return this.http.put<any>(
      `https://menu-project-back.onrender.com/api/nosql/menus/${menuId}`,
      menu
    );
  }
}

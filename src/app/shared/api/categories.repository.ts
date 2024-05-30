import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Category } from "@domain/category.type";
import { environment } from "@env/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoriesRepository {
  #httpClient = inject(HttpClient);
  #url = `${environment.apiUrl}/categories`;

  getAll$(): Observable<Category[]> {
    return this.#httpClient.get<Category[]>(this.#url);
  }
  getById$(id: string): Observable<Category> {
    return this.#httpClient.get<Category>(`${this.#url}/${id}`);
  }
}

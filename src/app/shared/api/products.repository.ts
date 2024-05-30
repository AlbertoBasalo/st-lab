import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { Product } from "../domain/product.type";
@Injectable({
  providedIn: "root",
})
export class ProductsRepository {
  #url = `${environment.apiUrl}/products`;
  constructor(private http: HttpClient) {}

  getAll$(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.#url}`);
  }

  getById$(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.#url}/${id}`);
  }

  getByKeyVal$(key: string, val: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.#url}/?key=${key}&value=${val}`);
  }

  getByQuery$(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.#url}?q=${query}`);
  }

  post$(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.#url}`, product);
  }

  put$(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.#url}/${product.id}`, product);
  }

  delete$(id: string): Observable<void> {
    return this.http.delete<void>(`${this.#url}/${id}`);
  }
}

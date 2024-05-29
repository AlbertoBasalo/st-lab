import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../domain/product.type";
@Injectable({
  providedIn: "root",
})
export class ProductsRepository {
  #apiUrl = "http://localhost:3000/api/products";
  constructor(private http: HttpClient) {}

  getAll$(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.#apiUrl}`);
  }

  getById$(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.#apiUrl}/${id}`);
  }

  getByKeyVal$(key: string, val: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.#apiUrl}/?key=${key}&value=${val}`);
  }

  getByQuery$(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.#apiUrl}?q=${query}`);
  }

  post$(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.#apiUrl}`, product);
  }

  put$(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.#apiUrl}/${product.id}`, product);
  }

  delete$(id: string): Observable<void> {
    return this.http.delete<void>(`${this.#apiUrl}/${id}`);
  }
}

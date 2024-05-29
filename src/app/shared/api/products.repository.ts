import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../domain/product.type";

export class ProductsRepository {
  constructor(private http: HttpClient) {}

  getAll$(): Observable<Product[]> {
    return this.http.get<Product[]>(`/products`);
  }

  getById$(id: number): Observable<Product> {
    return this.http.get<Product>(`/products/${id}`);
  }

  getByKeyVal$(key: string, val: any): Observable<Product[]> {
    return this.http.get<Product[]>(`/products/?${key}=${val}`);
  }

  getByQuery$(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/products?q=${query}`);
  }

  post$(product: Product): Observable<Product> {
    return this.http.post<Product>(`/products`, product);
  }

  put$(product: Product): Observable<Product> {
    return this.http.put<Product>(`/products/${product.id}`, product);
  }

  delete$(id: number): Observable<void> {
    return this.http.delete<void>(`/products/${id}`);
  }
}

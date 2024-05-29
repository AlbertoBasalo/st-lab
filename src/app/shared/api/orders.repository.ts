import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../domain/order.type";

@Injectable({
  providedIn: "root",
})
export class OrdersRepository {
  #apiUrl = "http://localhost:3000/api/orders";
  constructor(private http: HttpClient) {}

  getAll$(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.#apiUrl}`);
  }

  getById$(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.#apiUrl}/${id}`);
  }

  getByKeyVal$(key: string, val: any): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.#apiUrl}/?${key}=${val}`);
  }

  getByQuery$(query: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.#apiUrl}?q=${query}`);
  }

  post$(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.#apiUrl}`, order);
  }

  put$(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.#apiUrl}/${order.id}`, order);
  }

  delete$(id: string): Observable<void> {
    return this.http.delete<void>(`${this.#apiUrl}/${id}`);
  }
}

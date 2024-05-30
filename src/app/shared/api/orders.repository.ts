import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { Order } from "../domain/order.type";

@Injectable({
  providedIn: "root",
})
export class OrdersRepository {
  #url = `${environment.apiUrl}/orders`;
  constructor(private http: HttpClient) {}

  getAll$(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.#url}`);
  }

  getById$(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.#url}/${id}`);
  }

  getByKeyVal$(key: string, val: any): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.#url}/?${key}=${val}`);
  }

  getByQuery$(query: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.#url}?q=${query}`);
  }

  post$(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.#url}`, order);
  }

  put$(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.#url}/${order.id}`, order);
  }

  delete$(id: string): Observable<void> {
    return this.http.delete<void>(`${this.#url}/${id}`);
  }
}

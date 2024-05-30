import { Injectable } from "@angular/core";
import { Order } from "../shared/domain/order.type";
import { OrderStore } from "../shared/services/order.store";
import { ProductStore } from "../shared/services/product.store";

@Injectable({
  providedIn: "root",
})
export class ClassicFacade {
  product$ = this.productService.product$;
  order$ = this.orderService.order$;

  constructor(private productService: ProductStore, private orderService: OrderStore) {
    this.orderService.orderPosted$.subscribe((order) => this.onOrderPosted(order));
  }

  create() {
    this.productService.dispatchCreate("netex", 2, 3);
  }

  readByName(name: string): void {
    this.productService.dispatchReadByName(name);
  }

  addToCart(quantity: number): void {
    this.productService.dispatchSell(quantity);
    const id = this.productService.product.id;
    this.orderService.dispatchAddProduct(id, quantity);
  }
  buy(): void {
    this.orderService.dispatchConfirmOrder();
  }

  onDestroy(): void {
    this.productService.onDestroy();
    this.orderService.onDestroy();
  }
  onOrderPosted(order: Order): void {
    order.products.forEach((p) => this.productService.dispatchConfirmSell(p.id, p.quantity));
    this.orderService.dispatchReset();
  }
}

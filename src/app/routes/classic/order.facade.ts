import { Injectable } from "@angular/core";
import { Order } from "../../shared/domain/order.type";
import { OrderStore } from "../../shared/services/order.store";
import { ProductStore } from "../../shared/services/product.store";

@Injectable()
export class OrderFacade {
  order$ = this._orderService.order$;

  constructor(private _productService: ProductStore, private _orderService: OrderStore) {
    this._orderService.orderPosted$.subscribe((order) => this.#onOrderPosted(order));
  }

  onDestroy(): void {
    this._orderService.onDestroy();
  }

  buy(): void {
    this._orderService.dispatchConfirmOrder();
  }

  #onOrderPosted(order: Order): void {
    order.products.forEach((p) => this._productService.dispatchConfirmSell(p.id, p.quantity));
    this._orderService.dispatchReset();
  }
}

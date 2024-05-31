import { Injectable } from "@angular/core";
import { Order } from "@domain/order.type";
import { OrderStore } from "@state/order.store";
import { ProductStore } from "@state/product.store";
import { Subject, takeUntil, tap } from "rxjs";

@Injectable()
export class OrderFacade {
  order$ = this._orderStore.order$;
  readonly #destroyer$ = new Subject<void>();

  constructor(private _productStore: ProductStore, private _orderStore: OrderStore) {
    this._orderStore.orderPosted$
      .pipe(
        takeUntil(this.#destroyer$),
        tap((order) => this.#onOrderPosted(order))
      )
      .subscribe();
  }

  onDestroy(): void {
    this._orderStore.onDestroy();
    this.#destroyer$.next();
    this.#destroyer$.complete();
  }

  buy(): void {
    this._orderStore.dispatchConfirmOrder();
  }

  #onOrderPosted(order: Order): void {
    order.products.forEach((p) => this._productStore.dispatchConfirmSell(p.id, p.quantity));
    this._orderStore.dispatchReset();
  }
}

import { Injectable } from "@angular/core";
import { catchError, EMPTY, pipe, Subject, takeUntil, tap } from "rxjs";
import { OrdersRepository } from "../api/orders.repository";
import { Order } from "../domain/order.type";
import { AsyncState } from "../state/async.state";
import { OrderState } from "./order.state";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  readonly #orderState = new OrderState();
  readonly #asyncState = new AsyncState();
  readonly #destroyer$ = new Subject<void>();
  readonly order$ = this.#orderState.state$;
  constructor(private _repository: OrdersRepository) {}

  dispatchAddProduct(productId: string, quantity: number): void {
    this.#orderState.update((order) => {
      order.products = [...order.products, { id: productId, quantity }];
      return order;
    });
  }

  dispatchConfirmOrder(): void {
    const order = this.#orderState.get();
    order.date = new Date();
    order.client = "John Doe";
    order.transport = { type: "standard", cost: order.products.length * 10 };
    this.#onPostOrderEffect(order);
  }

  #onPostOrderEffect(order: Order): void {
    this._repository.post$(order).pipe(this.#setPipe).subscribe();
  }

  #catcherPipe = catchError((e) => {
    this.#asyncState.error(e.message);
    return EMPTY;
  });

  #setPipe = pipe(
    takeUntil(this.#destroyer$),
    tap((s: any) => {
      this.#asyncState.complete();
      this.#orderState.set(s);
    }),
    this.#catcherPipe
  );
}

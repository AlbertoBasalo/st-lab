import { Injectable } from "@angular/core";
import { OrdersRepository } from "@api/orders.repository";
import { OrderState } from "@domain/order.state";
import { Order } from "@domain/order.type";
import { AsyncStatusState } from "@state/async-status.state";
import { catchError, distinctUntilChanged, EMPTY, Observable, pipe, Subject, takeUntil, tap } from "rxjs";

// * No actions, only state

// ! Race conditions are possible

@Injectable({
  providedIn: "root",
})
export class OrderStore {
  readonly #orderState = new OrderState();
  readonly #asyncState = new AsyncStatusState();
  readonly #destroyer$ = new Subject<void>();
  readonly #orderPosted = new Subject<Order>();

  readonly order$ = this.#orderState.state$;
  readonly orderPosted$ = this.#orderPosted.asObservable().pipe(distinctUntilChanged());
  readonly orderUnits$: Observable<number> = this.#orderState.selectUnits$;

  constructor(private _repository: OrdersRepository) {}

  onDestroy(): void {
    this.#destroyer$.next();
    this.#destroyer$.complete();
  }

  dispatchAddProduct(productId: string, quantity: number): void {
    this.#orderState.addProduct(productId, quantity);
  }

  dispatchConfirmOrder(): void {
    this.#orderState.confirmSell("John Doe");
    this.#onPostOrderEffect(this.#orderState.get());
  }

  dispatchReset(): void {
    this.#orderState.reset();
  }

  #onPostOrderEffect(order: Order): void {
    this._repository
      .post$(order)
      .pipe(this.#setPipe)
      .pipe(
        tap((s: any) => {
          this.#orderPosted.next(s);
          console.log("Order posted, onPostOrderEffect: ", s);
        })
      )
      .subscribe();
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

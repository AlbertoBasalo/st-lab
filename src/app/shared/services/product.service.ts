import { Injectable } from "@angular/core";
import { EMPTY, Subject, catchError, map, pipe, takeUntil, tap } from "rxjs";
import { ProductsRepository } from "../api/products.repository";
import { Product } from "../domain/product.type";
import { AsyncState } from "../state/async.state";
import { DialogService } from "./dialog.service";
import { ProductState } from "./product.state";

// * No actions, only state

// ! Race conditions are possible
@Injectable()
export class ProductService {
  readonly #productState = new ProductState();
  readonly #asyncState = new AsyncState();
  readonly #destroyer$ = new Subject<void>();

  // State observables

  readonly product$ = this.#productState.state$;
  readonly async$ = this.#asyncState.state$;
  // ToDo: Add selectors for easier access to state

  readonly id$ = this.#productState.select((p) => p.id);
  constructor(private _repository: ProductsRepository, private _dialog: DialogService) {}

  onDestroy(): void {
    this.#destroyer$.next();
    this.#destroyer$.complete();
  }

  // Where the actions are dispatched
  // ToDo: Add a generic dispatcher for common actions and race condition prevention
  // ToDo: Add validations or multiple effects for different actions

  dispatchCreate(name: string, price: number, stock: number): void {
    if (price < 0 || stock < 0) {
      this.#asyncState.error("Price and stock must be greater than 0");
      return;
    }
    this.#onCreateEffect(name, price, stock);
  }

  dispatchReadById(id: string): void {
    this.#onReadByIdEffect(id);
  }

  dispatchReadByName(name: string): void {
    this.#onReadByNameEffect(name);
  }

  dispatchSell(units: number): void {
    this.#productState.update((product) => {
      const newStock = product.stock - units;
      return { ...product, stock: newStock };
    });
  }

  dispatchDelete(id: string): void {
    this._dialog.accept$.subscribe((_payload: any) => this.#dispatchConfirmDelete(id));
    this.#dispatchAskDelete(id);
  }

  #dispatchAskDelete(id: string): void {
    this._dialog.open({ title: "Are you sure?" });
  }

  #dispatchConfirmDelete(id: string): void {
    this.#onConfirmDeleteEffect(id);
  }

  // Where the side effects are executed

  #onCreateEffect(name: string, price: number, stock: number) {
    this.#asyncState.start();
    this._repository.post$({ id: "", name, price, stock }).pipe(this.#setPipe).subscribe();
  }

  #onReadByIdEffect(id: string) {
    this.#asyncState.start();
    this._repository.getById$(id).pipe(this.#setPipe).subscribe();
  }

  #onReadByNameEffect(name: string) {
    this.#asyncState.start();
    this._repository
      .getByQuery$(name)
      .pipe(map((result: Product[]) => result[0] || this.#productState.get()))
      .pipe(this.#setPipe)
      .subscribe();
  }

  #onUpdateEffect(product: Product) {
    this.#asyncState.start();
    this._repository.put$(product).pipe(this.#setPipe).subscribe();
  }

  #onConfirmDeleteEffect(id: string) {
    this.#asyncState.start();
    this._repository.delete$(id).pipe(this.#resetPipe).subscribe();
  }

  // Pipes, reduce state when async effects are executed

  #catcherPipe = catchError((e) => {
    this.#asyncState.error(e.message);
    return EMPTY;
  });

  #setPipe = pipe(
    takeUntil(this.#destroyer$),
    tap((s: any) => {
      this.#asyncState.complete();
      this.#productState.set(s);
    }),
    this.#catcherPipe
  );

  #resetPipe = pipe(
    takeUntil(this.#destroyer$),
    tap(() => {
      this.#asyncState.complete();
      this.#productState.reset();
    }),
    this.#catcherPipe
  );
}
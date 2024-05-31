import { Injectable } from "@angular/core";
import { OrderStore } from "@state/order.store";
import { ProductStore } from "@state/product.store";

@Injectable()
export class HomeFacade {
  product$ = this._productStore.product$;
  order$ = this._orderStore.order$;

  constructor(private _productStore: ProductStore, private _orderStore: OrderStore) {}

  onDestroy(): void {
    this._orderStore.onDestroy();
    this._productStore.onDestroy();
  }

  readByName(name: string): void {
    this._productStore.dispatchReadByName(name);
  }

  addToCart(quantity: number): void {
    this._productStore.dispatchSell(quantity);
    const id = this._productStore.product.id;
    this._orderStore.dispatchAddProduct(id, quantity);
  }
}

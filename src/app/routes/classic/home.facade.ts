import { Injectable } from "@angular/core";
import { OrderStore } from "../../shared/services/order.store";
import { ProductStore } from "../../shared/services/product.store";

@Injectable({
  providedIn: "root",
})
export class HomeFacade {
  product$ = this._productService.product$;
  order$ = this._orderService.order$;

  constructor(private _productService: ProductStore, private _orderService: OrderStore) {}

  onDestroy(): void {
    this._orderService.onDestroy();
    this._productService.onDestroy();
  }

  readByName(name: string): void {
    this._productService.dispatchReadByName(name);
  }

  addToCart(quantity: number): void {
    this._productService.dispatchSell(quantity);
    const id = this._productService.product.id;
    this._orderService.dispatchAddProduct(id, quantity);
  }
}

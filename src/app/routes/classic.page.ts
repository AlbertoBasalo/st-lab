import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { OrderService } from "../shared/services/order.service";
import { ProductService } from "../shared/services/product.service";

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgIf],
  providers: [ProductService],
  template: `
    <input
      type="search"
      placeholder="Product Name"
      [value]="term"
      (search)="onSearch($event)"
      (input)="onSearch($event)" />
    <section *ngIf="product$ | async as product">
      <section *ngIf="product.id !== ''">
        <pre>{{ product | json }}</pre>
        <section *ngIf="product.stock > 0">
          <input
            type="number"
            placeholder="Quantity"
            min="0"
            [max]="product.stock"
            [value]="quantity"
            (change)="onQuantityChange($event)" />
          <button (click)="onAddToCartClick()">Add to cart</button>
        </section>
      </section>
    </section>
    <section *ngIf="order$ | async as order">
      <section *ngIf="order.products.length > 0">
        <pre>{{ order | json }}</pre>
        <button (click)="onBuyClick()">Buy</button>
      </section>
    </section>
  `,
})
export default class ClassicPage {
  term = "bag";
  product$ = this.productService.product$;
  order$ = this.orderService.order$;
  quantity = 1;

  constructor(private productService: ProductService, private orderService: OrderService) {}

  onSearch(event: Event): void {
    const name: string = (event.target as HTMLInputElement).value;
    this.productService.dispatchReadByName(name);
  }

  onQuantityChange(event: Event): void {
    const quantity = parseInt((event.target as HTMLInputElement).value, 10);
    this.quantity = quantity;
  }

  onAddToCartClick(): void {
    this.productService.dispatchSell(this.quantity);
    this.productService.id$.subscribe((id) => this.orderService.dispatchAddProduct(id, this.quantity));
  }

  onBuyClick(): void {
    this.orderService.dispatchConfirmOrder();
  }
}

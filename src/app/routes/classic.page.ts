import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { Component, Injectable, OnDestroy } from "@angular/core";
import { Order } from "../shared/domain/order.type";
import { OrderService } from "../shared/services/order.service";
import { ProductService } from "../shared/services/product.service";

@Injectable()
export class ClassicFacade {
  product$ = this.productService.product$;
  order$ = this.orderService.order$;

  constructor(private productService: ProductService, private orderService: OrderService) {
    this.orderService.orderPosted$.subscribe((order) => this.onOrderPosted(order));
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

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgIf],
  providers: [ClassicFacade],
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
export default class ClassicPage implements OnDestroy {
  term = "bag";
  product$ = this._facade.product$;
  order$ = this._facade.order$;
  quantity = 1;

  constructor(private _facade: ClassicFacade) {}

  ngOnDestroy(): void {
    this._facade.onDestroy();
  }

  onSearch(event: Event): void {
    const name: string = (event.target as HTMLInputElement).value;
    this._facade.readByName(name);
    this.quantity = 1;
  }

  onQuantityChange(event: Event): void {
    const quantity = parseInt((event.target as HTMLInputElement).value, 10);
    this.quantity = quantity;
  }

  onAddToCartClick(): void {
    this._facade.addToCart(this.quantity);
  }

  onBuyClick(): void {
    this._facade.buy();
  }
}

/**
 * export default class ClassicPage implements OnDestroy {
  term = "bag";
  product$ = this.productService.product$;
  order$ = this.orderService.order$;
  quantity = 1;

  constructor(private productService: ProductService, private orderService: OrderService) {
    this.orderService.orderPosted$.subscribe((order) => this.onOrderPosted(order));
  }

  ngOnDestroy(): void {
    this.productService.onDestroy();
    this.orderService.onDestroy();
  }

  onSearch(event: Event): void {
    const name: string = (event.target as HTMLInputElement).value;
    this.productService.dispatchReadByName(name);
    this.quantity = 1;
  }

  onQuantityChange(event: Event): void {
    const quantity = parseInt((event.target as HTMLInputElement).value, 10);
    this.quantity = quantity;
  }

  onAddToCartClick(): void {
    this.productService.dispatchSell(this.quantity);
    this.productService.id$.pipe(take(1)).subscribe((id) => {
      this.orderService.dispatchAddProduct(id, this.quantity);
      this.quantity = 1;
    });
  }

  onBuyClick(): void {
    this.orderService.dispatchConfirmOrder();
  }

  onOrderPosted(order: Order): void {
    order.products.forEach((p) => this.productService.dispatchConfirmSell(p.id, p.quantity));
    this.orderService.dispatchReset();
  }
}
 */

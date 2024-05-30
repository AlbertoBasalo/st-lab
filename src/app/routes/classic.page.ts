import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { ClassicFacade } from "./classic.facade";

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgIf],
  providers: [ClassicFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(private _facade: ClassicFacade) {
    //this.product$.subscribe((p) => (p.name = ""));
    this._facade.create();
  }

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

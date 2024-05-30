import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { ClassicHeaderWidget } from "../../core/classic-header.widget";
import { HomeFacade } from "./home.facade";

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgIf, ClassicHeaderWidget],
  providers: [HomeFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-classic-header />
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
  `,
})
export default class HomePage implements OnDestroy {
  term = "bag";
  product$ = this._facade.product$;
  order$ = this._facade.order$;
  quantity = 1;

  constructor(private _facade: HomeFacade) {}

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
}

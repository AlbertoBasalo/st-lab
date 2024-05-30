import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { ClassicHeaderWidget } from "src/app/core/classic-header.widget";
import { OrderFacade } from "./order.facade";

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgIf, ClassicHeaderWidget],
  providers: [OrderFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-classic-header />
    <section *ngIf="order$ | async as order">
      <section *ngIf="order.products.length > 0">
        <pre>{{ order | json }}</pre>
        <button (click)="onBuyClick()">Buy</button>
      </section>
    </section>
  `,
})
export default class OrderPage implements OnDestroy {
  order$ = this._facade.order$;

  constructor(private _facade: OrderFacade) {}

  ngOnDestroy(): void {
    this._facade.onDestroy();
  }

  onBuyClick(): void {
    this._facade.buy();
  }
}

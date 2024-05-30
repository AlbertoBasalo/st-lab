import { AsyncPipe, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { OrderStore } from "./shared/services/order.store";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe, NgIf],
  providers: [OrderStore],
  template: `
    <header>
      <nav>
        <ul>
          <a [routerLink]="['/']">
            <strong>Welcome to {{ title }}!</strong>
          </a>
        </ul>
        <ul>
          <li>
            <a [routerLink]="['/classic']">Classic sample</a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
    <section *ngIf="order$ | async as order">Coste transporte{{ order.transport.cost }}</section>
  `,
  styles: [],
})
export class AppComponent {
  title = "st-lab";
  order$ = this.orderService.order$;
  constructor(private orderService: OrderStore) {}
}

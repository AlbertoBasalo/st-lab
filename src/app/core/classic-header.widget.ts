import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Observable } from "rxjs";
import { OrderStore } from "../shared/services/order.store";

@Component({
  selector: "app-classic-header",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterLink],
  template: `
    <header>
      <nav>
        <ul>
          <li>
            <a [routerLink]="['/classic/order']">🛒 {{ orderUnits$ | async }} units</a>
          </li>
        </ul>
      </nav>
    </header>
  `,
})
export class ClassicHeaderWidget {
  orderUnits$: Observable<number> = this.orderStore.orderUnits$;
  constructor(private orderStore: OrderStore) {}
}

import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { ClassicSearchComponent } from "@ui/classic-search.component";
import { AddProductComponent } from "../add-product.component";
import { HomeFacade } from "./home.facade";

@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf, AddProductComponent, ClassicSearchComponent],
  providers: [HomeFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-classic-search (search)="onSearch($event)" />
    <app-add-product *ngIf="product$ | async as product" [product]="product" (addToCart)="onAddToCart($event)" />
  `,
})
export default class HomePage implements OnDestroy {
  product$ = this._facade.product$;

  constructor(private _facade: HomeFacade) {}

  ngOnDestroy(): void {
    this._facade.onDestroy();
  }

  onSearch(term: string): void {
    this._facade.readByName(term);
  }

  onAddToCart(quantity: number): void {
    this._facade.addToCart(quantity);
  }
}

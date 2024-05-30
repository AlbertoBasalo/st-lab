import { JsonPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "@domain/product.type";

@Component({
  selector: "app-add-product",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe, NgIf],
  template: `
    <article *ngIf="product.id !== ''">
      <header>
        <strong>{{ product.name }}</strong>
        <p>
          <span>Price:{{ product.price }}</span>
          <span>Stock:{{ product.stock }}</span>
        </p>
      </header>
      <main *ngIf="product.stock > 0" class="grid">
        <span>Quantity:</span>
        <input
          type="number"
          placeholder="Quantity"
          min="0"
          [max]="product.stock"
          [value]="quantity"
          (change)="onQuantityChange($event)" />
        <button class="outline" (click)="onAddToCartClick()">Add to cart</button>
      </main>
    </article>
  `,
})
export class AddProductComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<number>();
  quantity = 1;

  onQuantityChange(event: Event): void {
    const quantity = parseInt((event.target as HTMLInputElement).value, 10);
    this.quantity = quantity;
  }

  onAddToCartClick(): void {
    this.addToCart.emit(this.quantity);
    this.quantity = 1;
  }
}

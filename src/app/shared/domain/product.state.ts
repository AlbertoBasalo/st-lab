import { BaseState } from "../state/base.state";
import { Product } from "./product.type";

export class ProductState extends BaseState<Product> {
  constructor() {
    super({ id: "", name: "", price: 0, stock: 0 });
  }

  create(name: string, price: number, stock: number): void {
    if (price < 0 || stock < 0) {
      throw new Error("Price and stock must be greater than 0");
    }
    this.update(() => ({ id: "", name, price, stock }));
  }

  sell(units: number): void {
    this.update((product) => {
      const stock = product.stock - units;
      return { ...product, stock };
    });
  }
}

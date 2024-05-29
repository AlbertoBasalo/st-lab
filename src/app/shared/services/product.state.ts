import { Product } from "../domain/product.type";
import { BaseState } from "../state/base.state";

export class ProductState extends BaseState<Product> {
  constructor() {
    super({ id: "", name: "", price: 0, stock: 0 });
  }
}
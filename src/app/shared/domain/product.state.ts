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
    const newProduct = { id: "", name, price, stock };
    newProduct.name = "origen";
    this.set(newProduct);
    newProduct.name = "sdfasdf";
    const estado = this.get();
    console.log(estado);
    //estado.name = "zzzz";
    //estado.name = "";
  }

  sell(units: number): void {
    this.update((product) => {
      const stock = product.stock - units;
      return { ...product, stock };
    });
  }
}

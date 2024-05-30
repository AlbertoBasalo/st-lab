import { Order } from "../domain/order.type";
import { BaseState } from "../state/base.state";

export class OrderState extends BaseState<Order> {
  constructor() {
    super({
      id: "",
      client: "",
      date: new Date(),
      products: [],
      transport: { type: "", cost: 0 },
    });
  }

  addProduct(productId: string, quantity: number): void {
    this.update((order) => {
      order.products.push({ id: productId, quantity });
      const cost = order.products.reduce((acc, p) => acc + p.quantity, 0) * 10;
      order.transport = { type: "", cost };
      return order;
    });
  }

  confirmSell(client: string, transport = "standard"): void {
    this.update((order) => {
      order.client = client;
      order.transport.type = transport;
      return order;
    });
  }
}

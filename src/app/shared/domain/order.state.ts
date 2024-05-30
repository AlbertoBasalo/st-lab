import { BaseState } from "../state/base.state";
import { Order } from "./order.type";

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
      //order.products.push({ id: productId, quantity });
      //order.transport = { type: "", cost };
      const products = [...order.products, { id: productId, quantity }];
      const cost = products.reduce((acc, p) => acc + p.quantity, 0) * 10;
      const transport = { type: "", cost };
      return { ...order, products, transport };
    });
  }

  confirmSell(client: string, transportType = "standard"): void {
    this.update((order: Order) => {
      //order.client = client;
      //order.transport.type = transport;

      const transport = { ...order.transport, type: transportType };
      return { ...order, client, transport };
    });
  }
}

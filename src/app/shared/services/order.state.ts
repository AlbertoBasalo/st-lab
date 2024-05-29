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
}

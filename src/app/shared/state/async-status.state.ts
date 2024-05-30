import { AsyncStatus } from "./async-status.type";
import { BaseState } from "./base.state";

export class AsyncStatusState extends BaseState<AsyncStatus> {
  constructor() {
    super({ status: "idle" });
  }

  start(): void {
    this.set({ status: "working" });
  }

  complete(): void {
    this.set({ status: "idle" });
  }

  error(error: string): void {
    this.set({ status: "idle", error });
  }
}

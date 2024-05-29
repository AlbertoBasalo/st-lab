import { filter, map } from "rxjs";
import { BaseState } from "../state/base.state";

export type DialogRequest = { title: string; payload?: any };
export type DialogResponse = { accept?: boolean; payload?: any };

export class DialogService {
  readonly #response$ = new BaseState<DialogResponse>({});
  readonly response$ = this.#response$.state$;

  accept$ = this.response$.pipe(
    filter((response) => response.accept === true),
    map((response) => response.payload)
  );

  open(request: DialogRequest): void {
    const simulatedAccept = Math.random() < 0.5;
    const simulatedResponse = { accept: simulatedAccept, payload: request.payload };
    const simulatedTimeout = Math.random() * 1000;
    setTimeout(() => this.#response$.set(simulatedResponse), simulatedTimeout);
  }
}

import { BaseState } from "./base.state";
export type Action = { type: string; payload?: any };

export class BaseStore extends BaseState<Action> {
  constructor() {
    super({ type: "INIT" });
  }

  dispatch(action: Action): void {
    this.set(action);
  }

  registerEffect(actionType: string, effect: (arg: any) => any): void {
    this.filter((action) => action.type === actionType) // for this action type
      .subscribe((action) => effect(action.payload));
  }
}

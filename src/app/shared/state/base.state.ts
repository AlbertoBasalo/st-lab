import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, filter, map } from "rxjs/operators";

export class BaseState<T> {
  readonly #state$ = new BehaviorSubject<T>(this.initialState);

  readonly state$ = this.#state$.asObservable();

  constructor(protected initialState: T) {
    // ToDo: local storage, etc.
  }

  get(): T {
    return this.clone(this.#state$.getValue());
  }

  set(newState: T): void {
    const nextState = this.clone(newState);
    // ToDo: rollback, log, local storage, etc.
    this.#state$.next(nextState);
  }

  patch(patch: Partial<T>): void {
    const currentState = this.get();
    const nextState = { ...currentState, ...patch };
    this.set(nextState);
  }

  update(updateFn: (state: T) => T): void {
    const currentState = this.get();
    const nextState = updateFn(currentState);
    this.set(nextState);
  }

  filter(predicate: (state: T) => boolean): Observable<T> {
    return this.state$.pipe(filter(predicate), distinctUntilChanged());
  }

  select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged(),
      map((selection: K) => this.clone(selection))
    );
  }

  reset(): void {
    this.set(this.initialState);
  }

  clone<K>(item: K): K {
    return JSON.parse(JSON.stringify(item));
  }
}

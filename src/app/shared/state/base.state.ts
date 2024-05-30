import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, filter, map } from "rxjs/operators";

export class BaseState<T> {
  readonly #state$ = new BehaviorSubject<Readonly<T>>(this.initialState);

  readonly state$: Observable<Readonly<T>> = this.#state$.asObservable();

  constructor(protected initialState: T) {
    // ToDo: local storage, etc.
  }

  get(): Readonly<T> {
    return this.#state$.getValue();
  }

  set(newState: T): void {
    // ToDo: rollback, log, local storage, etc.
    this.#state$.next(newState);
  }

  protected patch(patch: Partial<T>): void {
    const currentState = this.get();
    const nextState = { ...currentState, ...patch };
    this.set(nextState);
  }

  protected update(updateFn: (state: Readonly<T>) => T): void {
    const currentState = this.get();
    const nextState = updateFn(currentState);
    this.set(nextState);
  }

  filter(predicate: (state: T) => boolean): Observable<Readonly<T>> {
    return this.state$.pipe(filter(predicate), distinctUntilChanged());
  }

  select<K>(mapFn: (state: T) => K): Observable<Readonly<K>> {
    return this.state$.pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  reset(): void {
    this.set(this.initialState);
  }
}

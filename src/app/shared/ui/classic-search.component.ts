import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Subject, debounceTime, distinctUntilChanged, filter } from "rxjs";

@Component({
  selector: "app-classic-search",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input type="search" [placeholder]="placeholder" (input)="onSearchInput($event)" />
  `,
})
export class ClassicSearchComponent {
  @Input() placeholder = "Search...";
  @Output() search = new EventEmitter<string>();

  #search$ = new Subject<string>();

  constructor() {
    this.#search$
      .pipe(
        debounceTime(300),
        filter((term: string) => term.length > 2 || term.length === 0),
        distinctUntilChanged()
      )
      .subscribe((value) => this.search.emit(value));
  }

  /** search input event handler */
  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.#search$.next(value);
  }
}

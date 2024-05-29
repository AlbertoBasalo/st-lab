import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header>
      <nav>
        <ul>
          <a [routerLink]="['/']">
            <strong>Welcome to {{ title }}!</strong>
          </a>
        </ul>
        <ul>
          <li>
            <a [routerLink]="['/classic']">Classic sample</a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = "st-lab";
}

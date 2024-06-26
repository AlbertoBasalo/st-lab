import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { environment } from "@env/environment";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header>
      <nav>
        <ul>
          <a [routerLink]="['/']">
            <strong>{{ title }}!</strong>
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
  title = environment.appName;
}

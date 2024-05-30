import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ClassicHeaderWidget } from "src/app/core/classic-header.widget";
import { HomeFacade } from "./home/home.facade";

@Component({
  standalone: true,
  imports: [RouterOutlet, ClassicHeaderWidget],
  providers: [HomeFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-classic-header />
    <router-outlet />
  `,
})
export default class ClassicPage {}

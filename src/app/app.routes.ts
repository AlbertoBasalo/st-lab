import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "classic",
    loadComponent: () => import("./routes/classic.page"),
  },
];

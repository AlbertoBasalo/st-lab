import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "classic",
    loadComponent: () => import("./routes/classic/home.page"),
  },
  {
    path: "classic/order",
    loadComponent: () => import("./routes/classic/order.page"),
  },
  {
    path: "**",
    redirectTo: "",
  },
];

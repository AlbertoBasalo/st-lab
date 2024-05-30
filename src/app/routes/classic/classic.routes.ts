import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./classic.page"),
    children: [
      { path: "", loadComponent: () => import("./home/home.page") },
      {
        path: "order",
        loadComponent: () => import("./order/order.page"),
      },
    ],
  },
];

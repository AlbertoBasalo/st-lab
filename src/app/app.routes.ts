import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "classic",
    loadChildren: () => import("./routes/classic/classic.routes").then((m) => m.routes),
  },
  {
    path: "**",
    redirectTo: "",
  },
];

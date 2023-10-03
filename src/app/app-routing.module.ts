import { LoginComponent } from "./login/login.component";
import { NgModule, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from "@angular/router";
import { AdminProductsComponent } from "./admin/admin-products/admin-products.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./check-out/check-out.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { AdminOrdersComponent } from "./admin/admin-orders/admin-orders.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { CanActivateFn } from "@angular/router";
import { AppAuthGuard } from "./guards/app-auth.guard";
import { AdminAuthGuard } from "./guards/admin-auth.guard";
import { ProductFormComponent } from "./admin/product-form/product-form.component";

const isAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AppAuthGuard).canActivate(route, state);
};

const isAdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
     return inject(AdminAuthGuard).canActivate(); 
}

const routes: Routes = [
  { path: "", component: ProductsComponent },
  { path: "products", component: ProductsComponent },
  { path: "login", component: LoginComponent },
  { path: "shopping-cart", component: ShoppingCartComponent },
  {
    path: "check-out",
    component: CheckOutComponent,
    canActivate: [isAuthGuard],
  },
  {
    path: "order-success",
    component: OrderSuccessComponent,
    canActivate: [isAuthGuard],
  },
  {
    path: "my/orders",
    component: MyOrdersComponent,
    canActivate: [isAuthGuard],
  },
  {
    path: "admin/products/:id",
    component: ProductFormComponent,
    canActivate: [isAuthGuard, isAdminGuard],
  },
  {
    path: "admin/products/new",
    component: ProductFormComponent,
    canActivate: [isAuthGuard, isAdminGuard],
  },
  
  {
    path: "admin/products",
    component: AdminProductsComponent,
    canActivate: [isAuthGuard, isAdminGuard],
  },
  {
    path: "admin/orders",
    component: AdminOrdersComponent,
    canActivate: [isAuthGuard, isAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}




// angular fire provide methoded
// import { AuthGuard } from './auth-guard.guard';
// import { AuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
// }const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"], { queryParams: { returnUrl: "check-out" } });
// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);
// canActivate: [AuthGuard],
// data: { authGuardPipe: redirectUnauthorizedToLogin },

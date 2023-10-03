import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppAuthGuard {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(
      map((user) => {
        if (user) return true;
        this.router.navigate(["/login"], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      })
    );
  }
}

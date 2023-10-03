import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, switchMap, map, ObservableInput } from "rxjs";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { User } from "@angular/fire/auth";
import { AngularFireObject } from "@angular/fire/compat/database";
import { AppUser } from "../models/app-user";

@Injectable({
  providedIn: "root",
})
export class AdminAuthGuard {
  constructor(private auth: AuthService, private userService: UserService) {}
  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map((appUser) => appUser.isAdmin)
    );
  }
}
// route: ActivatedRouteSnapshot, state: RouterStateSnapshot

import { UserService } from './user.service';
import { switchMap } from 'rxjs';
import { Observable } from 'rxjs';
import { AppUser } from './../models/app-user';
import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithRedirect, user, authState} from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = authState(this.afAuth);
  
  constructor(private afAuth: Auth, private route: ActivatedRoute, private router: Router, private userService: UserService) { 
   
  }

  async login (){
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      localStorage.setItem('returnUrl', returnUrl);
      await signInWithRedirect(this.afAuth, new GoogleAuthProvider())
  }

  async logout(){
    await this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user => this.userService.get(user?.uid!))
    )
  }
}

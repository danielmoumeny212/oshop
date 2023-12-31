import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <app-navbar></app-navbar>
    <div className="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent{

  constructor(private auth: AuthService, private router: Router, private userService: UserService){
    this.auth.user$.subscribe(user => {
      if(!user) return;
        this.userService.save(user); 
        let returnUrl = localStorage.getItem('returnUrl');
        if(!returnUrl) return;
          localStorage.removeItem('returnUrl');
          this.router.navigateByUrl(returnUrl || '/')        

      
    })
  }


  
}

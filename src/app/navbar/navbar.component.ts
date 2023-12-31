import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  appUser!: AppUser;
  cart$!: Observable<ShoppingCart>; 
   async ngOnInit(){
    this.cart$ = await this.cartService.getCart(); 
 

  }
  constructor(private auth: AuthService, private cartService: ShoppingCartService){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser); 
  }

 
 
  
  logout() {
    this.auth.logout();
  }
  
}

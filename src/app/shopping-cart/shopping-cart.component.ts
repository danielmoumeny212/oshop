import { Component , OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styles: [
  ]
})
export class ShoppingCartComponent  implements OnInit{
   cart$!: Observable<ShoppingCart>;
  async ngOnInit(){
    
    this.cart$ = await this.shoppingCartService.getCart();
  }

  constructor(private shoppingCartService: ShoppingCartService){}


}

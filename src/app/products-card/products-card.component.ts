import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductsCardComponent {
   
  @Input('product') product!: Product;
  @Input('show-actions') showActions = true; 
  @Input('shopping-cart') shoppingCart!: ShoppingCart; 

  constructor(private cartService: ShoppingCartService){
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }


}

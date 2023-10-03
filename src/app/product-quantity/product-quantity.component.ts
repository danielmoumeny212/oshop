import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styles: [
  ]
})
export class ProductQuantityComponent {
  @Input('product') product!: Product;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  
  constructor(private cartService: ShoppingCartService){

  }
  addToCart(){
    this.cartService.addToCart(this.product);
  }

  removeToCart(){
    this.cartService.removeToCart(this.product);
  }

}

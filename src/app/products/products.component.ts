import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable, map, switchMap } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
})
export class ProductsComponent implements OnInit , OnDestroy{
   category!: string | null; 
   products: Product[] = [];
   filteredProducts: Product[] = [];
   cart: any; 
   subscription: any; 
   
   categories$!: Observable<any[]> 

  

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: ShoppingCartService){
  }

  async ngOnInit() {
    this.productService.getAll()
      .snapshotChanges()
      .pipe(
        switchMap(actions => {
          this.products = actions.map(action => ({ key: action.key, ...action.payload.val() as any }));
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ? 
          this.products.filter(product => product.category === this.category) : this.products;
      });
  
    this.subscription = (await this.cartService.getCart())
      .subscribe((cart) => this.cart = cart);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  
 

}

import {Component, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import {ProductService } from 'src/app/services/product.service';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styles: [
  ], 
 
})
export class AdminProductsComponent implements OnDestroy{
    displayedColumns: string[] = ['created', 'state', 'number', 'title'];
    products!:Product[]; 
    filteredProducts!: Product[] ; 
    subscription: Subscription; 


    constructor(private productService: ProductService){
     this.subscription = this.productService.getAll().snapshotChanges()
     .pipe(
        map((actions) => {
        return actions.map(action => ({
          key: action.key, 
          ...action.payload.val() as any,
        }))
      })
     )
     .subscribe(products => this.filteredProducts= this.products = products)

   }
   ngOnDestroy(): void {
        this.subscription.unsubscribe(); 
   }

   filter(query: string){
     this.filteredProducts = (query) ?  this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) : this.products; 
     console.log(this.filteredProducts)
   }
}
// 0
// : 
// key
// : 
// "-NXlJJ5_XwBnzh-GkOjJ"
// val
// : 
// category
// : 
// "vegetables"
// imageUrl
// : 
// "https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
// price
// : 
// 2.5
// title
// : 
// "Spinach"

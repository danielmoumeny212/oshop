import { Component } from '@angular/core';
import { AngularFireList, ChildEvent } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { map , take} from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styles: [
  ]
})

export class ProductFormComponent {
  id: string | null; 
  product: Product = {
    key: '',
    title: '',
    price: 0,
    imageUrl: '',
    category: ''
  }; 
  categories$: Observable<any[]>; 
  constructor(private categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute){
    this.categories$ = this.categoryService.getCategories().snapshotChanges()
    .pipe(
      map((actions) => {
        return actions.map(action => ({
          key: action.key, 
          val: action.payload.val(),
        }))
      })
    );

    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) this.productService.get(this.id)
    .valueChanges()
    .pipe(take(1))
    .subscribe(p => this.product = p as Product)

    
  }

  save(product: Product){
    console.log('save clicked')
    if(this.id) {
      console.log("UPdating product")
      this.productService.update(this.id, product)
    }
     else this.productService.create(product);
     
     this.router.navigate(['/admin/products'])

  }
  delete(){
    if(!confirm('Are you sure you want to delete this product?')) return ; 
       this.productService.delete(this.id as string)
       this.router.navigate(['/admin/products'])

    
  }

}

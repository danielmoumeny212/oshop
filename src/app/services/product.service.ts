import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
// import { Product } from "../models/product";

export interface Product {
  category: string;
  imageUrl: string;
  price: number;
  title: string;
}
@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: Product) {
    return this.db.list("/products").push(product);
  }

  getAll(){
    return this.db.list('/products')
  }
  get(productId: string){
    return this.db.object('/products/' + productId); 
  }
  update(productId: string, product: Product){
    return this.db.object('/products/'+ productId).update(product)
  }

  delete(productId: string){
    return this.db.object('/products/'+ productId).remove();
  }
}

import { map, take , Observable} from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Product } from "../models/product";
import { ShoppingCart } from "../models/shopping-cart";

@Injectable({
  providedIn: "root",
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}
  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime(),
    });
  }

  private async getOrCreateCartId() {
    let cardId = localStorage.getItem("cartId");
    if (cardId) return cardId;
    let result = await this.create();
    localStorage.setItem("cartId", result.key!);
    return result.key!;
  } 

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-carts/" + cartId).valueChanges().pipe(map((x: any) => new ShoppingCart(x.items)));
  }
 
  
  private getItem(cartId: string, productId: string) {
    return this.db.object<any>(
      "/shopping-carts/" + cartId + "/items/" + productId
    );
  }

  async addToCart(product: Product) {
    if (product)
    this.updateItemQuantity(product, 1)
  }

  async removeToCart(product: Product) {
   this.updateItemQuantity(product, -1);
  }

  

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key!);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {

        item$.update({product: product,quantity: (item?.quantity || 0) + change,});
      });
  }
}

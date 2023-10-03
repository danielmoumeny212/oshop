import { Injectable} from '@angular/core';
import { AngularFireDatabase ,  QueryFn} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { 

  }
  getCategories(){
      return this.db.list('/categories',(ref) => {
        return ref.orderByChild('name')
      });
  }
}

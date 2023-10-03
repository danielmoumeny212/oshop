import { Component,Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observable,map} from 'rxjs';


@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$!: Observable<any[]>
  
  @Input('category') category!: string;



  constructor(categoryService: CategoryService){
    this.categories$ = categoryService.getCategories()
     .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => ({
            key: action.key,
            ...action.payload.val() as any
          }))
        })
      )
  }


}

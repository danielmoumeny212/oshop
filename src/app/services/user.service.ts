import { Observable } from 'rxjs';
import { Injectable,inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Database,ref  , update, get} from "@angular/fire/database"
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private db: AngularFireDatabase = inject(AngularFireDatabase); 
  constructor() { }
  save(user: User){
    this.db.object('/users/' + user.uid)
    .update({
      name: user.displayName, 
      email: user.email, 
    })
  }
 
  get(uid: string): Observable<any> {
    return this.db.object('/users/' + uid).valueChanges();
 }
  
}

// save(user: User){
//   update(ref(this.db, 'users/' + user.uid), {
//      name: user.displayName, 
//      email: user.email, 
//   })
// }

// get(uid: string){
//  let user!: User | null; 
//   get(ref(this.db, 'users/' + uid))
//   .then(snapShot => {
//     user = snapShot.val();
//   })
//   return user;
// }
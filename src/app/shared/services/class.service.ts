import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CharacterClass } from 'shared/models/class';

@Injectable({
  providedIn: 'root'
})
export class CharacterClassService {
  classs$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.classs$ = this.db.list('/classes', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: CharacterClass) {
    return this.db.list('/classes').push(obj);
  }

  update(classID: string, obj: CharacterClass) {
    return this.db.object('/classes/' + classID).update(obj);
  }

  remove(classID: string) {
    return this.db.object('/classes/' + classID).remove();
  }

  getAll() {
    return this.classs$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(classID: string) {
    return this.db.object('/classes/' + classID);
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UndeadService {
  undead$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.undead$ = this.db.list('/undead', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(creature) {
    return this.db.list('/undead').push(creature);
  }

  update(creatureId, creature) {
    return this.db.object('/undead/' + creatureId).update(creature);
  }

  remove(creatureId) {
    return this.db.object('/undead/' + creatureId).remove();
  }

  getAll() {
    return this.undead$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(creatureId) {
    return this.db.object('/undead/' + creatureId);
  }
}

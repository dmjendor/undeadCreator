import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Undead } from 'shared/models/undead';

@Injectable({
  providedIn: 'root'
})
export class UndeadService {
  undead$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {}

  create(creature) {
    return this.db.list('/undead').push(creature);
  }

  update(creatureId, creature) {
    console.log(creatureId, creature.key);
    return this.db.object('/undead/' + creatureId).update(creature);
  }

  remove(creatureId) {
    return this.db.object('/undead/' + creatureId).remove();
  }

  getAll() {
     return this.db.list('/undead/').valueChanges();
    // return this.undead$.pipe(map(changes => {
    //   return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    // }));
  }

  get(creatureId) {
    return this.db.object('/undead/' + creatureId);
  }

  getUndeadByUser(userId: string) {
    return this.db.list('/undead',
      ref => ref.orderByChild('user')
      .equalTo(userId))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as Undead;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }
}

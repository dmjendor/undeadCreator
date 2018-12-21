import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Monster } from 'shared/models/monster';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  monsters$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.monsters$ = this.db.list('/creatures', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(creature: Monster) {
    return this.db.list('/creatures').push(creature);
  }

  update(creatureId: string, creature: Monster) {
    return this.db.object('/creatures/' + creatureId).update(creature);
  }

  remove(creatureId: string) {
    return this.db.object('/creatures/' + creatureId).remove();
  }

  getAll() {
    return this.monsters$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(creatureID: string) {
    return this.db.object('/creatures/' + creatureID);
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Modifier } from 'shared/models/modifier';

@Injectable({
  providedIn: 'root'
})
export class ModifierService {
  modifiers$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.modifiers$ = this.db.list('/modifiers', c => c.orderByChild('key'))
    .snapshotChanges();
   }

  create(modifier) {
    return this.db.list('/modifiers').push(modifier);
  }

  update(modifierId, modifier) {
    return this.db.object('/modifiers/' + modifierId).update(modifier);
  }

  remove(modifierId) {
    return this.db.object('/modifiers/' + modifierId).remove();
  }

  getAll() {
    return this.modifiers$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  getModiferOfType(type) {
    return this.db.list('/modifiers',
      ref => ref.orderByChild('type')
      .equalTo(type))
      .valueChanges();
  }

  get(modifierId) {
    return this.db.object('/modifiers/' + modifierId);
  }
}
